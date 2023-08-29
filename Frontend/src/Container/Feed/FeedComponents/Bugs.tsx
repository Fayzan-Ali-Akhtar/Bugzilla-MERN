import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  // Define props here if needed
}

const Bugs: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          {isLoading && (
            <Spinner animation="grow" variant="primary" />
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center">In Bug Tab</div>
      </>
  );
};

export default Bugs;
