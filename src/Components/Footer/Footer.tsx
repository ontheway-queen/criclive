import React from 'react';
import { RiFacebookFill } from 'react-icons/ri';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import WE from '../../images/we.png';
const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <>
      <div className='meeta-footer-section meeta-footer-3 '>
        <div className='footer-wrap'>
          <div className='container'>
            <div className='footer-widget-wrap'>
              <Row>
                <Col xs={12} md={4}>
                  <div className='footer-widget'>
                    <a className='footer-logo' href='/'>
                      <img className='img-fluid' src={WE} alt='' />
                    </a>
                  </div>
                </Col>

                <Col xs={12} md={8}>
                  <Row>
                    <Col xs={12} md={4} className='pt-5 pt-md-0'>
                      <div className='footer-widget'>
                        <h4 className='widget-title '>Contact Us</h4>
                        <div className='footer-menu'>
                          <ul>
                            <li>
                              <Link to='/'>About Us</Link>
                            </li>
                            <li>
                              <Link to='/'>Contact</Link>
                            </li>
                            <li>
                              <Link to='/'>Terms and Condition</Link>
                            </li>
                            <li>
                              <Link to='/'>Privacy Policy</Link>
                            </li>
                            <li>
                              <Link to='/'>Refund Policy</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={4}>
                      <div className='footer-widget'>
                        <h4 className='widget-title'>Contact Us</h4>
                        <div className='widget-info'>
                          <ul>
                            <li>
                              <div>
                                <FiPhoneCall className='i' />
                              </div>
                              <div className='info-text'>
                                <span>
                                  <Link to='/'>+8801622-236630</Link>
                                </span>
                              </div>
                            </li>
                            {/* <li>
                              <div className='info-icon'>
                                <HiOutlineMail className='i' />
                              </div>
                              <div className='info-text'>
                                <span>
                                  <Link to='https://weforumbd.org/'>
                                    weforumbd
                                  </Link>
                                </span>
                              </div>
                            </li> */}
                            <li>
                              <div className='info-icon'>
                                <MdLocationOn className='i' />
                              </div>
                              <div className='info-text'>
                                <span>
                                  53 Shaheed Tajuddin Ahmed Ave, Dhaka 1208
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col className='md-ps-5' xs={12} md={4}>
                      <div className='footer-widget'>
                        <h4 className='widget-title'>Social Media</h4>
                        <div className='widget-info'>
                          <div className='footer-widget-social'>
                            <Link to='/'>
                              <RiFacebookFill />
                            </Link>
                            <Link to='/'>
                              <AiOutlineTwitter />
                            </Link>
                            <Link to='/'>
                              <BsInstagram />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>

          <div className='footer-copyright'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-lg-4 col-md-4  align-self-center'>
                  <div className='copyright-text'>
                    <div className='copyright-text'>
                      <p>{year} Copyright by WE. All Rights Reserved</p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 '>
                  <img
                    className='img-fluid'
                    src='assets/images/bitte/sslcommerz-banner.png'
                    alt=''
                  />
                </div>
                <div className='col-lg-4 col-md-4'>
                  <div className='copyright-text'>
                    <p>Technology Partner M360 ICT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
