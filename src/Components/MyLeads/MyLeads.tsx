import React from 'react';
import Table from 'react-bootstrap/Table';
const MyLeads = () => {
  return (
    <>
      <div className='profile-right-side px-3 py-3'>
        <div>
          <h5>My Leads (Exhibition)</h5>
          {/* <div className='d-flex align-items-center gap-3'>
            <div>
              <p>Added 0 of 10</p>
            </div>
            <div>
              <p
                style={{
                  backgroundColor: '#1982c3',
                  color: 'white',
                  padding: '5px 7px',
                  borderRadius: '5px',
                }}
              >
                Add product &#38; service{' '}
              </p>
            </div>
          </div> */}
        </div>
        <div className='profile-right-info pt-3 ps-2'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th> Visitor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2/9/2023</td>
                <td>Mark</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default MyLeads;
