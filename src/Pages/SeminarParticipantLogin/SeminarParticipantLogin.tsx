import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import Toaster from '../../Components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_USER_FAILED, AUTH_USER_SUCCESS } from '../../Helpers/Constant';
import { setCookie } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';

interface inputForm {
  email: string;
  password: string;
}

const SeminarParticipantLogin = () => {
  const { dispatch: authDispatch, isLoading, setIsLoading } = useAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<inputForm>();
  const [passwordType, setPasswordType] = useState('password');

  const onSubmit: SubmitHandler<inputForm> = async (data) => {
    try {
      setIsLoading?.(true);
      const res = await fetcher.post({
        url: '/api/auth/fair-member/login',
        contentType: 'application/json',
        body: data,
      });

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: `successfully login`,
        });
        authDispatch?.({
          type: AUTH_USER_SUCCESS,
          payload: res.data,
        });
        setCookie(null, 'toab_fair', res.token);
        setIsLoading?.(false);
        navigate('/profile');
      } else {
        Toast.fire({
          icon: 'error',
          title: res.message,
        });
        setIsLoading?.(false);
        authDispatch?.({ type: AUTH_USER_FAILED });
      }
    } catch (error) {
      authDispatch?.({ type: AUTH_USER_FAILED });
    }
  };
  return (
    <Layout>
      <HeaderBottom pathName={'Seminar participant login'} />
      <div className='login-wrapper'>
        <div className='login-div'>
          <div className='visitor-login-page'>
            <div className='text-center pt-3'>
              <FcGoogle size={45} color='#F4B400' className='login-icon' />
              <BsFacebook
                size={40}
                className='mx-5 login-icon'
                color='#1877f2'
              />
              <BsLinkedin size={40} color='#0a66c2' className='login-icon' />
            </div>
            <div className='text-center mt-3'>
              or <br />
              <p className='fw-bold fs-5'>login with Email</p>
            </div>

            <div className='login-form'>
              <div className='text-end '>
                <Link
                  to='/visitor-registration'
                  className='text-decoration-none'
                >
                  Create an Account
                </Link>
              </div>
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
                <div className='pt-4'>
                  <label htmlFor='' className='pb-2'>
                    Enter your password
                  </label>
                  <br />
                  <input
                    placeholder='Enter your password'
                    {...register('password')}
                    className='inputFiled'
                    type={passwordType}
                  />
                </div>
                <div className=' pt-3 d-flex align-items-center justify-content-between'>
                  <div className=' d-flex align-items-center'>
                    <input
                      type='checkbox'
                      onClick={() => {
                        passwordType === 'password'
                          ? setPasswordType('text')
                          : setPasswordType('password');
                      }}
                    />
                    <p className='ps-2'>Show password</p>
                  </div>
                  <div className='lost-your-password'>
                    <Link to='/forget-password' className='forget-link'>
                      Lost your password?
                    </Link>
                  </div>
                </div>

                <div>
                  {isLoading ? (
                    <Button
                      disabled
                      className='w-100 mt-5 text-white '
                      value='loading..'
                    >
                      Loading..
                    </Button>
                  ) : (
                    <Button type='submit' className='w-100 mt-5 submit-button'>
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeminarParticipantLogin;
