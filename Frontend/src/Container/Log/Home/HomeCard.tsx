import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { TypeLog } from "../../../Constants/Constants";

interface Props {
  LogType: TypeLog;
}

function HomeCard({ LogType }: Props) {
  return (
    <Card
      className={`center-text ${
        LogType === TypeLog.Sign ? "" : `border border-light`
      }`}
      bg={LogType === TypeLog.Sign ? "primary" : "dark"}
      text={LogType === TypeLog.Sign ? "white" : "dark"}
    >
      <Card.Body>
        <h2 className="white-text">{LogType}</h2>
        <Card.Text
          style={{ color: `${LogType === TypeLog.Log ? "white" : "white"}` }}
        >
          {LogType === TypeLog.Log
            ? "Already have an account? Then Log In Now!"
            : "Don't have an account then Sign Up Now!"}
        </Card.Text>
        <Button
          variant={LogType === TypeLog.Sign ? "outline-light" : "outline-light"}
          href={LogType === TypeLog.Log ? "/login" : "/signup"}
        >
          {LogType === TypeLog.Log ? "Log In" : "Sign Up"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
