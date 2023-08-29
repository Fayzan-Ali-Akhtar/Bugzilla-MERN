import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  // Define props here if needed
}

// Get all the developers obj and QAs obj
// then filter which are in team and not in team

const Team: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
      {isLoading && (
        <Spinner animation="grow" variant="success" />
      )}
    </div>
    <div className="d-flex justify-content-center align-items-center">In Team Tab</div>
  </>
  );
};

export default Team;
