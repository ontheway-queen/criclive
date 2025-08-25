import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { HiPlusCircle } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
// import { HiEye } from 'react-icons/hi';
// import RegisterVisitorsModal from './RegisterVisitorsModal';
import AddNewVisitor from './AddNewVisitor';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { IMemberVisitor } from '../../Types/VisitorAllTypes';
import { Spinner } from 'react-bootstrap';

const RegisterVisitors = () => {
  const { user } = useAuthContext();
  const [toggle, setToggle] = useState(false);
  const [allRegisterVisitor, setAllRegisterVisitor] = useState<
    IMemberVisitor[]
  >([]);
  const [loading, setLoading] = useState(false);

  // modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(
          `/api/cric/member/get/visitor-of-member/by/${user.user_cric_member_id}/all`
        );
        console.log(res.data);
        if (res.success) {
          setAllRegisterVisitor(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [user.user_cric_member_id]);
  const handleAddVisitor = async () => {
    // Function to refetch data after posting new data
    setLoading(true);
    try {
      const res = await fetcher.get(
        `/api/cric/member/get/visitor-of-member/by/${user.user_cric_member_id}/all`
      );
      if (res.success) {
        setAllRegisterVisitor(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      {toggle ? (
        <div className='profile-right-side px-3 py-3 mb-2'>
          <div className='d-flex align-items-center justify-content-betcricen'>
            <h5>Add New Visitor</h5>
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
              <IoIosArrowBack />
              <p>Back</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='profile-right-side px-3 py-3 mb-2'>
          <div className='d-flex align-items-center justify-content-betcricen'>
            <h5>Registered Visitors</h5>
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
              <HiPlusCircle />
              <p>Add Visitor</p>
            </div>
          </div>
        </div>
      )}
      {toggle ? (
        <AddNewVisitor onAddVisitor={handleAddVisitor} />
      ) : (
        <div className='profile-right-side px-3 py-3'>
          <div className='profile-right-info pt-3 ps-2'>
            <Table striped bordered hover>
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>E-mail</th>
                  {/* <th>Mobile</th> */}
                  <th>Gender</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className='text-center'>
                    <td colSpan={5}>
                      <Spinner variant='primary' />
                    </td>
                  </tr>
                ) : (
                  <>
                    {allRegisterVisitor.length ? (
                      <>
                        {allRegisterVisitor.map((sVisitor) => {
                          return (
                            <tr
                              className='text-center'
                              key={sVisitor.visitor_id}
                            >
                              <td>{sVisitor.visitor_id}</td>
                              <td>
                                {sVisitor.visitor_first_name}{' '}
                                {sVisitor.visitor_last_name}
                              </td>

                              <td>{sVisitor.visitor_email}</td>
                              {/* <td>{sVisitor.visitor_phone}</td> */}
                              <td>{sVisitor.visitor_gender}</td>
                              {/* <td>
                                <HiEye
                                  size={21}
                                  onClick={handleShow}
                                  className='pointer'
                                />
                              </td> */}
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <tr className='text-center'>
                        <td colSpan={5} className='fw-bold'>
                          No data found
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {/* <RegisterVisitorsModal show={show} handleClose={handleClose} /> */}
    </>
  );
};

export default RegisterVisitors;
