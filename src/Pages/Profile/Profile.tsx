import React from 'react';
import Layout from '../../Components/Layout/Layout';
import { Button, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';
import { RiKeyLine } from 'react-icons/ri';
import { BsFillSdCardFill } from 'react-icons/bs';
import { RiWechatLine } from 'react-icons/ri';
import { ImLocation } from 'react-icons/im';
import { BiUserCheck } from 'react-icons/bi';
import { CgProductHunt } from 'react-icons/cg';
import { HiPhone } from 'react-icons/hi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import {
  AUTH_USER_FAILED,
  AUTH_VISITOR_USER_FAILED,
  imgUrl,
} from '../../Helpers/Constant';
import { destroyCookie } from 'nookies';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';

const Profile = () => {
  const { user, dispatch: authDispatch } = useAuthContext();
  const { dispatch: VisitorAuthDispatch } = VisitorAuthContext();
  const location = useLocation();
  const handleLogout = () => {
    destroyCookie(null, 'toab_fair');
    authDispatch?.({
      type: AUTH_USER_FAILED,
    });
    VisitorAuthDispatch?.({
      type: AUTH_VISITOR_USER_FAILED,
    });
  };

  return (
    <>
      <Layout>
        <div
          style={{
            paddingTop: '50px',
            paddingBottom: '50px',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <div className='profile-left-side'>
                  <div className='profile-left-side-wrapper'>
                    <div>
                      <img
                        width={350}
                        height={160}
                        style={{ objectFit: 'contain' }}
                        src={`${imgUrl}/fair_member_files/${user.user_fair_member_company_logo}`}
                        alt=''
                      />
                    </div>
                    <div className='pt-2'>
                      <p className='fs-5'>
                        {user.user_fair_member_company_name}{' '}
                      </p>
                    </div>
                    <div className='pt-1'>
                      <p>{user.user_fair_member_email} </p>
                    </div>
                  </div>
                </div>

                <div className='profile-left-side mt-4 ps-4 py-3'>
                  <p className='font-italic'>About</p>
                  <div>
                    <Link
                      to='/profile/product-and-services'
                      className={
                        location.pathname === `/profile/product-and-services`
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2 py-3'>
                        <CgProductHunt />
                        <p>Product & Services</p>
                      </div>
                    </Link>
                    <Link
                      to='/profile'
                      className={
                        location.pathname === '/profile'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2 '>
                        <CgProfile />
                        <p>Profile</p>
                      </div>
                    </Link>
                    <Link
                      to='/profile/my-leads'
                      className={
                        location.pathname === '/profile/my-leads'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2 py-3'>
                        <BiUserCheck />
                        <p>My Leads (Exhibition)</p>
                      </div>
                    </Link>
                    <Link
                      to='/profile/online-visitors'
                      className={
                        location.pathname === '/profile/online-visitors'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2'>
                        <BiUserCheck />
                        <p>Online Visitors</p>
                      </div>
                    </Link>
                    <Link
                      to='/profile/register-visitors'
                      className={
                        location.pathname === '/profile/register-visitors'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2 py-3'>
                        <BiUserCheck />
                        <p>My Registered Visitors</p>
                      </div>
                    </Link>
                    <Link
                      to='/profile/space-requirements'
                      className={
                        location.pathname === '/profile/space-requirements'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2'>
                        <BsFillSdCardFill />
                        <p>Space Requirements </p>
                      </div>
                    </Link>

                    <Link
                      to='/profile/change-password'
                      className={
                        location.pathname === '/profile/change-password'
                          ? 'profile-left-side-link-active'
                          : 'profile-left-side-link'
                      }
                    >
                      <div className='d-flex align-items-center gap-2 py-3'>
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
                <div className='profile-left-side mt-4 px-4 py-3 d-none d-md-block'>
                  <div className='text-center pb-3'>
                    <RiWechatLine size={100} />
                    <p className='fs-3 fw-800'>Need help?</p>
                  </div>
                  <div className='pt-2 ps-2 pb-4'>
                    <div>
                      <ImLocation />
                      <span className='ps-2'>
                        105/E West Agargaon (2nd Floor), Agargaon Administrative
                        Area, Sher-E-Bangla Nagar, 60 Feet Road, Dhaka-1207,
                        Bangladesh.
                      </span>
                    </div>
                    <div className='py-3'>
                      <HiOutlineMailOpen />
                      <span className='ps-2'>bttf@toab.org</span>
                    </div>
                    <div className=''>
                      <HiPhone />
                      <span className='ps-2'>+88 02-58154155</span>
                    </div>
                  </div>
                  <Button
                    className='w-100'
                    style={{ backgroundColor: '#0c8d2d' }}
                  >
                    Contact us
                  </Button>
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
    </>
  );
};

export default Profile;
