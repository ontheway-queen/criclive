import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import Toaster from '../../Components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AUTH_VISITOR_USER_FAILED,
  AUTH_VISITOR_USER_SUCCESS,
} from '../../Helpers/Constant';
import { setCookie } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loader from '../../Components/Spinner/Loader';

interface inputForm {
  visitor_phoneOrEmail: string;
  password: string;
}
const VisitorRegister = () => {
  const {
    dispatch: authDispatch,
    isLoading,
    setIsLoading,
  } = VisitorAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<inputForm>();
  const [passwordType, setPasswordType] = useState('password');

  const onSubmit: SubmitHandler<inputForm> = async (data) => {
    try {
      setIsLoading?.(true);
      const res = await fetcher.post({
        url: '/api/auth/visitor/login',
        contentType: 'application/json',
        body: data,
      });

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: `successfully login`,
        });
        authDispatch?.({
          type: AUTH_VISITOR_USER_SUCCESS,
          payload: res.data,
        });
        setCookie(null, 'criclive_cric', res.token);
        setIsLoading?.(false);
        navigate('/visitor/profile');
      } else {
        Toast.fire({
          icon: 'error',
          title: res.message,
        });
        setIsLoading?.(false);
        authDispatch?.({ type: AUTH_VISITOR_USER_FAILED });
      }
    } catch (error) {
      authDispatch?.({ type: AUTH_VISITOR_USER_FAILED });
    }
  };
  return (
    <Layout>
      <HeaderBottom pathName={'Visitor Login'} />
      <div className='login-wrapper'>
        <div className='login-div'>
          <div className='visitor-login-page'>
            <div className='text-center mt-3'>
              <p className='fw-bold fs-3'>Visitor Login</p>
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
                    {...register('visitor_phoneOrEmail')}
                    type='text'
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
                  {/* <div className='lost-your-password'>
                    <Link to='/visitor-forget-password' className='forget-link'>
                      Lost your password?
                    </Link>
                  </div> */}
                </div>

                <div>
                  {isLoading ? (
                    <Loader css={'w-100 mt-5 text-white'} />
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

export default VisitorRegister;
