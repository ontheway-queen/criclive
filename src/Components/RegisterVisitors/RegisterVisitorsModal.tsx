import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RegisterVisitorsModal = ({ show, handleClose }: any) => {
  return (
    <div>
      {' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Visitor - mamun</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className='profile-right-info pt-3 ps-2'>
            <ul>
              <li>
                <span>Id</span> : <p>fhbafa</p>
              </li>
              <li>
                <span>Name</span> : <p>fhajfjha</p>
              </li>
              <li>
                <span>Gender</span> : <p>fabjfhajbfa</p>
              </li>

              <li>
                <span>Email</span> : <p>fabnbfabjfbaj</p>
              </li>
              <li>
                <span>Mobile No</span> : <p>fabnbfabjfbaj</p>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}
            className='w-25 submit-button'
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterVisitorsModal;
