import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

interface PropType {
  component: JSX.Element;
}
const PrivateRoute = ({ component }: PropType) => {
  const { user, isLoading } = useAuthContext();

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
  if (user?.user_cric_member_id) {
    return component;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
