import { SubmitHandler, useForm } from 'react-hook-form';
import Toaster from '../../Components/Toaster/Toaster';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Spinner/Loader';
import { Button } from 'react-bootstrap';

const B2BEditProfile = () => {
  const Toast = Toaster();
  const { register, handleSubmit } = useForm<any>();
  const { b2bUser } = B2BAuthContext();
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.b2b_id = b2bUser.b2b_id;
    data.b2b_date_of_birth = date;

    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      if (data[item]) {
        formData.append(item, data[item]);
      }
    });

    try {
      const res = await fetcher.put({
        url: `/api/fair/member/b2b/${b2bUser.b2b_id}`,
        body: formData,
      });

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: res.message,
        });

        navigate('/b2b/profile');
        setLoading(false);
      } else {
        Toast.fire({
          icon: 'error',
          title: res.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='profile-right-side px-3 py-3'>
        <div className='login-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-start '>
              <p className='fw-bold fs-5'>Basic Details</p>
              <hr className='hr' />
            </div>
            <div className='row g-3 mx'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                <div className='row  align-items-center'>
                  <label className=' col-form-label'>Title</label>
                  <div>
                    <select
                      defaultValue={b2bUser.b2b_title}
                      className='form-control'
                      {...register('b2b_title')}
                    >
                      <option defaultValue=' '>Please Select</option>
                      <option value='Mr'>Mr.</option>
                      <option value='Mrs'>Mrs.</option>
                      <option value='Miss'>Miss.</option>
                      <option value='Dr'>Dr.</option>
                      <option value='Prof'>Prof.</option>
                      <option value='Capt'>Capt.</option>
                      <option value='Hon'>Hon.</option>
                      <option value='Lord'>Lord.</option>
                      <option value='Engr'>Engr.</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <div>
                  <label className='col-form-label'>First Name</label>
                  <div>
                    <input
                      type='text'
                      required
                      defaultValue={b2bUser.b2b_first_name}
                      className='form-control'
                      placeholder='Enter first name'
                      {...register('b2b_first_name')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <div>
                  <label className='col-form-label'>Last Name</label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_last_name}
                      className='form-control'
                      placeholder='Enter last name'
                      {...register('b2b_last_name')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                <div>
                  <label className='col-form-label'>Department</label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_department}
                      className='form-control'
                      placeholder='Department'
                      {...register('b2b_department')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                <div>
                  <label className='col-form-label'>Designation</label>

                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_designation}
                      className='form-control'
                      placeholder='Designation'
                      {...register('b2b_designation')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>Mobile No</label>

                  <div>
                    <input
                      type='number'
                      defaultValue={b2bUser.b2b_phone}
                      className='form-control'
                      placeholder='Mobile No'
                      {...register('b2b_phone')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <div>
                  <label className='col-form-label'>
                    Official Email Address
                  </label>
                  <div>
                    <input
                      type='email'
                      defaultValue={b2bUser.b2b_email}
                      className='form-control valid'
                      placeholder='Enter Official Email Address '
                      {...register('b2b_email')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>Date Of Birth</label>
                  <div>
                    <input
                      name='b2b_date_of_birth'
                      type='date'
                      className='form-control date_of_birth '
                      placeholder='Date of Birth'
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <div>
                  <label className='col-form-label'>Company Name</label>

                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_organization}
                      className='form-control'
                      placeholder='Company Name'
                      {...register('b2b_organization')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <div>
                  <label className='col-form-label'>Website</label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_website}
                      className='form-control'
                      placeholder='Website'
                      {...register('b2b_website')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <div>
                  <label className='col-form-label'>Address Line 1</label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_address}
                      className='form-control'
                      placeholder='Address Line 1'
                      {...register('b2b_address')}
                    />
                  </div>
                </div>
              </div>

              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>Country</label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_country}
                      className='form-control'
                      placeholder='Country'
                      {...register('b2b_country')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>State</label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_state}
                      className='form-control'
                      placeholder='State'
                      {...register('b2b_state')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>City </label>
                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_city}
                      className='form-control'
                      placeholder='City '
                      {...register('b2b_city')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>Post Code </label>
                  <div>
                    <input
                      type='number'
                      defaultValue={b2bUser.b2b_post_code}
                      className='form-control'
                      placeholder='Post Code '
                      {...register('b2b_post_code')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>Telephone No</label>
                  <div>
                    <input
                      type='number'
                      defaultValue={b2bUser.b2b_telephone_number}
                      className='form-control'
                      placeholder='Telephone No '
                      {...register('b2b_telephone_number')}
                    />
                  </div>
                </div>
              </div>

              <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                <div>
                  <label className='col-form-label'>Passport No </label>

                  <div>
                    <input
                      type='text'
                      defaultValue={b2bUser.b2b_passport}
                      className='form-control'
                      placeholder='Passport No '
                      {...register('b2b_passport')}
                    />
                  </div>
                </div>
              </div>

              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                <div>
                  <label className='col-form-label'>
                    How much business you are doing with Bangladesh(in USD)
                  </label>
                  <div>
                    <input
                      {...register('b2b_count_business')}
                      type='number'
                      defaultValue={b2bUser.b2b_count_business}
                      className='form-control'
                      placeholder='How much business you are doing with Bangladesh(in USD)'
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 mt-4'>
                <div className='col-lg-offset-2 col-lg-12 text-end'>
                  {loading ? (
                    <Loader css={'text-white'} />
                  ) : (
                    <Button
                      style={{
                        backgroundColor: '#1982c3',
                        color: 'white',
                        borderRadius: '5px',
                        border: 'none',
                      }}
                      type='submit'
                      value='1'
                      name='update_profile'
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default B2BEditProfile;
