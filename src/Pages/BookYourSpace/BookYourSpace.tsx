import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import CompanyProfile from '../../Components/RegistrationComponents/CompanyProfile';
import ContactPerson from '../../Components/RegistrationComponents/ContactPerson';
import PortalLogin from '../../Components/RegistrationComponents/PortalLogin';
import { useForm } from 'react-hook-form';
import Toaster from '../../Components/Toaster/Toaster';
import { ICompanyProfileInfoRegister, Ilogo } from '../../Types/RegisterTypes';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Spinner from 'react-bootstrap/Spinner';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { AUTH_USER_SUCCESS } from '../../Helpers/Constant';
import { setCookie } from 'nookies';
import { useNavigate } from 'react-router-dom';
import SpaceRequirements from '../../Components/RegistrationComponents/SpaceRequirments';
import axios from 'axios';

const BookYourSpace = () => {
  const { dispatch: authDispatch, setIsLoading } = useAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const [toggleButton, setToggleButton] = useState('');
  const { register, handleSubmit, reset } = useForm();
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [companyLogo, setCompanyLogo] = useState<Ilogo>({
    companyLogoPhoto: '',
    companyLogoAi: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [companyNumber, setCompanyNumber] = useState<string>('');
  const [companyProfileReg, setCompanyProfileReg] =
    useState<ICompanyProfileInfoRegister>();
  const [stalls, setStalls] = useState<any>([]);

  // async function loadData() {
  //   setLoading(true);
  //   const res = await fetcher.get(
  //     `/api/fair/member/get/company/info/for/registation/${companyNumber}`
  //   );
  //   if (res.success) {
  //     setTimeout(() => {
  //       setCompanyProfileReg(res.data);
  //       setCompanyNumber('');
  //       setLoading(false);
  //     }, 2000);
  //   } else {
  //     setLoading(false);
  //   }
  // }
  async function loadData() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://toab.services/api/v1/public/member/${companyNumber}`
      );

      if (response.data.success) {
        setTimeout(() => {
          setCompanyProfileReg(response.data.data);
          // setCompanyNumber('');
          setLoading(false);
        }, 2000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }
  const { companyName, address, email, mobileNumber } = companyProfileReg || {};

  const onSubmit = async (data: any) => {
    setIsLoading?.(true);
    if (companyNumber) {
      data.atab_user_member_id = companyNumber;
    }
    data.stalls = JSON.stringify(stalls);

    data.user_fair_member_company_name =
      data.user_fair_member_company_name || companyName;

    data.user_fair_member_company_address =
      data.user_fair_member_company_address || address;

    // data.user_fair_member_company_website =
    //   data.user_fair_member_company_website || company_website;

    data.user_fair_member_company_telephone =
      data.user_fair_member_company_telephone || mobileNumber;

    data.user_fair_member_company_email =
      data.user_fair_member_company_email || email;

    if (!stalls.length) {
      Toast.fire({
        icon: 'error',
        title: `Please select stall`,
      });
      setIsLoading?.(false);
      return;
    }
    if (data.user_fair_member_password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: `Password does not match`,
      });
      setIsLoading?.(false);
      return;
    }
    if (data.user_fair_member_password.length < 8) {
      Toast.fire({
        icon: 'error',
        title: `Password must be at least 8 characters`,
      });
      setIsLoading?.(false);
      return;
    }
    if (
      data.user_fair_member_contact_number.startsWith('01') &&
      data.user_fair_member_contact_number === 11
    ) {
      Toast.fire({
        icon: 'error',
        title: `Enter valid phone number`,
      });
      setIsLoading?.(false);
      return;
    }
    if (!companyLogo.companyLogoAi) {
      Toast.fire({
        icon: 'error',
        title: `Company logo file(ai) required`,
      });
      setIsLoading?.(false);
      return;
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'object') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    if (companyLogo.companyLogoPhoto) {
      formData.append(
        'user_fair_member_company_logo',
        companyLogo.companyLogoPhoto
      );
    }
    if (companyLogo.companyLogoAi) {
      formData.append(
        'user_fair_member_company_logo_ai',
        companyLogo.companyLogoAi
      );
    }

    const res = await fetcher.post({
      url: `/api/auth/fair-member/register`,
      body: formData,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: `Successfully register`,
      });
      authDispatch?.({
        type: AUTH_USER_SUCCESS,
        payload: res.data,
      });
      setCookie(null, 'toab_fair', res.token);
      setIsLoading?.(false);
      reset();
      navigate('/profile');
    } else {
      Toast.fire({
        icon: 'error',
        title: res.message,
      });
    }
    setIsLoading?.(false);
  };

  return (
    <Layout>
      <div
        style={{
          paddingBottom: '50px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <HeaderBottom pathName={'Book your space'} />
        <div className='container  pt-5'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='register-top'>
              <div className='register-top-div'>
                <h3>WE Fair </h3>
              </div>
              <div className='register-top-form-card '>
                <Row className='d-block d-md-flex align-items-center'>
                  <Col sx={12} md={12} className='pb-2 pb-md-0'>
                    <div className='d-block d-md-flex gap-4'>
                      <div className='d-flex align-items-center gap-3 ps-0 ps-md-3 '>
                        <label htmlFor=''>
                          Want to Book your Space ?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        {/* <Form.Check
                          type='radio'
                          aria-label='radio 1'
                          name='yes'
                          label='Yes'
                          onClick={() => setToggleButton('yes')}
                        /> */}
                        <Form.Check
                          type='radio'
                          name='yes'
                          aria-label='radio 1'
                          label='Book My Space'
                          onClick={() => setToggleButton('no')}
                        />
                      </div>
                      <div className='pt-2 pt-md-0'>
                        {toggleButton === 'yes' && (
                          <div className=' d-block d-md-flex align-items-center gap-0 gap-md-2'>
                            <label htmlFor=''>
                              Membership number{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </label>

                            <div className='membership-number d-flex gap-2  align-items-center '>
                              <input
                                required
                                value={companyNumber}
                                type='text'
                                onChange={(e: any) =>
                                  setCompanyNumber(e.target.value)
                                }
                                placeholder='TOAB membership number'
                              />

                              <div>
                                {loading ? (
                                  <button className='continue-btn' disabled>
                                    <Spinner
                                      animation='border'
                                      variant='warning'
                                      style={{ height: '15px', width: '15px' }}
                                    />{' '}
                                    loading..
                                  </button>
                                ) : (
                                  <button
                                    className='continue-btn'
                                    onClick={loadData}
                                  >
                                    Continue
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div
              className={
                toggleButton === 'no' || companyProfileReg?.email
                  ? ''
                  : 'parent-register'
              }
            >
              <div
                className={
                  toggleButton === 'no' || companyProfileReg?.email
                    ? ''
                    : 'child-register'
                }
              >
                <div>
                  <CompanyProfile
                    register={register}
                    companyProfileReg={companyProfileReg}
                    setCompanyLogo={setCompanyLogo}
                    companyLogo={companyLogo}
                  />
                </div>

                <div>
                  <SpaceRequirements
                    setStalls={setStalls}
                    register={register}
                    stalls={stalls}
                  />
                </div>
                <div>
                  <ContactPerson
                    companyProfileReg={companyProfileReg}
                    register={register}
                  />
                </div>
                <div>
                  <PortalLogin
                    register={register}
                    setConfirmPassword={setConfirmPassword}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BookYourSpace;
