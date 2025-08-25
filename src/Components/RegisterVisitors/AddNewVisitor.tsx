import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import Toaster from '../Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import Loader from '../Spinner/Loader';
interface AddNewVisitorProps {
  onAddVisitor: () => void; // Modify the type according to your requirements
}
const AddNewVisitor: React.FC<AddNewVisitorProps> = ({ onAddVisitor }) => {
  const { user } = useAuthContext();
  const Toast = Toaster();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.visitor_type = 'visitor';
    data.visitor_created_by = user.user_cric_member_id;

    try {
      const res = await fetcher.post({
        url: '/api/cric/member/create/visitor',
        contentType: 'application/json',
        body: data,
      });

      if (res.success) {
        onAddVisitor();
        Toast.fire({
          icon: 'success',
          title: res.message,
        });
        setLoading(false);
        navigate('/profile/register-visitors');
        reset();
      } else {
        Toast.fire({
          icon: 'error',
          title: res.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className='profile-right-side px-3 py-3 mb-2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='form-group col-md-6 mb-3'>
            <label>
              First Name <span className='require'>*</span>
            </label>
            <input
              type='text'
              className='form-control '
              placeholder='Enter First Name'
              {...register('visitor_first_name')}
              required
            />
          </div>
          <div className='form-group col-md-6 mb-3'>
            <label>
              Last Name <span className='require'>*</span>
            </label>
            <input
              type='text'
              className='form-control '
              {...register('visitor_last_name')}
              placeholder='Enter Last Name'
              required
            />
          </div>

          <div className='form-group col-md-6 mb-3'>
            <div>
              <label className='col-form-label'>
                Gender <span className='require'>*</span>
              </label>
              <div>
                <select {...register('visitor_gender')} className='form-select'>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-group col-md-6 mb-3'>
            <div>
              <label className='col-form-label'>
                Email <span className='require'>*</span>
              </label>
              <div>
                <input
                  type='email'
                  className='form-control'
                  {...register('visitor_email')}
                  placeholder='Enter Email'
                />
              </div>
            </div>
          </div>

          <div className='form-group col-md-12 mb-3 mt-3 text-end'>
            {loading ? (
              <Loader css={'btn'} />
            ) : (
              <Button
                type='submit'
                style={{
                  backgroundColor: '#1982c3',
                  color: 'white',
                }}
                className='btn'
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewVisitor;
