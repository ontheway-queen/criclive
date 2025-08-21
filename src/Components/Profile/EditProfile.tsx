import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../Context/AuthContex/AuthContex';
import { Button } from 'react-bootstrap';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { USER_PROFILE_UPDATE, imgUrl } from '../../Helpers/Constant';
import Toaster from '../Toaster/Toaster';
import Loader from '../Spinner/Loader';

const EditProfile = () => {
  const { user, dispatch } = useAuthContext();
  const Toast = Toaster();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<any>('');

  const onSubmit = async (data: any) => {
    // setLoading(true);
    data.user_fair_member_company_id = user.user_fair_member_company_id;
    data.user_fair_member_company_name = user.user_fair_member_company_name;

    data.user_fair_member_company_website =
      data.user_fair_member_company_website ||
      user.user_fair_member_company_website;

    data.user_fair_member_company_telephone =
      data.user_fair_member_company_telephone ||
      user.user_fair_member_company_telephone;

    data.user_fair_member_company_address =
      data.user_fair_member_company_address ||
      user.user_fair_member_company_address;

    data.user_fair_member_company_city =
      data.user_fair_member_company_city || user.user_fair_member_company_city;

    data.user_fair_member_company_email =
      data.user_fair_member_company_email || user.user_fair_member_email;

    data.user_fair_member_company_zip =
      data.user_fair_member_company_zip || user.user_fair_member_company_zip;

    data.user_fair_member_company_logo =
      companyLogo || user.user_fair_member_company_logo;
    const formData = new FormData();

    if (companyLogo) {
      formData.append('user_fair_member_company_logo', companyLogo);
    }
    Object.keys(data).forEach((key) => {
      if (data[key] === 'object') {
        formData.append(key, data[key][0]);
      }
      formData.append(key, data[key]);
    });

    try {
      const res = await fetcher.put({
        url: '/api/fair/member/update/fair-member-company-information',
        body: formData,
      });
      console.log(res);

      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: `${res.message}`,
        });
        dispatch?.({
          type: USER_PROFILE_UPDATE,
          payload: {
            user_fair_member_company_logo: res.user_fair_member_company_logo
              ? res.user_fair_member_company_logo
              : user.user_fair_member_company_logo,
          },
        });
        setLoading(false);
      } else {
        Toast.fire({
          icon: 'error',
          title: `${res.message}`,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className='panel'>
      <div className='panel-body bio-graph-info'>
        <form
          className='form-horizontal'
          method='post'
          id='editProfile'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='profile-right-side px-3 py-3 mb-2'>
            <h4 className='profile-title'>Basic Information</h4>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  Company Name<span className='require'>*</span>
                </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='text'
                    placeholder='Company Name'
                    id='company_name'
                    className='form-control  '
                    disabled
                    value={user.user_fair_member_company_name}
                  />
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  Web Address<span className='require'>*</span>
                </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='text'
                    placeholder='Web Address'
                    {...register('user_fair_member_company_website')}
                    defaultValue={user.user_fair_member_company_website}
                    className='form-control'
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  Company Email<span className='require'>*</span>
                </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='text'
                    placeholder='Company Email '
                    id='company_email'
                    {...register('user_fair_member_company_email')}
                    className='form-control '
                    defaultValue={user.user_fair_member_email}
                  />
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
                <label className='control-label'>
                  Telephone<span className='require'>*</span>
                </label>
                <div className='col-lg-12 padding_right_0'>
                  <input
                    type='text'
                    placeholder='Company Telephone '
                    id='telephone'
                    {...register('user_fair_member_company_telephone')}
                    className='form-control '
                    defaultValue={user.user_fair_member_company_telephone}
                  />
                </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
                <div className='row'>
                  <label>
                    Company Logo <span className='require'>*</span>
                  </label>
                  <div className='w-100'>
                    <div>
                      <div className='img-thumbnail '>
                        {companyLogo ? (
                          <>
                            {companyLogo ? (
                              <img
                                style={{
                                  width: '100%',
                                  height: '150px',
                                }}
                                className=' ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src={URL.createObjectURL(companyLogo)}
                                alt=''
                              />
                            ) : (
                              <img
                                style={{
                                  width: '270px',
                                  height: '135px',
                                  objectFit: 'contain',
                                }}
                                className=' ls-is-cached lazyloaded'
                                id='uploadedImage'
                                src='/assets/image.png'
                                alt=''
                              />
                            )}
                          </>
                        ) : (
                          <img
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'contain',
                            }}
                            className=' ls-is-cached lazyloaded'
                            id='uploadedImage'
                            src={`${imgUrl}/fair_member_files/${user.user_fair_member_company_logo}`}
                            alt=''
                          />
                        )}
                      </div>
                      <div className='pt-2'>
                        <input
                          type='file'
                          id='actual-btn1'
                          accept='image/jpg, image/png, image/jpeg'
                          hidden
                          onChange={(e: any) =>
                            setCompanyLogo(e.target.files[0])
                          }
                        />

                        <label
                          htmlFor='actual-btn1'
                          className='upload-btn btn-images-upload w-100'
                        >
                          Upload logo
                        </label>
                      </div>
                    </div>
                    <div className='form-text'>
                      For Best View Upload Image size 600 X 600px
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='profile-right-side px-3 py-3 mb-2'>
            <h4 className='profile-title'>Address &amp; Location</h4>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-3'>
                <label className='control-label'>
                  Address<span className='require'>*</span>{' '}
                </label>
                <div className='col-sm-12'>
                  <textarea
                    className='form-control'
                    {...register('user_fair_member_company_address')}
                    defaultValue={user.user_fair_member_company_address}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-4 mb-3'>
                <label className='control-label'>
                  City<span className='require'>*</span>
                </label>
                <div className=''>
                  <input
                    type='text'
                    className='form-control'
                    {...register('user_fair_member_company_city')}
                    defaultValue={user.user_fair_member_company_city}
                    placeholder='Enter City name'
                  />
                </div>
              </div>
              <div className='col-sm-4 mb-3'>
                <label className='control-label'>Zip</label>
                <div className=''>
                  <input
                    type='number'
                    className='form-control'
                    {...register('user_fair_member_company_zip')}
                    placeholder='Zip'
                    defaultValue={user.user_fair_member_company_zip}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <Loader css={'w-100 mt-2 submit-button'} />
            ) : (
              <Button className='w-100 mt-2 submit-button' type='submit'>
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
