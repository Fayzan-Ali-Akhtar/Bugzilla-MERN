import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import AccountInfo from "../../../Component/AccountInfo/AccountInfo";
// Importing an ENUM
import { TypeLog, UserObj,UserType } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  userType: UserType; // Add userType field here
}

const LogInForm: React.FC = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
      userType: yup
      .string()
      .oneOf(Object.values(UserType), "Invalid user type")
      .required("User type is required"),
  });

  const initialValues: FormValues = {
    email: "",
    password: "",
    userType:UserType.Manager,
  };

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (values: FormValues) => {

    const newUser = {
       userEmail :  values.email,
     userPassword :  values.password,
     userType :  values.userType
    };

    // Displaying NewUser 
    console.log(newUser);

    
    // Check if AllUsersArray exists in localStorage
    

    // Check if there's a user with matching email and password in AllUsersArray
    let response = "";

    if (response) {
      // Set the currentUser in localStorage
      localStorage.setItem("CurrentUser", JSON.stringify(response));
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
            {/* UserType form group */}
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
            <div className="d-flex justify-content-evenly mb-2 mt-3">
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
