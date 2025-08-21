import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';

interface PropType {
  component: JSX.Element;
}
const B2BPrivateRoute = ({ component }: PropType) => {
  const { b2bUser, isLoading } = B2BAuthContext();
  // console.log(b2bUser);

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
  if (b2bUser?.b2b_id) {
    return component;
  } else {
    return <Navigate to='/b2b-login' />;
  }
};

export default B2BPrivateRoute;
