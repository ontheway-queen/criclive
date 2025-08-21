import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Toaster from '../../Components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B2B_USER_FAILED, B2B_USER_SUCCESS } from '../../Helpers/Constant';
import { setCookie } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loader from '../../Components/Spinner/Loader';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';

interface inputForm {
  b2b_organization: string;
  b2b_first_name: string;
  b2b_last_name: string;
  b2b_gender: string;
  b2b_email: string;
  b2b_phone: string;
  b2b_password: string;
  b2b_photo: string;
  b2b_type: string;
  b2b_title: string;
  b2b_department: string;
  b2b_designation: string;
  b2b_date_of_birth: string;
  b2b_website: string;
  b2b_address: string;
  b2b_address_line_2: string;
  b2b_address_line_3: string;
  b2b_country: string;
  b2b_state: string;
  b2b_city: string;
  b2b_post_code: string;
  b2b_telephone_number: string;
  b2b_passport: string;
  b2b_date_of_issue: string;
  b2b_date_of_expiry: string;
  b2b_passport_scan_copy: any;
  b2b_count_business: string;
  b2b_company_position: string;
  b2b_company_established: string;
  b2b_company_employees: string;
  b2b_business_south_asia: string;
  b2b_business_approximate: string;
  b2b_sent_passenger: string;
  b2b_total_number_paxs_outbound: string;
  b2b_total_number_paxs_inbound: string;
  b2b_total_number_paxs_domestic: string;
  b2b_business_approximate_outbound: string;
  b2b_hosted_buyer_satte: string;
  b2b_company_travel_segment: string;
  b2b_scan_copy_visiting_card: any;
  b2b_scan_copy_photograph: any;
  b2b_terms_and_conditions: any;
  b2b_business_serve_south_asia: string;
  b2b_place_of_birth: string;
  b2b_join_year: string;
}

