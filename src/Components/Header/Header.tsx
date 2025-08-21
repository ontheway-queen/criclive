// import { Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import { useAuthContext } from '../../Context/AuthContex/AuthContex';
// import { Button } from 'react-bootstrap';
// import { destroyCookie } from 'nookies';
// import {
//   AUTH_USER_FAILED,
//   AUTH_VISITOR_USER_FAILED,
//   B2B_USER_FAILED,
// } from '../../Helpers/Constant';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
// import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';
// const Header = () => {
//   const { user, dispatch: authDispatch } = useAuthContext();
//   const { visitorUser, dispatch: VisitorAuthDispatch } = VisitorAuthContext();
//   const { b2bUser, dispatch: B2BAuthDispatch } = B2BAuthContext();

//   const handleLogout = () => {
//     destroyCookie(null, 'toab_fair');
//     authDispatch?.({
//       type: AUTH_USER_FAILED,
//     });
//     VisitorAuthDispatch?.({
//       type: AUTH_VISITOR_USER_FAILED,
//     });
//     B2BAuthDispatch?.({
//       type: B2B_USER_FAILED,
//     });
//   };
//   const handleLogoutB2B = () => {
//     destroyCookie(null, 'toab_fair');
//     authDispatch?.({
//       type: AUTH_USER_FAILED,
//     });
//     B2BAuthDispatch?.({
//       type: B2B_USER_FAILED,
//     });
//   };

//   return (
//     <>
//       <Navbar
//         collapseOnSelect
//         expand='lg'
//         variant='dark'
//         style={{ backgroundColor: '#fff' }}
//       >
//         <Container fluid className='custom-container'>
//           <a href='https://bttf.net.bd/'>
//             <img
//               src='/assets/bttf-logo.png'
//               alt=''
//               width={70}
//               height={70}
//               style={{ objectFit: 'contain' }}
//             />
//           </a>

//           <Navbar.Toggle aria-controls='responsive-navbar-nav' />
//           <Navbar.Collapse id='responsive-navbar-nav '>
//             <Nav className='ms-auto'>
//               <div className='header-navigation mt-4'>
//                 <ul className='main-menu'>
//                   <li className='active-menu'>
//                     <a href='https://bttf.net.bd/'>Home</a>
//                   </li>
//                   <li>
//                     <Link to='#'>
//                       About
//                       <MdKeyboardArrowDown size={20} />
//                     </Link>
//                     <ul className='sub-menu'>
//                       <li>
//                         <Link to='#'>About BITTE</Link>
//                       </li>
//                       <li>
//                         <Link to='#'>About TOAB</Link>
//                       </li>
//                       <li>
//                         <Link to='#'>Exhibition</Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link to='#'>
//                       Event
//                       <MdKeyboardArrowDown size={20} />
//                     </Link>
//                     <ul className='sub-menu'>
//                       <li>
//                         <Link to='/event-list'>Event List</Link>
//                       </li>
//                       <li>
//                         <Link to='#'>Event Matrix</Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link to='#'>
//                       Galleries
//                       <MdKeyboardArrowDown size={20} />
//                     </Link>
//                     <ul className='sub-menu'>
//                       <li>
//                         <Link to='#'>Photo Gallery</Link>
//                       </li>
//                       <li>
//                         <Link to='#'>Video Gallery</Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link to='#'>
//                       Media Room
//                       <MdKeyboardArrowDown size={20} />
//                     </Link>
//                     <ul className='sub-menu'>
//                       <li>
//                         <Link to='#'>Print Media News</Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <a
//                       href='https://bttf.net.bd/exhibitor.php'
//                       target='_blank'
//                       rel='noopener noreferrer'
//                     >
//                       Exhibitors
//                     </a>
//                   </li>
//                   <li className='change-color'>
//                     <Link to='#'>BTTF 2024</Link>
//                   </li>

//                   {user?.user_fair_member_id || visitorUser?.visitor_id ? (
//                     ''
//                   ) : (
//                     <li className='change-color'>
//                       <Link to='/book-your-space'>Book Your Space</Link>
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             </Nav>

//             <Nav className='ms-auto'>
//               {b2bUser?.b2b_id ||
//               b2bUser?.b2b_id ||
//               user?.user_fair_member_id ? (
//                 <>
//                   <Link
//                     to={b2bUser?.b2b_id ? '/b2b/profile' : '/profile'}
//                     className='text-white text-decoration-none'
//                   >
//                     <Button className='btn btn-3 btn-info me-2'>Profile</Button>
//                   </Link>

