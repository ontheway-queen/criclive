import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import Toaster from '../../Components/Toaster/Toaster';
import { useForm } from 'react-hook-form';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Layout from '../../Components/Layout/Layout';
import Loader from '../../Components/Spinner/Loader';

const VisitorMatchOtp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data.email = email;
    data.type = 'forget_visitor';

    const res = await fetcher.post({
      url: '/api/atab/common/match-email-otp',
      contentType: 'application/json',
      body: data,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: res.message,
      });
      localStorage.setItem('visitor_forget_token', res.token);
      navigate(`/visitor-new-password?email=${data.email}`);
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
        <HeaderBottom pathName={'Buyer/Visitor match OTP'} />
        <div className='login-wrapper'>
          <div className='login-div'>
            <div className='login-page'>
              <h1 className='text-center pt-3'>Buyer/Visitor match OTP</h1>
              <div className='login-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor='' className='pb-2'>
                      Enter OTP
                    </label>
                    <br />
                    <input
                      placeholder='Enter OTP'
                      className='inputFiled'
                      {...register('otp')}
                      type='number'
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
                        Continue
                      </Button>
                    )}
                  </div>

                  <div className='lost-your-password pt-5 text-center'>
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

export default VisitorMatchOtp;
