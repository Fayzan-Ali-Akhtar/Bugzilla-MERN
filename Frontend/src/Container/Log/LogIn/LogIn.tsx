import React from "react";
import LogInForm from "./LogInForm";
import LogGeneral from "../LogGeneral";

interface Props {}
const LogIn = (props: Props) => {
  return <LogGeneral childComponet={<LogInForm />} />;
};

export default LogIn;
