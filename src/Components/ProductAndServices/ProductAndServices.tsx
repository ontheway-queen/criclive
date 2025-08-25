import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { IoIosArrowBack } from 'react-icons/io';
import AddProductAndServices from './AddProductAndServices';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { IProduct } from '../../Types/ProductTypes';
import { Spinner } from 'react-bootstrap';
import { HiPlusCircle } from 'react-icons/hi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import PopOver from '../PopOver/PopOver';

import Toaster from '../Toaster/Toaster';

const ProductAndServices = () => {
  const { user } = useAuthContext();
  const Toast = Toaster();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [productId, setProductID] = useState<number>(0);

  // popover
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const data = await fetcher.get(
          `/api/cric/get/all/cric-member-product/by/${user.user_cric_member_id}/all`
        );
        if (data.success) {
          setAllProducts(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch {
      setLoading(false);
    }
  }, [user.user_cric_member_id]);

  const handelDelete = async () => {
    if (productId) {
      const res = await fetcher.delete(
        `/api/cric/delete/cric-member-product/${productId}`
      );
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: `${res.message}`,
        });
        const filterProduct = allProducts.filter(
          (sProduct) => sProduct.cric_member_product_id !== productId
        );
        setAllProducts(filterProduct);
        setShow(!show);
      } else {
        Toast.fire({
          icon: 'success',
          title: `${res.message}`,
        });
      }
    }
  };
  return (
    <>
      <div className='profile-right-side px-3 py-3'>
        {toggle ? (
          <div className='product-header  d-flex align-items-center justify-content-betcricen '>
            <h4>Add new Product &amp; Service</h4>
            <div onClick={() => setToggle(false)} className='pointer'>
              <p
                style={{
                  backgroundColor: '#1982c3',
                  color: 'white',
                  padding: '5px 7px',
                  borderRadius: '5px',
                }}
              >
                <IoIosArrowBack className='mb-1 me-1' />
                Back to list
              </p>
            </div>
          </div>
        ) : (
          <div className='d-flex  align-items-center justify-content-betcricen'>
            <h4>Product and Services </h4>
            <div className='d-flex align-items-center gap-3'>
              <div>
                <p>Added {allProducts.length} of 10</p>
              </div>
              {allProducts.length < 10 && (
                <div onClick={() => setToggle(true)} className='pointer'>
                  <p
                    style={{
                      backgroundColor: '#1982c3',
                      color: 'white',
                      padding: '5px 7px',
                      borderRadius: '5px',
                    }}
                  >
                    {' '}
                    <HiPlusCircle className='mb-1 me-1 ' />
                    Add product &#38; service{' '}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {toggle ? (
          <AddProductAndServices />
        ) : (
          <div className='profile-right-info pt-3 ps-2'>
            {loading ? (
              <div className='text-center mt-3'>
                <Spinner animation='border' variant='primary' />
              </div>
            ) : (
              <>
                {allProducts.length ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Category</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {allProducts.map((sProduct) => {
                          return (
                            <tr key={sProduct.cric_member_product_id}>
                              <td className='text-center'>
                                {sProduct.cric_member_product_name}
                              </td>
                              <td className='text-center'>
                                {sProduct.cric_member_product_category}
                              </td>
                              <td className='text-center'>
                                {sProduct.cric_member_product_price}
                              </td>
                              <td className='text-center'>
                                <p
                                  className={
                                    sProduct.user_cric_member_product_status ===
                                    'approved'
                                      ? 'approved'
                                      : 'pending'
                                  }
                                >
                                  {' '}
                                  {sProduct.user_cric_member_product_status}
                                </p>
                              </td>
                              <td className='text-center'>
                                <HiOutlineDotsVertical
                                  className='pointer'
                                  onClick={(e: any) => {
                                    handleClick(e);
                                    setProductID(
                                      sProduct.cric_member_product_id
                                    );
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    </tbody>
                  </Table>
                ) : (
                  <p className='text-center fw-bold mt-3'>
                    No product available
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <PopOver show={show} target={target} handelDelete={handelDelete} />
    </>
  );
};

export default ProductAndServices;
