import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import Layout from '../../Components/Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Toaster from '../../Components/Toaster/Toaster';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { AUTH_USER_FAILED, AUTH_USER_SUCCESS } from '../../Helpers/Constant';
import { setCookie } from 'nookies';
import Loader from '../../Components/Spinner/Loader';

interface inputForm {
  email: string;
  password: string;
}

const Login = () => {
  const { dispatch: authDispatch, isLoading, setIsLoading } = useAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<inputForm>();
  const [passwordType, setPasswordType] = useState('password');

  const onSubmit: SubmitHandler<inputForm> = async (data) => {
    try {
      setIsLoading?.(true);
      const res = await fetcher.post({
        url: '/api/auth/cric-member/login',
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
        setCookie(null, 'criclive_cric', res.token);
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
    <>
      <Layout>
        <HeaderBottom pathName={'Exhibitor Login'} />
        <div className='login-wrapper'>
          <div className='login-div'>
            <div className='login-page'>
              <h1 className='text-center pt-3'>Exhibitor Login</h1>
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
                  <div className=' pt-3 d-flex align-items-center justify-content-betcricen'>
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
                      <Loader css={'w-100 mt-5 text-white '} />
                    ) : (
                      <Button
                        type='submit'
                        className='w-100 mt-5 submit-button'
                      >
                        Login
                      </Button>
                    )}
                  </div>

                  <div className='text-center pt-4'>
                    <Link
                      to='/book-your-space'
                      className='text-decoration-none'
                    >
                      Exhibitor register
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

export default Login;
