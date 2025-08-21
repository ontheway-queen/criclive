import React, { useState, useEffect } from 'react';
import { VisitorAuthContext } from '../../../Context/AuthContex/VisitorAuthContext';
import fetcher from '../../../Helpers/Fetcher/fetchApi';
import { IVisitorUser } from '../../../Types/VisitorAllTypes';
import moment from 'moment';

const VisitorProfileHomePage = () => {
  const { visitorUser } = VisitorAuthContext();
  const [user, setUser] = useState<IVisitorUser>();

  useEffect(() => {
    (async () => {
      const res = await fetcher.get(
        `/api/fair/visitor/get/single/visitor/${visitorUser.visitor_id}`
      );
      if (res.success) {
        setUser(res.data);
      }
    })();
  }, [visitorUser.visitor_id]);

  return (
    <div>
      <div className='profile-right-side px-3 py-3'>
        <div className='d-flex  align-items-center justify-content-between'>
          <h4 className='component-tittle'>Profile Information</h4>
          {/* <div className='d-flex  align-items-center gap-1'>
            <p>Edit</p> <FiEdit />
          </div> */}
        </div>
        <div className='profile-right-info pt-3 ps-2'>
          <ul>
            <li>
              <span>Id</span> : <p>{visitorUser?.visitor_id}</p>
            </li>
            <li>
              <span>Name</span> :{' '}
              <p>
                {visitorUser?.visitor_first_name}{' '}
                {visitorUser?.visitor_last_name}
              </p>
            </li>

            {user?.visitor_address && (
              <li>
                <span>Address</span> : <p>{user?.visitor_address}</p>
              </li>
            )}
            {user?.visitor_zip_code && (
              <li>
                <span>ZIP Code</span> : <p>{user?.visitor_zip_code}</p>
              </li>
            )}

            <li>
              <span>Gender</span> : <p>{visitorUser?.visitor_gender}</p>
            </li>

            <li>
              <span>Email</span> : <p>{visitorUser?.visitor_email}</p>
            </li>
            {user?.visitor_education && (
              <li>
                <span>Last Education</span> : <p>{user?.visitor_education}</p>
              </li>
            )}
            {user?.visitor_profession && (
              <li>
                <span>Profession</span> : <p>{user?.visitor_profession}</p>
              </li>
            )}
            {user?.visitor_organization && (
              <li>
                <span>Organization</span> : <p>{user?.visitor_organization}</p>
              </li>
            )}
            {user?.visitor_designation && (
              <li>
                <span>Designation</span> : <p>{user?.visitor_designation}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisitorProfileHomePage;
