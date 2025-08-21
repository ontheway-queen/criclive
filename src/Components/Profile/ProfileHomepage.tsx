import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { FiEdit } from 'react-icons/fi';
import EditProfile from './EditProfile';

const ProfileHomepage = () => {
  const { user } = useAuthContext();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle ? (
        <div className='profile-right-side px-3 py-3 mb-2'>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>Edit profile information</h5>
            <div
              onClick={() => setToggle(false)}
              className='d-flex  align-items-center gap-1 pointer'
              style={{
                backgroundColor: '#1982c3',
                color: 'white',
                padding: '5px 7px',
                borderRadius: '5px',
              }}
            >
              <p>Back</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='profile-right-side px-3 py-3 mb-2'>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>Basic Information</h5>
            <div
              onClick={() => setToggle(true)}
              className='d-flex  align-items-center gap-1 pointer'
              style={{
                backgroundColor: '#1982c3',
                color: 'white',
                padding: '5px 7px',
                borderRadius: '5px',
              }}
            >
              <p>Edit</p> <FiEdit />
            </div>
          </div>
        </div>
      )}

      {toggle ? (
        <EditProfile />
      ) : (
        <div>
          <div className='profile-right-side px-3 py-3'>
            <div className='profile-right-info pt-3 ps-2'>
              <ul>
                <li>
                  <span>Company name</span> :{' '}
                  <p>{user.user_fair_member_company_name}</p>
                </li>

                <li>
                  <span>Telephone</span> :{' '}
                  <p>{user.user_fair_member_company_telephone}</p>
                </li>
                <li>
                  <span>Web address</span> :{' '}
                  <p>{user.user_fair_member_company_website}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='profile-right-side px-3 py-3 mt-4 '>
            <h5>Address &#38; Location</h5>
            <div className='profile-right-info pt-3 ps-2'>
              <ul>
                <li>
                  <span>Address</span> :{' '}
                  <p>{user.user_fair_member_company_address} </p>
                </li>
                <li>
                  <span>City</span> :{' '}
                  <p>{user.user_fair_member_company_city}</p>
                </li>
                <li>
                  <span>Zip</span> : <p>{user.user_fair_member_company_zip}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='profile-right-side px-3 py-3 mt-4 '>
            <h5>Contact person</h5>
            <div className='profile-right-info pt-3 ps-2'>
              <ul>
                <li>
                  <span>Contact name</span> :{' '}
                  <p>{user.user_fair_member_contact_name}</p>
                </li>
                <li>
                  <span>Designation</span> :{' '}
                  <p>{user.user_fair_member_contact_designation}</p>
                </li>
                <li>
                  <span>Mobile</span> :{' '}
                  <p>{user.user_fair_member_contact_number}</p>
                </li>
                <li>
                  <span>Email</span> :{' '}
                  <p>{user.user_fair_member_contact_email}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHomepage;
