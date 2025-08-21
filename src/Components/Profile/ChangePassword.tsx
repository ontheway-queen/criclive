import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Toaster from '../Toaster/Toaster';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import Loader from '../Spinner/Loader';

const ChangePassword = () => {
  const { user } = useAuthContext();
  const Toast = Toaster();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (data: any) => {
    data.user_id = user.user_fair_member_id;
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
      url: `/api/auth/fair-member/change/password`,
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
      <h4>Change password</h4>
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
              <Button type='submit' className='submit-button w-25'>
                Change password
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
