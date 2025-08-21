import React from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { MdDelete } from 'react-icons/md';
// import { AiFillEye } from 'react-icons/ai';

const PopOver = ({ show, target, handelDelete }: any) => {
  return (
    <Overlay show={show} target={target} placement='bottom'>
      <Popover id='popover-contained'>
        <Popover.Body>
          {/* <div className='d-flex align-items-center gap-1 pointer'>
            <AiFillEye size={20} />
            <p> View</p>
          </div> */}
          <div
            className='d-flex align-items-center gap-1  pointer'
            onClick={handelDelete}
          >
            <MdDelete size={20} />
            <p> Delete</p>
          </div>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
};

export default PopOver;
