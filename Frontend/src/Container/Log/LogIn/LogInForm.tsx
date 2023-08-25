import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import AccountInfo from "../../../Component/AccountInfo/AccountInfo";
// Importing an ENUM
import { TypeLog, UserObj } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const LogInForm: React.FC = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (values: FormValues) => {
    // Check if AllUsersArray exists in localStorage
    const allUsersArrayJSON = localStorage.getItem("AllUsersArray");
    let allUsersArray: UserObj[] = [];
    if (allUsersArrayJSON) {
      allUsersArray = JSON.parse(allUsersArrayJSON);
    }

    // Check if there's a user with matching email and password in AllUsersArray
    const existingUser = allUsersArray.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (existingUser) {
      // Set the currentUser in localStorage
      localStorage.setItem("CurrentUser", JSON.stringify(existingUser));
      // Navigate to /feed route
      navigate("/feed");
    } else {
      // Display an alert if the user does not exist
      alert("Invalid email or password. Please try again.");
    }
  };

  function goToSignUp() {
    navigate("/signup");
  }

  return (
    <>
      <h2 className="center-text white-text">
        Log In to <ConnectTextLogo logo_size={1.7} /> account
      </h2>

      {/* Passing an Enum Props  */}
      <AccountInfo LogType={TypeLog.Log} />

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                <Form.Label className="white-text">Email</Form.Label>
                <InputGroup hasValidation>
                  <Field
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    className={`bg-dark text-white form-control ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage name="email" component="div" className="ms-1 text-red"/>
                </InputGroup>
              </Form.Group>
            </Row>
            {/* Add the password form group */}
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationFormikPassword">
                <Form.Label className="white-text">Password</Form.Label>
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={`bg-dark text-white form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="password" component="div" className="ms-1 text-red"/>
              </Form.Group>
            </Row>
            {/* End of the password form group */}
            <div className="d-flex justify-content-evenly mb-2">
              <Button variant="primary" type="submit">
                {/* <ConnectTextLogo logo_size={1.5} custom_color="white" /> */}
                Log In
              </Button>
              <Button variant="outline-light" type="submit" onClick={goToSignUp}>
                Don't have an account?
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LogInForm;
