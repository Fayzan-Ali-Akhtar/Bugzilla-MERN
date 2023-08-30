import React, { useState } from "react";
import AlertInfo from "./AlertInfo";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Container, Col, Row, Button } from "react-bootstrap";
import { TypeLog, AccountType } from "../../Constants/Constants";

interface Props {
  LogType: TypeLog;
}

const AccountInfo = (props: Props) => {
  const [showG, setShowG] = useState(false);
  const [showA, setShowA] = useState(false);

  function showGoogleError() {
    setShowG(true);
    setTimeout(() => {
      setShowG(false);
    }, 5000);
  }

  function showGitHubError() {
    setShowA(true);
    setTimeout(() => {
      setShowA(false);
    }, 5000);
  }

  return (
    <>
      <Container>
        <Row className="mt-2 mb-2">
          <Col lg={6} xs={6}>
            {/* On large screens, take half width (6 out of 12 columns), on small screens, take full width */}
            <Button
              variant="light"
              className="border border-light"
              onClick={showGoogleError}
            >
              {props.LogType} with {AccountType.Google} <FcGoogle />
            </Button>
          </Col>
          <Col>
            {showG ? (
              <AlertInfo
                Account_type={AccountType.Google}
                LogType={props.LogType}
              />
            ) : null}
          </Col>
        </Row>
        <Row className="mt-2 mb-2">
          {/* On large screens, take half width (6 out of 12 columns), on small screens, take full width */}
          <Col lg={6} xs={6}>
            <Button
              variant="dark"
              className="border border-light"
              onClick={showGitHubError}
            >
              {props.LogType} with {AccountType.Github} <AiFillGithub />
            </Button>
          </Col>
          <Col>
            {showA ? (
              <AlertInfo
                Account_type={AccountType.Github}
                LogType={props.LogType}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountInfo;
