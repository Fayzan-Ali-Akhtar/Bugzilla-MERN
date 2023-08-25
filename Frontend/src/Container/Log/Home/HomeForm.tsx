import React from "react";
import { Col, Row } from "react-bootstrap";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import { TypeLog } from "../../../Constants/Constants";
import AccountInfo from "../../../Component/AccountInfo/AccountInfo";
import HomeCard from "./HomeCard";

interface Props {
  DarkMode?: boolean;
}

const HomeForm: React.FC <Props>= ({DarkMode = true}) => {
  return (
    <>
    <div className={`${DarkMode?"bg-dark":""}`}>
      <h2 className="white-text center-text">
        Join <ConnectTextLogo logo_size={1.7} /> Today!
      </h2>
      {/* Passing an Enum Props */}
      <AccountInfo LogType={TypeLog.Continue} />
      <Row className="mb-3">
        <Col md="12">
          <HomeCard LogType={TypeLog.Log} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="12">
          <HomeCard LogType={TypeLog.Sign} />
        </Col>
      </Row>
      </div>
    </>
  );
};
export default HomeForm;
