import React from "react";
import LogGeneral from "../LogGeneral";
import Button from "react-bootstrap/Button";

const Message = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Button variant="primary" href="/home">
        Go to Home Page
      </Button>
    </>
  );
};

const PageNotFound = () => {
  return <LogGeneral childComponet={<Message />} />;
};

export default PageNotFound;
