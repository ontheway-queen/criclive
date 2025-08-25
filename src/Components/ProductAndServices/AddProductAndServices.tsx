import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import DragAndDrop from './DragAndDrop';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import Toaster from '../Toaster/Toaster';
import Loader from '../Spinner/Loader';

const AddProductAndServices = () => {
  const Toast = Toaster();
  const [files, setFiles] = useState<any>([]);
  const { user } = useAuthContext();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.user_cric_member_id = user.user_cric_member_id;
    data.user_cric_member_company_id = user.user_cric_member_company_id;

    if (!files.length) {
      Toast.fire({
        icon: 'error',
        title: `please add at least one image`,
      });
      setLoading(false);
      return;
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    files.forEach((img: any, index: number) => {
      const name = 'img_' + (index + 1);
      formData.append(name, img);
    });

    const res = await fetcher.post({
      url: `/api/cric/add-product/into-cric-member`,
      body: formData,
    });

    if (res.success) {
      Toast.fire({
        icon: 'success',
        title: `${res.message}`,
      });
      reset();
      setFiles([]);
      setLoading(false);
    } else {
      Toast.fire({
        icon: 'error',
        title: `${res.message}`,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <div className='col-md-12 mb-4 mt-3'>
        <div className='front-card '>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
              <div className='form-group col-md-12 mb-3'>
                <label>Product Name </label>
                <input
                  type='text'
                  className='form-control '
                  {...register('cric_member_product_name')}
                  placeholder='Enter Product Name'
                  id='productName'
                  required
                />
              </div>
              <div className='form-group col-md-6 mb-3'>
                <label className='d-flex justify-content-betcricen'>
                  <div className='w-50'>
                    <span className='special_price'></span>Product{' '}
                    <span className='price_range d-none'>Start</span> Price{' '}
                    <span className='require'>*</span>
                  </div>
                </label>
                <input
                  type='number'
                  className='form-control '
                  {...register('cric_member_product_price')}
                  placeholder='1000'
                  id='price_start'
                />
              </div>

              <div className='form-group col-md-6 mb-3'>
                <label className='special_price'>Special Price</label>
                <div className='d-flex justify-content-betcricen align-items-center'>
                  <input
                    type='number'
                    className='form-control special_price'
                    placeholder='500'
                    id='special_price'
                    {...register('cric_member_special_product_price')}
                  />
                </div>
              </div>

              <div className='form-group col-md-6 mb-3'>
                <label>
                  Product Category <span className='require'>*</span>
                </label>
                <select
                  className='form-select'
                  {...register('cric_member_product_category')}
                >
                  <option value='Software Development/Customization'>
                    Software Development/Customization
                  </option>
                  <option value='Consulting'>Consulting</option>
                  <option value='VAR/Software Implementation'>
                    VAR/Software Implementation
                  </option>
                  <option value='IT Enabled Services'>
                    IT Enabled Services
                  </option>
                  <option value='R&amp;D Services'>R&amp;D Services</option>
                  <option value='2D, 3D Animations'>2D, 3D Animations</option>
                  <option value='E-commerce/cricb services'>
                    E-commerce/cricb services
                  </option>
                  <option value='System Integration'>System Integration</option>
                  <option value='Product distributor/Reseller'>
                    Product distributor/Reseller
                  </option>
                  <option value='Mobile Application Development'>
                    Mobile Application Development
                  </option>
                  <option value='Content Management'>Content Management</option>
                  <option value='Graphic design'>Graphic design</option>
                  <option value='Search Engine Optimization - SEO'>
                    Search Engine Optimization - SEO
                  </option>
                  <option value='Cloud Service/Hosting'>
                    Cloud Service/Hosting
                  </option>
                  <option value='Call Center Services'>
                    Call Center Services
                  </option>
                  <option value='Cyber Security Services'>
                    Cyber Security Services
                  </option>
                </select>
              </div>

              <div className='form-group col-md-6 mb-3'>
                <label>Product URL </label>
                <input
                  type='url'
                  className='form-control'
                  placeholder='Enter Product Url'
                  id='product_url'
                  {...register('cric_member_product_url')}
                />
              </div>

              <div className='form-group col-md-12 mb-3'>
                <label>
                  Product Description <span className='require'>*</span>
                </label>
                <textarea
                  className='form-control '
                  placeholder='Enter Product Description'
                  id='description'
                  {...register('cric_member_product_description')}
                ></textarea>
                <div className='text-end'>
                  <small id='description_msg'>
                    Must be 10-500 words in length; written:{' '}
                  </small>
                </div>
              </div>
              <div className='form-group mb-0 dropzone-group light-style mb-3'>
                <div
                  className='alert alert-danger alert-dismissible image_upload_errors d-none'
                  role='alert'
                ></div>

                <label>
                  Product Images (Max 4) <span className='require'>*</span>{' '}
                  <small>
                    <span className='request-time'>
                      Photo Must be JPG, JPEG, GIF or PNG and max file size 2MB.
                      For Best View Photo 500 x 250px
                    </span>
                  </small>
                </label>

                <div>
                  <div className='dz-message needsclick text-center'>
                    <DragAndDrop setFiles={setFiles} files={files} />
                  </div>
                </div>
              </div>

              <div className='form-group col-md-12 mb-3 text-end'>
                {loading ? (
                  <Loader css={'btn'} />
                ) : (
                  <button
                    type='submit'
                    style={{
                      backgroundColor: '#1982c3',
                      color: 'white',
                    }}
                    className='btn'
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductAndServices;