const B2BRegistration = () => {
  const { dispatch: authDispatch, isLoading, setIsLoading } = B2BAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<inputForm>();
  const [passwordType, setPasswordType] = useState<string>('password');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passportPhoto, setPassportPhoto] = useState<any>('');
  const [visitingPhoto, setVisitingPhoto] = useState<any>('');
  const [profilePhoto, setProfilePhoto] = useState<any>('');
  // const { register, handleSubmit } = useForm();
  const [showJoinFields, setShowJoinFields] = useState(false);
  const [showJoinFields2, setShowJoinFields2] = useState(false);

  const handleHostedBuyerChange = (event: any) => {
    const value = event.target.value;
    setShowJoinFields(value === '1'); // Show join fields only if 'Yes' is selected
  };
  const handleHostedBuyerChange2 = (event: any) => {
    const value = event.target.value;
    setShowJoinFields2(value === '1'); // Show join fields only if 'Yes' is selected
  };
  const onSubmit: SubmitHandler<inputForm> = async (data: any) => {
    if (!passportPhoto) {
      Toast.fire({
        icon: 'error',
        title: `Upload  Passport photo `,
      });
      setIsLoading?.(false);
      return;
    }
    if (!visitingPhoto) {
      Toast.fire({
        icon: 'error',
        title: `Upload  Visiting photo `,
      });
      setIsLoading?.(false);
      return;
    }
    if (!profilePhoto) {
      Toast.fire({
        icon: 'error',
        title: `Upload  Profile photo `,
      });
      setIsLoading?.(false);
      return;
    }
    if (data.b2b_password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: `Password does not match `,
      });
      setIsLoading?.(false);
      return;
    }
    if (data.b2b_password.length < 8) {
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
    fromData.append('b2b_passport_scan_copy', passportPhoto);
    fromData.append('b2b_photo', profilePhoto);
    fromData.append('b2b_scan_copy_visiting_card', visitingPhoto);

    // const checkboxes = document.querySelectorAll<HTMLInputElement>(
    //   '[name="b2b_company_travel_segment"]'
    // );

    // const selectedSegments = Array.from(checkboxes)
    //   .filter((checkbox) => checkbox.checked)
    //   .map((checkbox) => checkbox.value);

    // fromData.append(
    //   'b2b_company_travel_segment',
    //   JSON.stringify(selectedSegments)
    // );

    try {
      setIsLoading?.(true);
      const res = await fetcher.post({
        url: '/api/auth/b2b/registration',
        body: fromData,
      });

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: `successfully register`,
        });
        authDispatch?.({
          type: B2B_USER_SUCCESS,
          payload: res.data,
        });
        setCookie(null, 'toab_fair', res.token);
        setIsLoading?.(false);
        navigate('/b2b/profile');
      } else {
        Toast.fire({
          icon: 'error',
          title: res.message,
        });
        setIsLoading?.(false);
        authDispatch?.({ type: B2B_USER_FAILED });
      }
    } catch (error) {
      authDispatch?.({ type: B2B_USER_FAILED });
    }
  };

  return (
    <Layout>
      <HeaderBottom pathName={'Buyer/Seller B2B Meeting Registration'} />
      <div className='login-wrapper'>
        <div className='login-div'>
          <div className='visitor-registration-page'>
            <div className='text-center mt-3'>
              <p className='fw-bold fs-3'>
                Buyer/Seller B2B Meeting Registration
              </p>
            </div>

            <div className='login-form'>
              <div>
                <h5 style={{ color: 'red', fontWeight: 'bold' }}>
                  $25O Facilities
                </h5>
                <div className='ms-4 mb-4'>
                  <ul>
                    <li>3 Days Accomadation</li>
                    <li>1 Day B2B Session</li>
                    <li>Gala Dinner Welcome</li>
                    <li>Gala Dinner Closing</li>
                    <li>All Transportation(Hotel - Venue)</li>
                  </ul>
                </div>
                <hr className='hr' />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-start mt-3'>
                  <p className='fw-bold fs-5'>Basic Details</p>
                  <hr className='hr' />
                </div>

                <div className='row g-3 mx'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                    <div className='row  align-items-center'>
                      <label className=' col-form-label'>
                        Title <span className='require'>*</span>
                      </label>
                      <div>
                        <select
                          {...register('b2b_title')}
                          required
                          className='form-control'
                        >
                          <option defaultValue=' '>Please Select</option>
                          <option value='mr'>Mr.</option>
                          <option value='mrs'>Mrs.</option>
                          <option value='miss'>Miss.</option>
                          <option value='dr'>Dr.</option>
                          <option value='prof'>Prof.</option>
                          <option value='capt'>Capt.</option>
                          <option value='hon'>Hon.</option>
                          <option value='lord'>Lord.</option>
                          <option value='engr'>Engr.</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                    <div>
                      <label className='col-form-label'>
                        First Name <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          type='text'
                          required
                          {...register('b2b_first_name')}
                          className='form-control'
                          placeholder='Enter first name'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                    <div>
                      <label className='col-form-label'>
                        Last Name <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_last_name')}
                          className='form-control'
                          placeholder='Enter last name'
                          required
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
                          {...register('b2b_department')}
                          className='form-control'
                          placeholder='Department'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                    <div>
                      <label className='col-form-label'>Designation</label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_designation')}
                          className='form-control'
                          placeholder='Designation'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                    <div>
                      <label className='col-form-label'>Mobile No</label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='number'
                          {...register('b2b_phone')}
                          className='form-control'
                          placeholder='Mobile No'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                    <div>
                      <label className='col-form-label'>
                        Official Email Address{' '}
                        <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          type='email'
                          required
                          {...register('b2b_email')}
                          className='form-control valid'
                          placeholder='Enter Official Email Address '
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                    <div>
                      <label className='col-form-label'>
                        Date Of Birth <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          {...register('b2b_date_of_birth')}
                          name='b2b_date_of_birth'
                          type='date'
                          className='form-control date_of_birth '
                          placeholder='Date of Birth'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                    <div>
                      <label className='col-form-label'>Company Name</label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_organization')}
                          className='form-control'
                          placeholder='Company Name'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                    <div>
                      <label className='col-form-label'>Website</label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_website')}
                          className='form-control'
                          placeholder='Website'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <div>
                      <label className='col-form-label'>Address</label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_address')}
                          className='form-control'
                          placeholder='Address'
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                    <div>
                      <label className='col-form-label'>Country</label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_country')}
                          className='form-control'
                          placeholder='Country'
                          required
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
                          {...register('b2b_state')}
                          className='form-control'
                          placeholder='State'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                    <div>
                      <label className='col-form-label'>City </label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_city')}
                          className='form-control'
                          placeholder='City '
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                    <div>
                      <label className='col-form-label'>Post Code </label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='number'
                          {...register('b2b_post_code')}
                          className='form-control'
                          placeholder='Post Code '
                          required
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
                          {...register('b2b_telephone_number')}
                          className='form-control'
                          placeholder='Telephone No '
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                    <div>
                      <label className='col-form-label'>Place of birth </label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_place_of_birth')}
                          className='form-control'
                          placeholder='Place of birth '
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                    <div>
                      <label className='col-form-label'>Passport No </label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='text'
                          {...register('b2b_passport')}
                          className='form-control'
                          placeholder='Passport No '
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                    <div>
                      <label className='col-form-label'>
                        Date of Issue <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          {...register('b2b_date_of_issue')}
                          name='b2b_date_of_issue'
                          type='date'
                          className='form-control date_of_birth '
                          placeholder='Date of Issue'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                    <div>
                      <label className='col-form-label'>
                        Date of Expiry <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          {...register('b2b_date_of_expiry')}
                          name='b2b_date_of_expiry'
                          type='date'
                          className='form-control date_of_birth '
                          placeholder='Date of Expiry'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        How much business you are doing with Bangladesh(in USD)
                      </label>
                      <span className='require'>*</span>
                      <div>
                        <input
                          type='number'
                          {...register('b2b_count_business')}
                          className='form-control'
                          placeholder='How much business you are doing with Bangladesh(in USD)'
                          required
                        />
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
                                className='ls-is-cached lazyloaded'
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
                                className='ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src='/assets/image.png'
                                alt=''
                              />
                            )}
                          </div>

                          <div>
                            <input
                              name='b2b_photo'
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
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
                    <div className='row'>
                      <label>
                        Please upload a Scan Copy of Your Visiting Card{' '}
                      </label>
                      <div className='w-150-100'>
                        <div className='companies-logo-card'>
                          <div
                            className='img-thumbnail '
                            style={{ width: '280px' }}
                          >
                            {visitingPhoto ? (
                              <img
                                style={{
                                  width: '270px',
                                  height: '135px',
                                }}
                                className=' ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src={URL.createObjectURL(visitingPhoto)}
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
                              // hidden
                              onChange={(e: any) =>
                                setVisitingPhoto(e.target.files[0])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
                    <div className='row'>
                      <label>
                        Please upload a Scan Copy of your passport Photograph
                      </label>
                      <div className='w-150-100'>
                        <div className='companies-logo-card'>
                          <div
                            className='img-thumbnail '
                            style={{ width: '280px' }}
                          >
                            {passportPhoto ? (
                              <img
                                style={{
                                  width: '270px',
                                  height: '135px',
                                }}
                                className=' ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src={URL.createObjectURL(passportPhoto)}
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
                              // hidden
                              onChange={(e: any) =>
                                setPassportPhoto(e.target.files[0])
                              }
                            />
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='text-start mt-3'>
                    <hr className='hr' />
                    <p className='fw-bold fs-5'>Other Details</p>
                    <hr className='hr' />
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        How would you describe your position within the company?
                      </label>
                      <span className='require'>*</span>
                      <div>
                        <select
                          {...register('b2b_company_position')}
                          className='form-select'
                          id='multiple-select-clear-field'
                          data-placeholder='Choose anything'
                        >
                          <option defaultValue={'MD/CEO/Chairman/President'}>
                            MD/CEO/Chairman/President
                          </option>
                          <option value={'Owner/Partner/Associate'}>
                            Owner/Partner/Associate
                          </option>
                          <option value={'Senior Managemen'}>
                            Senior Management
                          </option>
                          <option value={'Middle Management'}>
                            Middle Management
                          </option>
                          <option value={'other'}>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Date of Established <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          {...register('b2b_company_established')}
                          name='b2b_company_established'
                          type='date'
                          className='form-control date_of_birth '
                          placeholder='Date of Established'
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        How many employees does your company have?{' '}
                      </label>
                      <span className='require'>*</span>
                      <div>
                        <select
                          {...register('b2b_company_employees')}
                          name='b2b_company_employees'
                          className='form-select'
                          id='multiple-select-clear-field'
                          data-placeholder='Choose anything'
                        >
                          <option defaultValue={'50'}>Less than 50 </option>
                          <option value={'50 - 100'}>50-100 </option>
                          <option value={'100+'}>100+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Does your business serves South Asia?{' '}
                      </label>
                      <span className='require'>*</span>
                      <div>
                        <select
                          {...register('b2b_business_serve_south_asia')}
                          name='b2b_business_serve_south_asia'
                          className='form-select'
                          id='multiple-select-clear-field'
                          data-placeholder='Choose anything'
                          onChange={handleHostedBuyerChange2}
                        >
                          <option defaultValue={' '}>Please Select</option>

                          <option value={'1'}>Yes</option>
                          <option value={'0'}>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {showJoinFields2 && (
                    <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                      <div>
                        <label className='col-form-label'>
                          What % of your business approximately is for South
                          Asia?
                        </label>

                        <div>
                          <select
                            {...register('b2b_business_south_asia')}
                            className='form-select'
                            id='multiple-select-clear-field'
                            data-placeholder='Choose anything'
                          >
                            <option defaultValue={' '}>Please Select</option>
                            <option value={'1-10'}>1% - 10%</option>
                            <option value={'11-20'}>11% - 20%</option>
                            <option value={'21-30'}>21% - 30%</option>
                            <option value={'31-40'}>31% - 40%</option>
                            <option value={'>40'}>40% +</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Which are the top 3 countries you have sent passenger in
                        FY 2022-2023? <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          {...register('b2b_sent_passenger')}
                          type='number'
                          className='form-control valid'
                          placeholder='Which are the top 3 countries you have sent passenger in
                          FY 2022-2023?'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        What is the total number of paxs your company catered to
                        in each 3 countries in FY 2023-2024 - Outbound?{' '}
                        <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          {...register('b2b_total_number_paxs_outbound')}
                          type='number'
                          className='form-control valid'
                          placeholder='What is the total number of paxs your company catered to
                          in each 3 countries in FY 2023-2024 - Outbound?'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        What is the total number of paxs your company catered to
                        in each 3 countries in FY 2023-2024 - Inbound?
                        <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          {...register('b2b_total_number_paxs_inbound')}
                          type='number'
                          className='form-control valid'
                          placeholder='What is the total number of paxs your company catered to
                          in each 3 countries in FY 2023-2024 - Outbound?'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        What is the total number of paxs your company catered to
                        in each 3 countries in FY 2023-2024 - Domestic?
                        <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          {...register('b2b_total_number_paxs_domestic')}
                          type='number'
                          className='form-control valid'
                          placeholder='  What is the total number of paxs your company catered to
                          in each 3 countries in FY 2023-2024 - Domestic?'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-100'>
                    <div>
                      <label className='col-form-label'>
                        Have you ever been a Hosted Buyer at WE in the past?{' '}
                      </label>
                      <span className='require'>*</span>
                      <div>
                        <select
                          {...register('b2b_hosted_buyer_satte')}
                          name='b2b_hosted_buyer_satte'
                          className='form-select'
                          id='multiple-select-clear-field'
                          data-placeholder='Choose anything'
                          onChange={handleHostedBuyerChange}
                        >
                          <option defaultValue={' '}>Please Select</option>
                          <option value={'1'}>Yes</option>
                          <option value={'0'}>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {showJoinFields && (
                    <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                      <div>
                        <label className='col-form-label'>Join</label>
                        <div>
                          <input
                            {...register('b2b_join_year')}
                            name='b2b_join_year'
                            type='number'
                            className='form-control '
                            placeholder='Join'
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div>
                      <label className='col-form-label'>
                        Password <span className='require'>*</span>
                      </label>
                      <div>
                        <input
                          required
                          {...register('b2b_password')}
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
                <div className='mt-3 '>
                  <div className=' d-flex align-items-center'>
                    <input
                      {...register('b2b_terms_and_conditions')}
                      required
                      name='b2b_terms_and_conditions'
                      value={'1'}
                      type='checkbox'
                    />
                    <p className='ps-2'>
                      I accept the Buyer/Seller B2B Meeting Registration Terms &
                      Conditions and Privacy Terms.
                    </p>
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
                  Already Registered?{' '}
                  <Link to='/b2b-login' className='text-decoration-none'>
                    Buyer/Seller B2B Meeting login
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

export default B2BRegistration;
