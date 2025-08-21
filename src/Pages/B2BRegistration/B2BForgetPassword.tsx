import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import Toaster from '../../Components/Toaster/Toaster';
import Loader from '../../Components/Spinner/Loader';

const B2BForgetPassword = () => {
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.type = 'forget_visitor';
    const res = await fetcher.post({
      url: '/api/atab/common/send-email-otp',
      contentType: 'application/json',
      body: data,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: res.message,
      });
      navigate(`/visitor-match-otp?email=${data.email}`);
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
      <Layout>
        <HeaderBottom pathName={'B2B forget password'} />
        <div className='login-wrapper'>
          <div className='login-div'>
            <div className='login-page'>
              <h1 className='text-center pt-3 px-2'>B2B forget password</h1>
              <div className='login-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor='' className='pb-2'>
                      Enter your email
                    </label>
                    <br />
                    <input
                      placeholder='Enter your email address'
                      className='inputFiled'
                      {...register('email')}
                      type='email'
                    />
                  </div>

                  <div>
                    {loading ? (
                      <Loader css={'w-100 mt-5 text-white'} />
                    ) : (
                      <Button
                        type='submit'
                        className='w-100 mt-5 submit-button'
                      >
                        Forget password
                      </Button>
                    )}
                  </div>

                  <div className='lost-your-password pt-5 text-center'>
                    <Link to='/b2b-login' className='forget-link'>
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

export default B2BForgetPassword;
