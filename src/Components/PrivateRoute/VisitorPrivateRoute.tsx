import React from 'react';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

interface PropType {
  component: JSX.Element;
}
const VisitorPrivateRoute = ({ component }: PropType) => {
  const { visitorUser, isLoading } = VisitorAuthContext();

  if (isLoading) {
    return (
      <div className='text-center' style={{ marginTop: '200px' }}>
        <Spinner
          animation='border'
          variant='primary'
          style={{ height: '60px', width: '60px' }}
        />
      </div>
    );
  }
  if (visitorUser?.visitor_id) {
    return component;
  } else {
    return <Navigate to='/visitor-login' />;
  }
};

export default VisitorPrivateRoute;
