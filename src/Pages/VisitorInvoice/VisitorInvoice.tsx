import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { IVisitorInvoice } from '../../Types/VisitorAllTypes';
import { VisitorAuthContext } from '../../Context/AuthContex/VisitorAuthContext';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';

const VisitorInvoice = () => {
  const { visitorUser } = VisitorAuthContext();
  const [VisitorInvoice, setVisitorInvoice] = useState<IVisitorInvoice>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(
          '/api/fair/visitor/get/single/visitor-invoice/by/11'
        );

        if (res.success) {
          setVisitorInvoice(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [visitorUser.visitor_id]);

  return (
    <>
      <div className='profile-right-side px-3 py-3'>
        <h4 className='component-tittle'>Invoice Information</h4>
        <div className='profile-right-info pt-3 ps-2'>
          {loading ? (
            <div className='text-center mt-3'>
              <Spinner animation='border' variant='primary' />
            </div>
          ) : (
            <Table striped bordered hover size='sm'>
              <thead>
                <tr className='text-center'>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center'>
                  <td>{VisitorInvoice?.visitor_payment_invoice_id}</td>
                  <td>
                    {moment(
                      VisitorInvoice?.visitor_payment_invoice_issue_date
                    ).format('MMM Do YY')}
                  </td>
                  <td>{VisitorInvoice?.visitor_payment_invoice_item_amount}</td>
                  <td>
                    {' '}
                    <p
                      className={
                        VisitorInvoice?.visitor_payment_invoice_status ===
                        'paid'
                          ? 'approved'
                          : 'pending'
                      }
                    >
                      {VisitorInvoice?.visitor_payment_invoice_status}
                    </p>
                  </td>
                  {VisitorInvoice?.visitor_payment_invoice_status ===
                  'pending' ? (
                    <td>Pay</td>
                  ) : (
                    <td>Paid</td>
                  )}
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default VisitorInvoice;
