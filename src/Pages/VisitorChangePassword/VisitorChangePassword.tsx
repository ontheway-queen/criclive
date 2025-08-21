import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import Toaster from '../../Components/Toaster/Toaster';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import Loader from '../../Components/Spinner/Loader';

const VisitorChangePassword = () => {
  const { visitorUser } = VisitorAuthContext();
  const Toast = Toaster();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (data: any) => {
    data.user_id = visitorUser.visitor_id;
    if (data.new_password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: `Password does not match`,
      });
      setLoading(false);
      return;
    }
    if (data.new_password.length < 8) {
      Toast.fire({
        icon: 'error',
        title: `Password must be at least 8 characters`,
      });
      setLoading(false);
      return;
    }
    const res = await fetcher.post({
      url: `/api/auth/visitor/change/password`,
      contentType: 'application/json',
      body: data,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: res.message,
      });
      reset();
      setConfirmPassword('');
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
    <div className='profile-right-side px-3 py-3'>
      <h4 className='component-tittle'>Change password</h4>
      <div className='pt-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor=''>
              Current password <span className='require'>*</span>
            </label>
            <br />
            <input
              type='text'
              required
              {...register('old_password')}
              placeholder='Enter current password'
              className='change-password-input'
            />
          </div>
          <div className='py-3'>
            <label htmlFor=''>
              New password <span className='require'>*</span>
            </label>
            <br />
            <input
              type='text'
              required
              {...register('new_password')}
              placeholder='Enter new password'
              className='change-password-input'
            />
          </div>
          <div>
            <label htmlFor=''>
              Re-type new password <span className='require'>*</span>
            </label>
            <br />
            <input
              type='text'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Retype new password'
              className='change-password-input'
            />
          </div>
          <div className='text-end mt-5'>
            {loading ? (
              <Loader css={'submit-button w-25'} />
            ) : (
              <Button
                type='submit'
                style={{
                  backgroundColor: '#1982c3',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                }}
              >
                Change password
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitorChangePassword;
