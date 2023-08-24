import React from "react";
import SignUpForm from "./SignUpForm";
import LogGeneral from "../LogGeneral";

interface Props {}

const SignUp = (props: Props) => {
  return <LogGeneral childComponet={<SignUpForm />} />;
};

export default SignUp;
