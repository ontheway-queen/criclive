import React, { useState, useEffect } from 'react';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { IStalls } from '../../Types/RegisterTypes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai';

const SpaceRequirements = ({ setStalls, stalls }: any) => {
  const [allStalls, setAllStalls] = useState<IStalls[]>([]);
  const [status, setStatus] = useState('');

  // image modal
  const [showImage, setShowImage] = useState(false);

  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    (async () => {
      const res = await fetcher.get(
        `/api/fair/stall/get/all/status/hall-name/all/all`
      );
      if (res.success) {
        setAllStalls(res.data);
      }
    })();
  }, []);

  return (
    <>
      <div className='register-top'>
        <div className='register-top-div d-flex align-items-center justify-content-between'>
          <h3>Space Requirements </h3>
          {/* <h5 onClick={() => setShowImage(true)} className='pointer'>
            Venue layout
          </h5> */}
        </div>
        <div className='register-top-form-card  space-requirmetn-div '>
          <Row xxl={6} xs={3} md={5}>
            {allStalls.map((stall) => {
              return (
                <Col key={stall.fair_stall_id}>
                  <div
                    onClick={() => {
                      const newStatusStall = allStalls.filter(
                        (s) => s.fair_stall_id === stall.fair_stall_id
                      );

                      if (stall.fair_stall_available_status === 'available') {
                        setStalls([...stalls, stall.fair_stall_id]);
                        newStatusStall[0].fair_stall_available_status =
                          'select';
                      } else if (
                        newStatusStall[0].fair_stall_available_status ===
                        'select'
                      ) {
                        newStatusStall[0].fair_stall_available_status =
                          'available';
                        const newStall = stalls.filter(
                          (st: any) => st !== stall.fair_stall_id
                        );
                        setStalls(newStall);
                      } else {
                        handleShow();
                        setStatus(stall.fair_stall_available_status);
                      }
                    }}
                    className={
                      stall.fair_stall_available_status === 'select'
                        ? 'select-item'
                        : stall.fair_stall_available_status === 'available'
                        ? 'select__item'
                        : 'unavailable-item'
                    }
                  >
                    <p>{stall.fair_stall_name}</p>

                    <span style={{ fontSize: '13px' }}>
                      {stall.fair_stall_hall_name} hall
                    </span>
                    <br />
                    <span style={{ fontSize: '13px' }}>
                      {stall.fair_stall_available_status}
                    </span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <p className='py-5 text-center fs-2'>
          This stall is <span className='text-secondary fw-bold'>{status}</span>{' '}
        </p>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* venu layout modal  */}
      <Modal show={showImage} fullscreen onHide={() => setShowImage(false)}>
        <div className='text-end pe-3 pt-3 pointer'>
          <AiOutlineClose size={30} onClick={() => setShowImage(false)} />
        </div>
        {/* <p className='text-end pe-3'>x</p> */}
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body className='text-center'>
          <img
            src='/assets/venue-layout.jpg'
            alt=''
            width={'100%'}
            height={'100%'}
            style={{ objectFit: 'contain' }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SpaceRequirements;
