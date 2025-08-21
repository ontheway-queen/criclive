import React from 'react';

const ContactPerson = ({ companyProfileReg, register }: any) => {
  const { representativeName, representativeDesignation } =
    companyProfileReg || {};

  return (
    <>
      <div className='register-top'>
        <div className='register-top-div'>
          <h3>Contact Person </h3>
        </div>
        <div className='register-top-form-card '>
          <div className='row g-3'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <div>
                <label>
                  Contact Name <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    defaultValue={representativeName}
                    type='text'
                    required
                    className='form-control '
                    {...register('user_fair_member_contact_name')}
                    placeholder='Contact Name'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <div className='row'>
                <label>
                  Designation <span className='require'>*</span>
                </label>
                <div className='w-150-100'>
                  <input
                    defaultValue={representativeDesignation}
                    required
                    type='text'
                    {...register('user_fair_member_contact_designation')}
                    className='form-control '
                    placeholder='Designation'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <div className='row'>
                <label>
                  Contact No<span className='require'>*</span>{' '}
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type='number'
                    {...register('user_fair_member_contact_number')}
                    className='form-control col-sm-2 custom_input_field '
                    placeholder='Contact Number'
                  />
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <div className='row'>
                <label>
                  Email<span className='require'>*</span>{' '}
                </label>
                <div className='w-150-100'>
                  <input
                    required
                    type='email'
                    {...register('user_fair_member_contact_email')}
                    className='form-control '
                    placeholder='Contact Email'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPerson;
