import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Toaster from '../../Components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AUTH_VISITOR_USER_SUCCESS,
  AUTH_VISITOR_USER_FAILED,
} from '../../Helpers/Constant';
import { setCookie } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import Loader from '../../Components/Spinner/Loader';

interface inputForm {
  visitor_first_name: string;
  visitor_last_name: string;
  visitor_gender: string;
  visitor_email: string;
  visitor_phone: string;
  visitor_password: string;
  visitor_photo: string;
  visitor_type: string;
}

const VisitorRegistration = () => {
  const {
    dispatch: authDispatch,
    isLoading,
    setIsLoading,
  } = VisitorAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<inputForm>();
  const [passwordType, setPasswordType] = useState<string>('password');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<any>('');

  const onSubmit: SubmitHandler<inputForm> = async (data: any) => {
    if (!profilePhoto) {
      Toast.fire({
        icon: 'error',
        title: `Upload visitor profile photo `,
      });
      setIsLoading?.(false);
      return;
    }
    if (data.visitor_password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: `Password does not match `,
      });
      setIsLoading?.(false);
      return;
    }
    if (data.visitor_password.length < 8) {
      Toast.fire({
        icon: 'error',
        title: `Password must be at least 8 characters`,
      });
      setIsLoading?.(false);
      return;
    }
    // data.visitor_type = 'visitor';

    const fromData = new FormData();
    Object.keys(data).forEach((item) => {
      fromData.append(item, data[item]);
    });
    fromData.append('visitor_photo', profilePhoto);

    try {
      setIsLoading?.(true);
      const res = await fetcher.post({
        url: '/api/auth/visitor/registration',
        body: fromData,
      });

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: `successfully register`,
        });
        authDispatch?.({
          type: AUTH_VISITOR_USER_SUCCESS,
          payload: res.data,
        });
        setCookie(null, 'toab_fair', res.token);
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
      <HeaderBottom pathName={'Visitor Registration'} />
      <div className='login-wrapper'>
        <div className='login-div'>
          <div className='visitor-registration-page'>
            {/* <div className='text-center pt-3 d-flex align-items-center justify-content-center gap-3'>
              <div>
                <FcGoogle size={40} className='login-icon' />
              </div>
              <div>
                <BsFacebook size={40} className='login-icon' />
              </div>

              <div>
                <BsLinkedin size={40} color='#0a66c2' className='login-icon' />
              </div>
            </div>

            <div className='text-center mt-3'>
              <span className='fw-bold fs-5'> or</span> <br />
              <p className='fw-bold fs-5'>Submit your Information </p>
            </div> */}
            <div className='text-center mt-3'>
              <p className='fw-bold fs-3'>Visitor Registration</p>
            </div>

            <div className='login-form'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3 mx'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        First Name <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          type='text'
                          required
                          {...register('visitor_first_name')}
                          className='form-control'
                          placeholder='Enter first name'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Last Name <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          type='text'
                          {...register('visitor_last_name')}
                          className='form-control'
                          placeholder='Enter last name'
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                    <div className='row  align-items-center'>
                      <div className='d-flex align-items-center gap-3'>
                        <label className=' col-form-label'>
                          Gender <span className='require'>*</span>
                        </label>
                        <div>
                          <select
                            {...register('visitor_gender')}
                            required
                            className='form-control'
                          >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                    <div className='row  align-items-center'>
                      <div className='d-flex align-items-center gap-3'>
                        <label className='col-form-label'>
                          Select Buyer/Visitor type{' '}
                          <span className='require'>*</span>
                        </label>
                        <div>
                          <select
                            {...register('visitor_type')}
                            required
                            className='form-control'
                          >
                            <option value='fully-hosted'>Fully-hosted</option>
                            <option value='visitor'>Visitor</option>
                            <option value='hosted'>Hosted</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <div>
                      <label className='col-form-label'>
                        Email <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          type='email'
                          required
                          {...register('visitor_email')}
                          className='form-control valid'
                          placeholder='Enter email address'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <div>
                      <label className='col-form-label'>
                        Mobile Number <span className='require'>*</span>
                      </label>
                      <div>
                        <div className='input-group'>
                          <input
                            type='text'
                            required
                            {...register('visitor_phone')}
                            className='mobile-form form-control '
                            placeholder='Enter mobile number'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2'>
                    <div className='row'>
                      <label>Profile Photo</label>
                      <div className='w-150-100'>
                        <div className='companies-logo-card'>
                          <div
                            className='img-thumbnail '
                            style={{ width: '280px' }}
                          >
                            {profilePhoto ? (
                              <img
                                style={{
                                  width: '270px',
                                  height: '135px',
                                }}
                                className=' ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src={URL.createObjectURL(profilePhoto)}
                                alt=''
                              />
                            ) : (
                              <img
                                style={{
                                  width: '270px',
                                  height: '135px',
                                  objectFit: 'contain',
                                }}
                                className=' ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src='/assets/image.png'
                                alt=''
                              />
                            )}
                          </div>
                          <div>
                            <input
                              type='file'
                              id='actual-btn1'
                              accept='image/jpg, image/png, image/jpeg'
                              hidden
                              onChange={(e: any) =>
                                setProfilePhoto(e.target.files[0])
                              }
                            />

                            <label
                              htmlFor='actual-btn1'
                              className='upload-visitor-image-btn text-center'
                            >
                              {' '}
                              Upload photo
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Password <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          {...register('visitor_password')}
                          type={passwordType}
                          className='form-control valid'
                          placeholder='Enter password'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Confirm Password <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          type={passwordType}
                          className='form-control'
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder='Enter confirm password'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-5 '>
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
                </div>

                <div>
                  {isLoading ? (
                    <Loader css={'w-100 mt-3 text-white'} />
                  ) : (
                    <Button type='submit' className='w-100 mt-3 submit-button'>
                      Register
                    </Button>
                  )}
                </div>

                <div className='mt-3 text-end'>
                  <Link to='/visitor-login' className='text-decoration-none'>
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VisitorRegistration;
