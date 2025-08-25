import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { Link } from 'react-router-dom';
import Loader from '../Spinner/Loader';

const PortalLogin = ({ register, setConfirmPassword }: any) => {
  const { isLoading } = useAuthContext();
  const [passwordType, setPasswordType] = useState('password');
  return (
    <>
      {' '}
      <div className='register-top '>
        <div className='register-top-div'>
          <h3>Exhibitor Portal Login Access</h3>
        </div>
        <div className='register-top-form-card '>
          <div className='row g-3 '>
            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
              <div className='row'>
                <label>
                  Email<span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type='email'
                    {...register('user_cric_member_email')}
                    className='form-control '
                    placeholder='Enter email'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
              <div className='row d-flex'>
                <label>
                  Password <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    type={passwordType}
                    id='password'
                    {...register('user_cric_member_password')}
                    className='form-control error'
                    placeholder='Password'
                  />
                  <label id='password-error' className='error'></label>
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
              <div className='row'>
                <label>
                  Confirm Password <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type={passwordType}
                    className='form-control error'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                  />
                  <label id='confirm_password-error' className='error'></label>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex align-items-center gap-2'>
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
          <div className='text-center mt-5'>
            {isLoading ? (
              <Loader css={'w-50'} />
            ) : (
              <Button
                type='submit'
                className='w-50'
                variant='primary'
                style={{ backgroundColor: '#C340F2' }}
              >
                Submit
              </Button>
            )}
          </div>
          <div className='text-end'>
            Back to{' '}
            <Link to='/login' className='text-decoration-none'>
              login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalLogin;
