import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Toaster from '../../Components/Toaster/Toaster';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Loader from '../../Components/Spinner/Loader';

const VisitorNewPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const onSubmit = async (data: any) => {
    if (data.password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'Password does not match',
      });
      setLoading(false);
      return;
    }
    if (data.password.length < 8) {
      Toast.fire({
        icon: 'error',
        title: `Password must be at least 8 characters`,
      });
      setLoading(false);
      return;
    }
    data.email = email;
    data.token = localStorage.getItem('visitor_forget_token');

    const res = await fetcher.post({
      url: '/api/auth/visitor/forget/password',
      contentType: 'application/json',
      body: data,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: res.message,
      });
      localStorage.removeItem('visitor_forget_token');
      navigate('/visitor-login');
      setLoading(false);
    } else {
      Toast.fire({
        icon: 'error',
        title: res.message,
      });
      setLoading(false);
    }
  };
  return (
    <>
      {' '}
      <Layout>
        <HeaderBottom pathName={'Buyer/Visitor set new password'} />
        <div className='login-wrapper'>
          <div className='login-div'>
            <div className='login-page'>
              <h1 className='text-center pt-3 px-1'>
                Buyer/Visitor set new password
              </h1>
              <div className='login-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor='' className='pb-2'>
                      Enter new password
                    </label>
                    <br />
                    <input
                      placeholder='Enter new password'
                      className='inputFiled'
                      {...register('password')}
                      type='text'
                    />
                  </div>
                  <div className='pt-3'>
                    <label htmlFor='' className='pb-2'>
                      Retype password
                    </label>
                    <br />
                    <input
                      placeholder=' Retype password'
                      className='inputFiled'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={passwordType}
                    />
                  </div>
                  <div className='d-flex align-items-center gap-2 pt-2'>
                    <input
                      type='checkbox'
                      onClick={(e: any) => {
                        if (e.target.checked) {
                          setPasswordType('text');
                        } else {
                          setPasswordType('password');
                        }
                      }}
                      id=''
                    />
                    <p>Show password</p>
                  </div>
                  <div>
                    {loading ? (
                      <Loader css={'w-100 mt-5 text-white'} />
                    ) : (
                      <Button
                        type='submit'
                        className='w-100 mt-5 submit-button'
                      >
                        Submit
                      </Button>
                    )}
                  </div>

                  <div className='lost-your-password pt-4 text-center'>
                    <Link to='/visitor-login' className='forget-link'>
                      Go back
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VisitorNewPassword;
