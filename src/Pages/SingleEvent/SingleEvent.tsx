import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { ISingleEvent } from '../../Types/EventsType';
import { Container, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsCalendarCheckFill } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import moment from 'moment';
import { imgUrl } from '../../Helpers/Constant';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import Toaster from '../../Components/Toaster/Toaster';
import SingleEventSpeaker from './SingleEventSpeaker';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';

const SingleEvent = () => {
  const Toast = Toaster();
  const { visitorUser } = VisitorAuthContext();
  const { b2bUser } = B2BAuthContext();
  const { id } = useParams();
  const [singleEvent, setSingleEvent] = useState<ISingleEvent>();
  const [loading, setLoading] = useState(false);
  const [registerLoader, setRegisterLoader] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(`/api/cric/event/get/single/${id}`);
        console.log(res);
        if (res.success) {
          setSingleEvent(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [id]);
  console.log('Event id', id);
  const handelEventRegister = async (id?: number) => {
    setRegisterLoader(true);
    try {
      if (b2bUser?.b2b_id) {
        try {
          const res = await fetcher.post({
            url: `/api/cric/event/join/b2b`,
            contentType: 'application/json',
            body: {
              cric_event_joined_b2b_id: b2bUser.b2b_id,
              cric_event_id: id,
            },
          });

          if (res.success) {
            Toast.fire({
              icon: 'success',
              title: res.message,
            });
            setRegisterLoader(false);
          } else {
            Toast.fire({
              icon: 'error',
              title: res.message,
            });
            setRegisterLoader(false);
          }
        } catch (error) {}
      } else if (visitorUser?.visitor_id) {
        try {
          const res = await fetcher.post({
            url: `/api/cric/event/join/visitor`,
            contentType: 'application/json',
            body: {
              cric_event_joined_visitor_id: visitorUser?.visitor_id,
              cric_event_id: id,
            },
          });

          if (res.success) {
            Toast.fire({
              icon: 'success',
              title: res.message,
            });
            setRegisterLoader(false);
          } else {
            Toast.fire({
              icon: 'error',
              title: res.message,
            });
            setRegisterLoader(false);
          }
        } catch (error) {}
      } else {
        alert('Please join with account');
        setRegisterLoader(false);
      }
    } catch (error) {
      setRegisterLoader(false);
    }
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
            {loading ? (
              <div className='text-center'>
                <Spinner
                  variant='primary'
                  style={{ height: '50px', width: '50px' }}
                />
              </div>
            ) : (
              <div>
                <div className='events-matrix-content event-details-main-cs'>
                  <div className='events-title '>
                    <h1>{singleEvent?.event_title}</h1>
                  </div>

                  <Row>
                    <Col xs={12} md={{ span: 7, order: 'first' }}>
                      <div className='divider d-none d-md-block'></div>
                      <div className='events-matrix-info mt-3 '>
                        <div className='w-50 w-sm-100'>
                          <ul>
                            <li>
                              <div className='info-icon'>
                                <BsCalendarCheckFill />
                              </div>
                              <div className='info-content'>
                                <span>Date </span>
                                <p>
                                  {moment(singleEvent?.event_date).format(
                                    'MMM Do YY'
                                  )}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className='info-icon'>
                                <FaUserTie />
                              </div>
                              <div className='info-content'>
                                <span>Speakers </span>
                                <p>
                                  {singleEvent?.event_total_speaker} Speaker(s)
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className='w-50 w-sm-100'>
                          <ul>
                            <li>
                              <div className='info-icon'>
                                <BiTimeFive />
                              </div>
                              <div className='info-content'>
                                <span>Time </span>
                                <p>
                                  {' '}
                                  {moment(
                                    singleEvent?.event_start_time,
                                    'HH:mm:ss'
                                  ).format('hh:mm A')}{' '}
                                  {singleEvent?.event_end_time && (
                                    <>
                                      - {''}
                                      {moment(
                                        singleEvent?.event_end_time,
                                        'HH:mm:ss'
                                      ).format('hh:mm A')}
                                    </>
                                  )}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className='info-icon'>
                                <MdLocationPin />
                              </div>
                              <div className='info-content'>
                                <span>Venue </span>
                                <p>{singleEvent?.event_venu}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className='ceremony-footer'>
                        {registerLoader ? (
                          <button className='default-btn' disabled>
                            Loading
                            <Spinner
                              as='span'
                              animation='border'
                              size='sm'
                              role='status'
                              aria-hidden='true'
                            />
                          </button>
                        ) : (
                          <button
                            className='default-btn'
                            onClick={() =>
                              handelEventRegister(singleEvent?.event_id)
                            }
                          >
                            Register Now
                          </button>
                        )}
                      </div>
                    </Col>
                    <Col
                      md={5}
                      xs={{ span: 12, order: 'first' }}
                      className='mt-3 mt-md-0'
                    >
                      <div>
                        <img
                          className='w-100'
                          src={`${imgUrl}/event_files/${singleEvent?.event_photo}`}
                          alt=''
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='events-matrix-content mt-1'>
                  <div className='events-title events-title-style-2 text-left'>
                    <h1>Details</h1>
                  </div>
                  <div className='events-title event-details-text text-align-justify'>
                    <p>{singleEvent?.event_description}</p>
                  </div>
                </div>

                <div className='text-center'>
                  <h3>Speakers</h3>
                </div>

                <SingleEventSpeaker id={id} />
              </div>
            )}
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default SingleEvent;
