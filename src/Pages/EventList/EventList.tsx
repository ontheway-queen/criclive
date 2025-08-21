import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import { Container, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { IEvent } from '../../Types/EventsType';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { imgUrl } from '../../Helpers/Constant';

const EventList = () => {
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    try {
      let url = `/api/fair/event/get/all/all`;
      if (searchValue) {
        url = `/api/fair/event/get/${searchValue}/all`;
      }
      (async () => {
        const res = await fetcher.get(url);
        if (res.success) {
          setAllEvents(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [searchValue]);
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
            <div className='section-title breadcrumb-card d-flex flex-mo-column align-items-center  justify-content-between'>
              <div className='text-start w-50'>
                <h2 className='mb-0'>All Events </h2>
              </div>
              <div className='w-50 d-flex flex-mo-column justify-content-end'>
                <div className='filter-parent'>
                  <InputGroup>
                    <InputGroup.Text id='basic-addon1'>
                      <AiOutlineSearch />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder='Search Event'
                      aria-label='Username'
                      onChange={(e) => setSearchValue(e.target.value)}
                      aria-describedby='basic-addon1'
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
            {/* show event */}

            {loading ? (
              <div className='text-center'>
                <Spinner
                  variant='primary'
                  style={{ height: '50px', width: '50px' }}
                />
              </div>
            ) : (
              <>
                {allEvents.length ? (
                  <>
                    <Row sx={12} md={4}>
                      {allEvents.map((sEvent) => {
                        return (
                          <Col key={sEvent.event_id}>
                            <div className='events-card-bg event_container mb-4'>
                              <div className='events-img-sec'>
                                <Link to={`/event-list/${sEvent.event_id}`}>
                                  <div className='event_wrapper'>
                                    <div className='event_venue '>
                                      {/* <div>
                                        <TiLocation color='white' />
                                        <span> {sEvent.event_venu}</span>
                                      </div> */}
                                      <div>
                                        <BiTimeFive color='white' />
                                        <span>
                                          {' '}
                                          {moment(
                                            sEvent.event_start_time,
                                            'HH:mm:ss'
                                          ).format('hh:mm A')}{' '}
                                          {sEvent.event_end_time && (
                                            <>
                                              - {''}
                                              {moment(
                                                sEvent.event_end_time,
                                                'HH:mm:ss'
                                              ).format('hh:mm A')}
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    </div>

                                    <img
                                      className='event-img'
                                      alt=''
                                      src={`${imgUrl}/event_files/${sEvent.event_photo}`}
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className='text-center'>
                                <h3 className='event_title'>
                                  <Link
                                    to={`/event-list/${sEvent.event_id}`}
                                    className='text-decoration-none text-black'
                                  >
                                    {sEvent.event_title}
                                  </Link>
                                </h3>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </>
                ) : (
                  <p className='text-center fs-4 fw-bold'>No event found</p>
                )}
              </>
            )}
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default EventList;
