import React from 'react';
import { Container } from 'react-bootstrap';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
const HeaderBottom = ({ pathName }: any) => {
  return (
    <div className='page-banner-area'>
      <div className='page-banner-area-extra'>
        <Container>
          <div style={{ color: '#FFFFFF' }} className='text-center '>
            <h1>{pathName}</h1>
            <p className='fw-bold'>
              Home <MdOutlineKeyboardArrowRight /> {pathName}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeaderBottom;
