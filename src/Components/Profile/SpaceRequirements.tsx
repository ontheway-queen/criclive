import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BsCheckCircleFill } from 'react-icons/bs';
const SpaceRequirements = () => {
  return (
    <div>
      <div className='profile-right-side px-3 py-3'>
        <div>
          <h5>Space Requirements</h5>
        </div>
        <div className='profile-right-info pt-3 ps-2'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SL#</th>
                <th>Pavilion Name</th>
                <th>Zone</th>
                <th>Stall#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Startups zone</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <div className='profile-right-side px-3 py-3 mt-4 '>
        <h5>Billing information</h5>

        <div className='d-block d-md-flex align-items-center justify-content-betcricen'>
          <div className='d-flex align-items-center gap-3'>
            <p>payment</p>
            <div className='d-flex align-items-center gap-2'>
              <p className='online'>online</p>
              <p className='paid'>
                <BsCheckCircleFill className='me-1 mb-1' />
                <span>Paid</span>
              </p>
            </div>
          </div>
          <div className='d-flex d-md-block mt-3 mt-md-0'>
            <Button variant='primary' style={{ backgroundColor: '  #6c757d' }}>
              invoice
            </Button>
            <Button
              variant='primary'
              className='mx-2'
              style={{ backgroundColor: '#6c757d' }}
            >
              Money receipt
            </Button>

            <Button variant='primary' style={{ backgroundColor: '  #1982c3' }}>
              Registration form
            </Button>
          </div>
        </div>
        <div className='profile-right-info pt-3 ps-2'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SL#</th>
                <th>Pavilion Name</th>
                <th>Zone</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Startups zone</td>
                <td></td>
                <td>15,000 BDT</td>
                <td>1</td>
                <td>15,000 BDT</td>
              </tr>
              <tr>
                <td colSpan={5} className='text-end'>
                  Total Bill
                </td>
                <td>15,000 BDT</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SpaceRequirements;
