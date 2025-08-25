import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { B2BAuthContext } from '../../Context/AuthContex/B2BAuthContext';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { imgUrl } from '../../Helpers/Constant';

const B2BProfileHomePage = () => {
  const { b2bUser } = B2BAuthContext();
  const [user, setUser] = useState<any>();
  // console.log('user', user);
  useEffect(() => {
    (async () => {
      const res = await fetcher.get(`/api/auth/b2b/profile/${b2bUser.b2b_id}`);
      if (res.success) {
        console.log(res.data);
        setUser(res.data);
      }
    })();
  }, [b2bUser.b2b_id]);

  return (
    <div>
      <div className='profile-right-side px-3 py-3'>
        <div className='d-flex  align-items-center justify-content-betcricen'>
          <h4 className='component-tittle'>Profile Information</h4>
        </div>
        <div className='profile-right-info pt-3 ps-2'>
          <ul>
            <li>
              <span>Name</span> :{' '}
              <p>
                {user?.b2b_title + '.'}
                {} {user?.b2b_first_name} {user?.b2b_last_name}
              </p>
            </li>
            <li>
              <span>Email</span> : <p>{b2bUser?.b2b_email}</p>
            </li>
            <li>
              <span>Mobile</span> : <p>{b2bUser?.b2b_phone}</p>
            </li>
            {user?.b2b_address ? (
              <li>
                <span>Address</span> : <p>{user?.b2b_address}</p>
              </li>
            ) : (
              ''
            )}

            {user?.b2b_organization ? (
              <li>
                <span>Organization</span> : <p>{user?.b2b_organization}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_company_position ? (
              <li>
                <span>Position</span> : <p>{user?.b2b_company_position}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_company_established ? (
              <li>
                <span>Company Established</span> :{' '}
                <p>{moment(user?.b2b_company_established).format('LL')}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_designation ? (
              <li>
                <span>Designation</span> : <p>{user?.b2b_designation}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_department ? (
              <li>
                <span>Department</span> : <p>{user?.b2b_department}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_cricbsite ? (
              <li>
                <span>cricbsite</span> : <p>{user?.b2b_cricbsite}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_country ? (
              <li>
                <span>Country</span> : <p>{user?.b2b_country}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_city ? (
              <li>
                <span>City</span> : <p>{user?.b2b_city}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_post_code ? (
              <li>
                <span>Post Code</span> : <p>{user?.b2b_post_code}</p>
              </li>
            ) : (
              ''
            )}
            <li>
              <span>No of Employees</span> :{' '}
              <p>{user?.b2b_company_employees}</p>
            </li>

            {user?.b2b_passport ? (
              <li>
                <span>Passport No</span> : <p>{user?.b2b_passport}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_date_of_issue ? (
              <li>
                <span>Passport Issue Date</span> :{' '}
                <p>{moment(user?.b2b_date_of_issue).format('LL')}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_date_of_expiry ? (
              <li>
                <span>Passport Expiry Date</span> :{' '}
                <p>{moment(user?.b2b_date_of_expiry).format('LL')}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_join_years ? (
              <li>
                <span>Join Last BTTF</span> : <p>{user?.b2b_join_years}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_count_business ? (
              <li>
                <span>Business in Bangladesh ($USD)</span> :{' '}
                <p>{user?.b2b_count_business}</p>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_passport_scan_copy ? (
              <li>
                <span>Passport Copy</span> :{' '}
                <a
                  style={{ paddingLeft: '10px', textDecoration: 'none' }}
                  target='blank'
                  href={imgUrl + '/b2b_files/' + user?.b2b_passport_scan_copy}
                >
                  Download File
                </a>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_scan_copy_visiting_card ? (
              <li>
                <span>Visiting Card</span> :{' '}
                <a
                  style={{ paddingLeft: '10px', textDecoration: 'none' }}
                  target='blank'
                  href={
                    imgUrl + '/b2b_files/' + user?.b2b_scan_copy_visiting_card
                  }
                >
                  Download File
                </a>
              </li>
            ) : (
              ''
            )}
            {user?.b2b_status ? (
              <li>
                <span>Status</span> :
                {user?.b2b_status ? (
                  <p style={{ color: 'green', fontStyle: 'bold' }}>
                    {user?.b2b_status}
                  </p>
                ) : (
                  <p>{user?.b2b_status}</p>
                )}
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default B2BProfileHomePage;
