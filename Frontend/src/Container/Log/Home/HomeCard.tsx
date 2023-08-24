import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { TypeLog } from "../../../Constants/Constants";

interface Props {
  LogType: TypeLog;
}

function HomeCard({ LogType }: Props) {
  return (
    <Card className="center-text" 
    bg = {LogType === TypeLog.Sign? "primary":"light"}
    text={LogType === TypeLog.Sign? 'white':  'dark' }
    >
      <Card.Body
       
        className={
          LogType === TypeLog.Log
            ? "secondary-color-border"
            : "primary-color-border"
        }
      >
        <h2>{LogType}</h2>
        <Card.Text>
          {LogType === TypeLog.Log
            ? "Already have an account? Then Log In Now!"
            : "Don't have an account then Sign Up Now!"}
        </Card.Text>
        <Button
          variant={LogType === TypeLog.Sign? "outline-light":  "outline-dark" }
          href={LogType === TypeLog.Log ? "/login" : "/signup"}
        >
          {LogType === TypeLog.Log ? "Log In" : "Sign Up"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
