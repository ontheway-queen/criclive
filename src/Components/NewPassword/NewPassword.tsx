import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import HeaderBottom from '../HeaderBottom/HeaderBottom';
import Button from 'react-bootstrap/Button';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toaster from '../Toaster/Toaster';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Loader from '../Spinner/Loader';

const NewPassword = () => {
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
    data.token = localStorage.getItem('cric_forget_token');

    const res = await fetcher.post({
      url: '/api/auth/cric-member/forget/password',
      contentType: 'application/json',
      body: data,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: res.message,
      });
      localStorage.removeItem('cric_forget_token');
      navigate('/login');
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
        <HeaderBottom pathName={'New password'} />
        <div className='login-wrapper'>
          <div className='login-div'>
            <div className='login-page'>
              <h1 className='text-center pt-3'>Set new password</h1>
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
                    <Link to='/login' className='forget-link'>
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

export default NewPassword;
