import React, { useState, useEffect } from 'react';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import { ISpeaker } from '../../Types/VisitorAllTypes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { imgUrl } from '../../Helpers/Constant';

const SingleEventSpeaker = ({ id }: any) => {
  const [speakers, setSpeakers] = useState<ISpeaker[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetcher.get(`/api/cric/event/get/all/speaker/by/${id}`);
      console.log(res.data);
      if (res.success) {
        setSpeakers(res.data);
      }
    })();
  }, [id]);
  return (
    <div>
      <Row xs={12} md={4}>
        {speakers.map((speaker) => {
          return (
            <Col>
              <div className='single-speakers-box'>
                <div className='speakers-image'>
                  <img
                    className='w-100'
                    src={`${imgUrl}/guest-speaker-files/${speaker.guest_speaker_photo}`}
                    alt=''
                  />
                </div>

                <div className='speakers-content'>
                  <div className='top-content text-center'>
                    <h5>{speaker.guest_speaker_name}</h5>
                    <div>
                      <p className='pb-2'>
                        {speaker.guest_speaker_designation}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SingleEventSpeaker;
