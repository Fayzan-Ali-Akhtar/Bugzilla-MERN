import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import AccountInfo from "../../../Component/AccountInfo/AccountInfo";
// Importing an ENUM
import { TypeLog, NewUser, FormValues,UserType } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
      userType: yup
    .string()
    .oneOf(Object.values(UserType), "Invalid user type")
    .required("User type is required"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType:UserType.Manager,
    terms: false,
  };

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (values: FormValues) => {
    const newUser: NewUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      userType : values.userType
    };

    // Displaying NewUser 
    console.log(newUser)
    // Check if AllUsersArray exists in localStorage
    

    // Check if newUser already exists in AllUsersArray
    

    // Clear the input fields after submission
    values.firstName = "";
    values.lastName = "";
    values.email = "";
    values.password = "";
    values.terms = false;

    // Directing User to feed page
    // navigate("/login"); // Navigate to /feed route
  };

  function goToLogIn() {
    navigate("/login");
  }

  return (
    <>
      <h2 className="white-text center-text">
        Create <ConnectTextLogo logo_size={1.7} /> Account
      </h2>
      {/* Passing an Enum Props  */}
      <AccountInfo LogType={TypeLog.Sign} />
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormik01">
                <Form.Label className="white-text">First name</Form.Label>
                <Field type="text" name="firstName" className="bg-dark text-white form-control" />
                <ErrorMessage name="firstName" component="div" className="ms-1 text-red"/>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label className="white-text">Last name</Form.Label>
                <Field type="text" name="lastName" className="bg-dark text-white form-control" />
                <ErrorMessage name="lastName" component="div" className="ms-1 text-red"/>
              </Form.Group>
            </Row>
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
                  <ErrorMessage name="email" component="div" className="ms-1 text-red" />
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
            <Form.Group as={Col} md="12" controlId="validationFormikUserType">
  <Form.Label className="white-text">User Type</Form.Label>
  <Field
    as="select"
    name="userType"
    className={`bg-dark text-white form-control ${
      touched.userType && errors.userType ? "is-invalid" : ""
    }`}
  >
    <option value="">Select User Type</option>
    <option value={UserType.Developer}>Developer</option>
    <option value={UserType.Manager}>Manager</option>
    <option value={UserType.QA}>QA</option>
  </Field>
  <ErrorMessage name="userType" component="div" className="ms-1 text-red" />
</Form.Group>

            {/* End of the password form group */}
            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik0"
                className="white-text"
              />
            </Form.Group>
            {/* Buttons  */}
            <div className="d-flex justify-content-evenly mb-2">
              <Button variant="primary" type="submit">
                {/* <ConnectTextLogo logo_size={1.5} custom_color="white" /> */}
                Sign Up
              </Button>
              <Button variant="outline-light" type="submit" onClick={goToLogIn}>
                Already have an account?
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
