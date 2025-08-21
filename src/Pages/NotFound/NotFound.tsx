import React from 'react';
import { Link } from 'react-router-dom';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';

const NotFound = () => {
  const { visitorUser } = VisitorAuthContext();
  return (
    <div className='text-center pt-5'>
      <img src='/404.png' alt='' />

      <div>
        <Link
          className='text-decoration-none'
          to={visitorUser?.visitor_id ? '/visitor/profile' : '/profile'}
          style={{
            color: 'blue',
          }}
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
