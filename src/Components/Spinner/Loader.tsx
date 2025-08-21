import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const Loader = ({ css }: any) => {
  return (
    <div>
      <Button variant='primary' disabled className={css}>
        Loading
        <Spinner
          as='span'
          variant='warning'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
        />
      </Button>
    </div>
  );
};

export default Loader;
