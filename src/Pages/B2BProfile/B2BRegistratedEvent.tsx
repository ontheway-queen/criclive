import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toaster from '../../Components/Toaster/Toaster';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';
import { TiTick } from 'react-icons/ti';

const B2BRegisteredEvents = () => {
  const { b2bUser } = B2BAuthContext();
  const Toast = Toaster();
  const [allRegisterEvents, setAllRegisterEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState<number>(0);

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(
          `/api/cric/event/join/b2b/${b2bUser?.b2b_id}`
        );

        if (res.success) {
          setAllRegisterEvents(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
        console.log(res.data);
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [b2bUser?.b2b_id]);
  const handelCancelEvent = async () => {
    try {
      const res = await fetcher.delete(
        `/api/cric/event/delete/b2b/${b2bUser?.b2b_id}/${eventId}`
      );
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: res.message,
        });
        const filterData = allRegisterEvents.filter(
          (sEvent: any) => sEvent.cric_event_id !== eventId
        );
        setAllRegisterEvents(filterData);
        setEventId(0);
        handleClose();
      } else {
        Toast.fire({
          icon: 'error',
          title: res.message,
        });
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className='profile-right-side px-3 py-3'>
        <h4 className='component-tittle'>Register Event</h4>

        <div className='profile-right-info pt-3 ps-2'>
          {loading ? (
            <div className='text-center mt-3'>
              <Spinner animation='border' variant='primary' />
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr className='text-center'>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Title</th>
                  <th>Venue</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRegisterEvents.length ? (
                  <>
                    {allRegisterEvents.map((sRegisterEvent: any) => {
                      return (
                        <tr
                          className='text-center'
                          key={sRegisterEvent.cric_event_id}
                        >
                          <td>
                            {moment(sRegisterEvent.event_date).format(
                              'MMM Do YY'
                            )}
                          </td>
                          <td>
                            {moment(
                              sRegisterEvent.event_start_time,
                              'HH:mm:ss'
                            ).format('LT')}{' '}
                            -{' '}
                            {moment(
                              sRegisterEvent.event_end_time,
                              'HH:mm:ss'
                            ).format('LT')}
                          </td>
                          <td>{sRegisterEvent.event_title}</td>
                          <td>{sRegisterEvent.event_venu}</td>
                          <td>{sRegisterEvent.cric_event_joined_b2b_status}</td>
                          <td>
                            {sRegisterEvent.cric_event_joined_b2b_status ===
                            'approved' ? (
                              <>
                                <TiTick
                                  color='green'
                                  size={25}
                                  title='Cancel'
                                />
                              </>
                            ) : (
                              <>
                                <IoIosCloseCircleOutline
                                  onClick={() => {
                                    handleShow();
                                    setEventId(sRegisterEvent.cric_event_id);
                                  }}
                                  color='red'
                                  size={25}
                                  title='Cancel'
                                  className='pointer'
                                />
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr className='text-center'>
                    <td colSpan={5} className='fw-bold'>
                      No register event found!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure cancel from register event ?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>

          {loading ? (
            <Spinner animation='border' variant='primary' />
          ) : (
            <Button variant='primary' onClick={handelCancelEvent}>
              Yes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default B2BRegisteredEvents;
