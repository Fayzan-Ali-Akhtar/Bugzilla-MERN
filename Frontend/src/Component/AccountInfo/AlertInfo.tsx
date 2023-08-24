import React from 'react';
import Alert from 'react-bootstrap/Alert'
import {TypeLog,AccountType} from '../../Constants/Constants'

interface props{
    Account_type : AccountType;
    LogType : TypeLog;
}

const AlertInfo = (props: props) => {
  return(
    <>
        <Alert variant={"warning"}>
            {props.Account_type} is not avaliable for {props.LogType}. Please use email.
        </Alert>
    </>
  );
};

export default AlertInfo;