//                   <Button
//                     onClick={handleLogoutB2B}
//                     className='btn btn-3 btn-primary'
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <div className='header-btn  pe-3'>
//                     <Dropdown className='pe-3'>
//                       <Dropdown.Toggle
//                         className='btn btn-3 btn-primary'
//                         id='dropdown-basic'
//                       >
//                         Registration
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu align='start' className='ps-3'>
//                         <div className='pb-2'>
//                           <Link
//                             to='/visitor-registration'
//                             className='text-decoration-none text-black '
//                           >
//                             Visitor Registration
//                           </Link>
//                         </div>

//                         <div>
//                           <Link
//                             to='/b2b-registration'
//                             className='text-decoration-none text-black'
//                           >
//                             B2B Registration
//                           </Link>
//                         </div>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                   <div className='header-btn st-2 mt-2 mt-md-0 '>
//                     <Dropdown className='pe-3'>
//                       <Dropdown.Toggle
//                         className='btn-info '
//                         id='dropdown-basic'
//                       >
//                         Login
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu align='start' className='ps-3'>
//                         <div className='pb-2'>
//                           <Link
//                             to='/login'
//                             className='text-decoration-none text-black '
//                           >
//                             Exhibitor login
//                           </Link>
//                         </div>

//                         <div className='pb-2'>
//                           <Link
//                             to='/visitor-login'
//                             className='text-decoration-none text-black'
//                           >
//                             Visitor login
//                           </Link>
//                         </div>
//                         <div className='pb-2'>
//                           <Link
//                             to='/b2b-login'
//                             className='text-decoration-none text-black'
//                           >
//                             B2B login
//                           </Link>
//                         </div>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                 </>
//               )}
//             </Nav>

//             <Nav className='ms-auto'>
//               {visitorUser?.visitor_id ||
//               visitorUser?.visitor_id ||
//               user?.user_fair_member_id ? (
//                 <>
//                   <Link
//                     to={
//                       visitorUser?.visitor_id ? '/visitor/profile' : '/profile'
//                     }
//                     className='text-white text-decoration-none'
//                   >
//                     <Button className='btn btn-3 btn-info me-2'>Profile</Button>
//                   </Link>

//                   <Button
//                     onClick={handleLogout}
//                     className='btn btn-3 btn-primary'
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <div className='header-btn  pe-3'>
//                     <Dropdown className='pe-3'>
//                       <Dropdown.Toggle
//                         className='btn btn-3 btn-primary'
//                         id='dropdown-basic'
//                       >
//                         Registration
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu align='start' className='ps-3'>
//                         <div className='pb-2'>
//                           <Link
//                             to='/visitor-registration'
//                             className='text-decoration-none text-black '
//                           >
//                             Visitor Registration
//                           </Link>
//                         </div>

//                         <div>
//                           <Link
//                             to='/b2b-registration'
//                             className='text-decoration-none text-black'
//                           >
//                             B2B Registration
//                           </Link>
//                         </div>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                   <div className='header-btn st-2 mt-2 mt-md-0 '>
//                     <Dropdown className='pe-3'>
//                       <Dropdown.Toggle
//                         className='btn-info '
//                         id='dropdown-basic'
//                       >
//                         Login
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu align='start' className='ps-3'>
//                         <div className='pb-2'>
//                           <Link
//                             to='/login'
//                             className='text-decoration-none text-black '
//                           >
//                             Exhibitor login
//                           </Link>
//                         </div>

//                         <div className='pb-2'>
//                           <Link
//                             to='/visitor-login'
//                             className='text-decoration-none text-black'
//                           >
//                             Visitor login
//                           </Link>
//                         </div>
//                         <div className='pb-2'>
//                           <Link
//                             to='/b2b-login'
//                             className='text-decoration-none text-black'
//                           >
//                             B2B login
//                           </Link>
//                         </div>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { Button, Dropdown } from 'react-bootstrap';
import { destroyCookie } from 'nookies';
import {
  AUTH_USER_FAILED,
  AUTH_VISITOR_USER_FAILED,
  B2B_USER_FAILED,
} from '../../Helpers/Constant';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';

