import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { Container, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useLocation } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaRegAddressCard } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiUserCheck } from 'react-icons/bi';
import { CgProductHunt } from 'react-icons/cg';
import { MdPayment } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { RiKeyLine } from 'react-icons/ri';
import { FiSmartphone } from 'react-icons/fi';
import { AiOutlineCamera } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import {
  AUTH_USER_FAILED,
  B2B_PROFILE_IMAGE_UPDATE,
  B2B_USER_FAILED,
  BaseUrl,
} from '../../Helpers/Constant';
import { destroyCookie } from 'nookies';
import { imgUrl } from '../../Helpers/Constant';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import Toaster from '../../Components/Toaster/Toaster';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';

const B2BProfile = () => {
  const location = useLocation();
  const Toast = Toaster();
  const { dispatch: authDispatch } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { b2bUser, dispatch: b2bAuthDispatch } = B2BAuthContext();
  // console.log(b2bUser);
  const handleLogout = () => {
    destroyCookie(null, 'criclive_cric');
    authDispatch?.({
      type: AUTH_USER_FAILED,
    });
    b2bAuthDispatch?.({
      type: B2B_USER_FAILED,
    });
  };

  const handelImageUpdate = async (img: any) => {
    setLoading(true);
    const data: any = {
      b2b_id: b2bUser.b2b_id,
    };
    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append('b2b_photo', img);

    try {
      const res = await fetch(
        `${BaseUrl}/api/cric/member/b2b/${b2bUser.b2b_id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data.data.b2b_photo);
      console.log(data);

      if (data.success) {
        Toast.fire({
          icon: 'success',
          title: data.message,
        });
        b2bAuthDispatch?.({
          type: B2B_PROFILE_IMAGE_UPDATE,
          payload: {
            b2b_photo: data.data?.b2b_photo
              ? data.data?.b2b_photo
              : b2bUser.b2b_photo,
          },
        });
        setLoading(false);
      } else {
        Toast.fire({
          icon: 'error',
          title: data.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <HeaderBottom pathName={'Buyer/Seller B2B Profile'} />
      <div
        style={{
          paddingTop: '50px',
          paddingBottom: '50px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container>
          <div className='col-12'>
            <div className='card mb-4'>
              <div className='user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4'>
                <div className='mt-3 flex-shrink-0 mx-auto mx-sm-0 position-relative '>
                  <img
                    src={
                      !b2bUser.b2b_photo
                        ? '/blank-image.png'
                        : `${imgUrl}/b2b_files/${b2bUser?.b2b_photo}`
                    }
                    height={170}
                    style={{ objectFit: 'contain' }}
                    width={180}
                    alt=''
                    className='rounded-3 user-profile-img d-block  ms-0 ms-sm-4'
                  />

                  <div className=' position-absolute bottom-0 end-0'>
                    {loading ? (
                      <Spinner animation='border' variant='primary' />
                    ) : (
                      <label htmlFor='file'>
                        <AiOutlineCamera size={25} className='pointer' />
                        <input
                          type='file'
                          id='file'
                          onChange={(e: any) =>
                            handelImageUpdate(e.target.files[0])
                          }
                          hidden
                          className='d-none'
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className='flex-grow-1 mt-3 mt-sm-5'>
                  <div className='pt-1 gap-4 d-flex flex-column flex-md-row justify-content-start justify-content-md-betcricen align-items-center align-items-sm-start align-items-md-end mx-4'>
                    <div className='user-profile-info'>
                      <h4 className='mb-4 fw-bold'>
                        {b2bUser?.b2b_first_name} {b2bUser?.b2b_last_name}
                      </h4>
                      <ul className='list-inline gap-5 sm-gap-1 d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center mb-0'>
                        <li className='list-inline-item fw-semibold'>
                          <FaRegAddressCard />
                          <span className='ps-2'>{b2bUser?.b2b_id}</span>
                        </li>
                        <li className='list-inline-item fw-semibold'>
                          <AiOutlineMail />
                          <span className='ps-2'>{b2bUser?.b2b_email}</span>
                        </li>
                        <li className='list-inline-item fw-semibold'>
                          <FiSmartphone />
                          <span className='ps-2'>{b2bUser?.b2b_phone}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* route  */}
          <Row>
            <Col xs={12} md={4}>
              <div className='profile-left-side  ps-4 py-3'>
                <div>
                  <Link
                    to='/b2b/register-event'
                    className={
                      location.pathname === `/b2b/register-event`
                        ? 'profile-left-side-link-active'
                        : 'profile-left-side-link'
                    }
                  >
                    <div className='d-flex align-items-center gap-2 '>
                      <CgCalendarDates />
                      <p>Registered Events</p>
                    </div>
                  </Link>
                  <Link
                    to='/b2b/profile'
                    className={
                      location.pathname === `/b2b/profile`
                        ? 'profile-left-side-link-active'
                        : 'profile-left-side-link'
                    }
                  >
                    <div className='d-flex align-items-center gap-2 py-3'>
                      <CgProductHunt />
                      <p>Profile</p>
                    </div>
                  </Link>
                  <Link
                    to='/b2b/edit-profile'
                    className={
                      location.pathname === '/visitor/edit-profile'
                        ? 'profile-left-side-link-active'
                        : 'profile-left-side-link'
                    }
                  >
                    <div className='d-flex align-items-center gap-2 '>
                      <BiEditAlt />
                      <p>Edit Profile</p>
                    </div>
                  </Link>

                  {/* <Link
                    to='/b2b/invoice'
                    className={
                      location.pathname === '/visitor/invoice'
                        ? 'profile-left-side-link-active'
                        : 'profile-left-side-link'
                    }
                  >
                    <div className='d-flex align-items-center gap-2 pt-3'>
                      <MdPayment />
                      <p>Payment</p>
                    </div>
                  </Link> */}

                  {/* <Link
                    to='/b2b/wishlist'
                    className={
                      location.pathname === '/visitor/wishlist'
                        ? 'profile-left-side-link-active'
                        : 'profile-left-side-link'
                    }
                  >
                    <div className='d-flex align-items-center gap-2 py-3'>
                      <BiUserCheck />
                      <p>My Wishlist</p>
                    </div>
                  </Link> */}
                  <div className='d-flex align-items-center gap-2 py-3'>
                    <Link
                      to='/b2b/change-password'
                      className={
                        location.pathname === '/visitor/change-password'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center'>
                        <RiKeyLine />
                        <p>Change Password</p>
                      </div>
                    </Link>
                  </div>

                  <div
                    className='d-flex align-items-center gap-2 pb-3 pointer'
                    onClick={handleLogout}
                  >
                    <BiLogOutCircle />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className='mt-5 mt-md-0'>
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default B2BProfile;
