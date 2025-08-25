import React from 'react';
import Layout from '../../Components/Layout/Layout';
import HeaderBottom from '../../Components/HeaderBottom/HeaderBottom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const HostedBuyerRegister = () => {
  return (
    <Layout>
      <div
        style={{
          paddingBottom: '50px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <HeaderBottom pathName={'Visitor Registration'} />
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <div className='register-top mt-5 '>
                <div className='hosted-visitor-top-div'>
                  <div className='d-flex align-items-center justify-content-betcricen'>
                    <h6>Particulars </h6>
                    <h6>Hosted Buyer Package Details</h6>
                  </div>
                </div>
                <div className='register-top-form-card '>Registration Fee</div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className='register-top mt-5 '>
                <div className='hosted-visitor-top-div'>
                  <div className='d-flex align-items-center justify-content-betcricen'>
                    <h6>Particulars </h6>
                    <h6>Hosted Buyer Package Details</h6>
                  </div>
                </div>
                <div className='register-top-form-card '>Registration Fee</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default HostedBuyerRegister;
