import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { Container, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AUTH_USER_FAILED,
  AUTH_VISITOR_USER_FAILED,
  BaseUrl,
  VISITOR_PROFILE_IMAGE_UPDATE,
} from '../../Helpers/Constant';
import { destroyCookie } from 'nookies';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import { imgUrl } from '../../Helpers/Constant';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import Toaster from '../../Components/Toaster/Toaster';

const VisitorProfile = () => {
  const location = useLocation();
  const Toast = Toaster();
  const { dispatch: authDispatch } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { visitorUser, dispatch: VisitorAuthDispatch } = VisitorAuthContext();

  const handleLogout = () => {
    destroyCookie(null, 'criclive_cric');
    authDispatch?.({
      type: AUTH_USER_FAILED,
    });
    VisitorAuthDispatch?.({
      type: AUTH_VISITOR_USER_FAILED,
    });
  };

  const handelImageUpdate = async (img: any) => {
    setLoading(true);
    const data: any = {
      visitor_id: visitorUser.visitor_id,
    };
    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append('visitor_photo', img);

    try {
      const res = await fetch(
        `${BaseUrl}/api/cric/visitor/visitor-info-update`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success) {
        Toast.fire({
          icon: 'success',
          title: data.message,
        });
        VisitorAuthDispatch?.({
          type: VISITOR_PROFILE_IMAGE_UPDATE,
          payload: {
            visitor_photo: data.visitor_photo
              ? data.visitor_photo
              : visitorUser.visitor_photo,
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
      <HeaderBottom pathName={'Visitor Profile'} />
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
                      !visitorUser.visitor_photo
                        ? '/blank-image.png'
                        : `${imgUrl}/visitor_files/${visitorUser?.visitor_photo}`
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
                        {visitorUser?.visitor_first_name}{' '}
                        {visitorUser?.visitor_last_name}
                      </h4>
                      <ul className='list-inline gap-5 sm-gap-1 d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center mb-0'>
                        <li className='list-inline-item fw-semibold'>
                          <FaRegAddressCard />
                          <span className='ps-2'>
                            {visitorUser?.visitor_id}
                          </span>
                        </li>
                        <li className='list-inline-item fw-semibold'>
                          <AiOutlineMail />
                          <span className='ps-2'>
                            {visitorUser?.visitor_email}
                          </span>
                        </li>
                        <li className='list-inline-item fw-semibold'>
                          <FiSmartphone />
                          <span className='ps-2'>
                            {visitorUser?.visitor_phone}
                          </span>
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
                    to='/visitor/register-event'
                    className={
                      location.pathname === `/visitor/register-event`
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
                    to='/visitor/profile'
                    className={
                      location.pathname === `/visitor/profile`
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
                    to='/visitor/edit-profile'
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

                  <Link
                    to='/visitor/invoice'
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
                  </Link>

                  <Link
                    to='/visitor/wishlist'
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
                  </Link>
                  <Link
                    to='/visitor/change-password'
                    className={
                      location.pathname === '/visitor/change-password'
                        ? 'profile-left-side-link-active'
                        : 'profile-left-side-link'
                    }
                  >
                    <div className='d-flex align-items-center gap-2 pb-3'>
                      <RiKeyLine />
                      <p>Change Password</p>
                    </div>
                  </Link>

                  <div
                    className='d-flex align-items-center gap-2 pointer'
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

export default VisitorProfile;
