import React from "react";
import { Col, Row } from "react-bootstrap";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import { TypeLog } from "../../../Constants/Constants";
import AccountInfo from "../../../Component/AccountInfo/AccountInfo";
import HomeCard from "./HomeCard";

const HomeForm: React.FC = () => {
  return (
    <>
      <h2>
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
    </>
  );
};
export default HomeForm;
