import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import Toaster from '../../Components/Toaster/Toaster';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Spinner/Loader';
import { Button } from 'react-bootstrap';

const VisitorEditProfile = () => {
  const Toast = Toaster();
  const navigate = useNavigate();
  const { visitorUser } = VisitorAuthContext();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.visitor_id = visitorUser.visitor_id;
    data.visitor_date_of_birth = date;

    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      if (data[item]) {
        formData.append(item, data[item]);
      }
    });

    try {
      const res = await fetcher.put({
        url: '/api/fair/visitor/visitor-info-update',
        body: formData,
      });

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: res.message,
        });

        navigate('/visitor/profile');
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='section-title-cs edit-sec-cs'>
            <h4 className='component-tittle'> Profile Info</h4>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  First Name <span className='require'>*</span>
                </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='text'
                    disabled
                    placeholder='First Name'
                    defaultValue={visitorUser.visitor_first_name}
                    id='f-name'
                    name='first_name'
                    className='form-control '
                  />
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  Last Name <span className='require'>*</span>
                </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='text'
                    placeholder='Last Name'
                    disabled
                    defaultValue={visitorUser.visitor_last_name}
                    name='last_name'
                    className='form-control '
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>Email </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='email'
                    disabled
                    placeholder='Email'
                    defaultValue={visitorUser.visitor_email}
                    name='email'
                    className='form-control'
                  />
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  Mobile No <span className='require'>*</span>{' '}
                </label>
                <div className='input-group'>
                  <input
                    type='number'
                    placeholder='Mobile No'
                    {...register('visitor_phone')}
                    className='form-control '
                    defaultValue={visitorUser.visitor_phone}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label col-lg-12 '>
                  Gender <span className='require'>*</span>{' '}
                </label>
                <div>
                  <select
                    {...register('visitor_gender')}
                    className='form-select'
                    defaultValue={visitorUser.visitor_gender}
                  >
                    <option value='male'>male</option>
                    <option value='female'>female</option>
                  </select>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>Date Of Birth </label>
                <div className='col-sm-12'>
                  <input
                    type='date'
                    onChange={(e) => setDate(e.target.value)}
                    className='form-control date_of_birth '
                    placeholder='Date of Birth'
                    value={date}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>Education</label>
                <div className='col-sm-12'>
                  <select
                    {...register('visitor_education')}
                    className='form-select'
                    defaultValue={visitorUser.visitor_education}
                  >
                    <option disabled>-- Select Education --</option>
                    <option value='S.S.C'>S.S.C</option>
                    <option value='H.S.C'>H.S.C</option>
                    <option value='Graduation'>Graduation</option>
                    <option value='Masters'>Masters</option>
                    <option value='PHD'>PHD</option>
                    <option value='Others'>Others</option>
                  </select>
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>Profession</label>
                <div className='col-sm-12 padding_0'>
                  <select
                    {...register('visitor_profession')}
                    className='form-select'
                    defaultValue={visitorUser.visitor_profession}
                  >
                    <option disabled>-- Select Profession --</option>
                    <option value='Business'>Business</option>
                    <option value='Govt. Job'>Govt. Job</option>
                    <option value='Private Job'>Private Job</option>
                    <option value='Doctor'>Doctor</option>
                    <option value='Engineer'>Engineer</option>
                    <option value='Teacher'>Teacher</option>
                    <option value='Student'>Student</option>
                    <option value='Software Engineer'>Software Engineer</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>Organization</label>
                <div className='col-lg-12padding_right_0'>
                  <input
                    type='text'
                    placeholder='Enter Organization'
                    {...register('visitor_organization')}
                    id='p-name'
                    className='form-control'
                    defaultValue={visitorUser.visitor_organization}
                  />
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>Designation</label>
                <div className='col-lg-12padding_right_0'>
                  <input
                    type='text'
                    placeholder='Enter Designation'
                    {...register('visitor_designation')}
                    id='designation'
                    className='form-control'
                    defaultValue={visitorUser.visitor_designation}
                  />
                </div>
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                <label className='control-label'>Website</label>
                <div className='col-lg-12padding_right_0'>
                  <input
                    type='text'
                    placeholder='Enter Website'
                    {...register('visitor_website')}
                    id='website'
                    className='form-control'
                    defaultValue={visitorUser.visitor_website}
                  />
                </div>
              </div>
            </div>
            <div className='section-title-cs edit-sec-cs'>
              <h4 className='profile-title'> Address &amp; Location </h4>
              <div className='row mb-3'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                  <label className='control-label'>
                    Address <span className='require'>*</span>
                  </label>
                  <div className='col-sm-12'>
                    <textarea
                      className='form-control '
                      {...register('visitor_address')}
                      placeholder='Address'
                      defaultValue={visitorUser.visitor_address}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                  <label className='control-label'>
                    Zip <span className='require'>*</span>
                  </label>
                  <div className='col-sm-12'>
                    <input
                      type='text'
                      className='form-control '
                      {...register('visitor_zip_code')}
                      placeholder='Zip Code'
                      defaultValue={visitorUser.visitor_zip_code}
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                  <label className='control-label'>City </label>
                  <div className='col-sm-12'>
                    <input
                      type='text'
                      className='form-control'
                      {...register('visitor_city')}
                      placeholder='City'
                      defaultValue={visitorUser.visitor_city}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='section-title-cs edit-sec-cs'>
              <h4 className='profile-title'> Social Media</h4>

              <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                  <label className='control-label'>
                    Facebook<span className='require'></span>
                  </label>
                  <div className='col-lg-12 padding_right_0'>
                    <input
                      type='url'
                      placeholder='Enter facebook profile url'
                      id='facebook'
                      className='form-control  '
                      name='facebook'
                    />
                  </div>
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
    </>
  );
};

export default VisitorEditProfile;