const Header = () => {
  const { user, dispatch: authDispatch } = useAuthContext();
  const { visitorUser, dispatch: VisitorAuthDispatch } = VisitorAuthContext();
  const { b2bUser, dispatch: B2BAuthDispatch } = B2BAuthContext();

  const handleLogout = () => {
    destroyCookie(null, 'toab_fair');
    authDispatch?.({
      type: AUTH_USER_FAILED,
    });
    VisitorAuthDispatch?.({
      type: AUTH_VISITOR_USER_FAILED,
    });
    B2BAuthDispatch?.({
      type: B2B_USER_FAILED,
    });
  };

  const handleLogoutB2B = () => {
    destroyCookie(null, 'toab_fair');
    authDispatch?.({
      type: AUTH_USER_FAILED,
    });
    B2BAuthDispatch?.({
      type: B2B_USER_FAILED,
    });
  };

  const renderLoginButtons = () => {
    if (b2bUser?.b2b_id || user?.user_fair_member_id) {
      return (
        <>
          <Link
            to={b2bUser?.b2b_id ? '/b2b/profile' : '/profile'}
            className='text-white text-decoration-none'
          >
            <Button className='btn btn-3 btn-info me-2'>Profile</Button>
          </Link>
          <Button onClick={handleLogoutB2B} className='btn btn-3 btn-primary'>
            Logout
          </Button>
        </>
      );
    } else if (visitorUser?.visitor_id) {
      return (
        <>
          <Link
            to='/visitor/profile'
            className='text-white text-decoration-none'
          >
            <Button className='btn btn-3 btn-info me-2'>Profile</Button>
          </Link>
          <Button onClick={handleLogout} className='btn btn-3 btn-primary'>
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <div className='header-btn pe-3'>
            <Dropdown className='pe-3'>
              <Dropdown.Toggle
                className='btn btn-3 btn-primary'
                id='dropdown-basic'
              >
                Registration
              </Dropdown.Toggle>
              <Dropdown.Menu align='start' className='ps-3'>
                <div className='pb-2'>
                  <Link
                    to='/visitor-registration'
                    className='text-decoration-none text-black '
                  >
                    Visitor Registration
                  </Link>
                </div>
                <div style={{ marginRight: '5px' }} className='pb-2'>
                  <Link
                    to='/book-your-space'
                    className='text-decoration-none text-black '
                  >
                    Exhibitor Registration
                  </Link>
                </div>
                <div>
                  <Link
                    to='/b2b-registration'
                    className='text-decoration-none text-black'
                  >
                    Buyer/Seller B2B Meeting Registration{' '}
                  </Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className='header-btn st-2 mt-2 mt-md-0'>
            <Dropdown className='pe-3'>
              <Dropdown.Toggle className='btn-info' id='dropdown-basic'>
                Login
              </Dropdown.Toggle>
              <Dropdown.Menu align='start' className='ps-3'>
                <div className='pb-2'>
                  <Link
                    to='/login'
                    className='text-decoration-none text-black '
                  >
                    Exhibitor login
                  </Link>
                </div>
                <div className='pb-2'>
                  <Link
                    to='/visitor-login'
                    className='text-decoration-none text-black'
                  >
                    Visitor login
                  </Link>
                </div>
                <div style={{ marginRight: '15px' }} className='pb-2'>
                  <Link
                    to='/b2b-login'
                    className='text-decoration-none text-black'
                  >
                    Buyer/Seller B2B Meeting login
                  </Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='dark'
        style={{ backgroundColor: '#fff' }}
      >
        <Container fluid className='custom-container'>
          <a href='/'>
            <img
              src='/assets/we.png'
              alt=''
              width={80}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </a>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav '>
            <Nav className='ms-auto'>
              <div className='header-navigation mt-4'>
                <ul className='main-menu'>
                  <li className='active-menu'>
                    <a href='/'>Home</a>
                  </li>
                  <li>
                    <Link to='#'>
                      About
                      {/* <MdKeyboardArrowDown size={20} /> */}
                    </Link>
                    {/* <ul className='sub-menu'>
                      <li>
                        <Link to='#'>About WE</Link>
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <Link to='#'>
                      Event
                      {/* <MdKeyboardArrowDown size={20} /> */}
                    </Link>
                    {/* <ul className='sub-menu'>
                      <li>
                        <Link to='#'>Event List</Link>
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <Link to='#'>
                      Galleries
                      {/* <MdKeyboardArrowDown size={20} /> */}
                    </Link>
                    {/* <ul className='sub-menu'>
                      <li>
                        <Link to='#'>Photo Gallery</Link>
                      </li>
                      <li>
                        <Link to='#'>Video Gallery</Link>
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <Link to='#'>
                      Media Room
                      {/* <MdKeyboardArrowDown size={20} /> */}
                    </Link>
                    {/* <ul className='sub-menu'>
                      <li>
                        <Link to='#'>Print Media News</Link>
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <Link to='/book-your-space'>Book Your Space</Link>
                  </li>
                </ul>
              </div>
            </Nav>

            <Nav className='ms-auto'>{renderLoginButtons()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
