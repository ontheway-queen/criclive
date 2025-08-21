import { ICompanyProfileProps } from '../../Types/RegisterTypes';

const CompanyProfile = ({
  register,
  setCompanyLogo,
  companyLogo,
  companyProfileReg,
}: ICompanyProfileProps) => {
  const { companyName, address, email, mobileNumber } = companyProfileReg || {};
  return (
    <>
      <div className='register-top '>
        <div className='register-top-div'>
          <h3>Company Profile </h3>
        </div>
        <div className='register-top-form-card'>
          <div className='row  mx'>
            <div className='pb-2'>
              <label>
                Company Name<span className='require'>*</span>
              </label>

              <input
                type='text'
                {...register('user_fair_member_company_name')}
                defaultValue={companyName}
                className='form-control'
                required
                placeholder='Enter company name'
              />
            </div>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <div>
                <label>
                  Address<span className='require'>*</span>
                </label>

                <textarea
                  className='form-control '
                  id='address'
                  {...register('user_fair_member_company_address')}
                  defaultValue={address}
                  required
                  placeholder='Enter company address'
                ></textarea>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
              <div className='row'>
                <label>
                  City <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    {...register('user_fair_member_company_city')}
                    type='text'
                    className='form-control '
                    placeholder='Enter city'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-2'>
              <div className='row exhib-reg-zip'>
                <label>
                  Zip <span className='require'></span>
                </label>
                <div className='w-55-100'>
                  <input
                    required
                    type='number'
                    {...register('user_fair_member_company_zip')}
                    className='form-control '
                    placeholder='Enter zip code'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
              <div className='row'>
                <label>
                  Web Address <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type='text'
                    className='form-control '
                    {...register('user_fair_member_company_website')}
                    placeholder='Enter company web address'
                  />
                </div>
              </div>
            </div>

            <input type='hidden' name='country' value='18' />

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
              <div className='row'>
                <label>
                  Telephone <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type='text'
                    className='form-control'
                    {...register('user_fair_member_company_telephone')}
                    defaultValue={mobileNumber}
                    placeholder='Enter company telephone'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
              <div className='row'>
                <label>
                  Company Email <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type='email'
                    defaultValue={email}
                    {...register('user_fair_member_company_email')}
                    className='form-control '
                    placeholder='Comapny email'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
              <div className='row'>
                <label>
                  Company Logo <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <div className='companies-logo-card'>
                    <div className='img-thumbnail ' style={{ width: '280px' }}>
                      {companyLogo.companyLogoPhoto ? (
                        <img
                          style={{
                            width: '270px',
                            height: '135px',
                          }}
                          className=' ls-is-cached lazyloaded'
                          id='uploadedImage'
                          src={URL.createObjectURL(
                            companyLogo.companyLogoPhoto
                          )}
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
                    </div>
                    <div className='pt-2'>
                      <input
                        type='file'
                        id='actual-btn1'
                        accept='image/jpg, image/png, image/jpeg'
                        hidden
                        onChange={(e: any) =>
                          setCompanyLogo({
                            ...companyLogo,
                            companyLogoPhoto: e.target.files[0],
                          })
                        }
                      />

                      <label
                        htmlFor='actual-btn1'
                        className='upload-btn btn-images-upload'
                      >
                        {' '}
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
            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2'>
              <div className='row'>
                <label>Company Logo file(ai)</label>
                <div className='w-150-100'>
                  <div className='companies-ai-card'>
                    <div className='ai-thumbnail w-100 '>
                      <img
                        width={50}
                        id='uploadedImage'
                        src='https://softexpo.com.bd/assets/frontend/images/ai-logo.png'
                        alt='img'
                      />
                      <span className='truncate  ps-2' id='logo_file_name'>
                        {companyLogo.companyLogoAi.name}
                      </span>
                    </div>
                    <div className='mt-2'>
                      <input
                        type='file'
                        id='actual-btn2'
                        accept='image/ai'
                        hidden
                        onChange={(e: any) =>
                          setCompanyLogo({
                            ...companyLogo,
                            companyLogoAi: e.target.files[0],
                          })
                        }
                      />

                      <label
                        htmlFor='actual-btn2'
                        className='upload-btn btn-images-upload'
                      >
                        Upload logo (ai)
                      </label>
                    </div>
                  </div>
                  <div id='emailHelp' className='form-text'>
                    Logo file must be .ai or .eps format
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
