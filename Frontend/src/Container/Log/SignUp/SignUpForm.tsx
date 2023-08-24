import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import AccountInfo from "../../../Component/AccountInfo/AccountInfo";
// Importing an ENUM
import { TypeLog, UserObj, FormValues } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  };

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (values: FormValues) => {
    const newUser: UserObj = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      userId: 0,
    };

    // Check if AllUsersArray exists in localStorage
    const allUsersArrayJSON = localStorage.getItem("AllUsersArray");
    let allUsersArray: UserObj[] = [];
    if (allUsersArrayJSON) {
      allUsersArray = JSON.parse(allUsersArrayJSON);
    }

    // Check if newUser already exists in AllUsersArray
    const existingUser = allUsersArray.find(
      (user) => user.email === newUser.email
    );
    // alert("existingUser = ");
    if (!existingUser) {
      // Adding the user id of the new user
      newUser.userId = allUsersArray.length + 11;
      // Append newUser to AllUsersArray
      allUsersArray.push(newUser);
      // Store AllUsersArray as a JSON string in localStorage
      localStorage.setItem("AllUsersArray", JSON.stringify(allUsersArray));
      // Adding CurrentUser
      localStorage.setItem("CurrentUser", JSON.stringify(newUser));
    } else {
      alert("This Email is already in use! Please use another email!");
      return;
    }

    // Clear the input fields after submission
    values.firstName = "";
    values.lastName = "";
    values.email = "";
    values.password = "";
    values.terms = false;

    // Directing User to feed page
    navigate("/feed"); // Navigate to /feed route
  };

  function goToLogIn() {
    navigate("/login");
  }

  return (
    <>
      <h2>
        Create your <ConnectTextLogo logo_size={1.7} /> Account
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
                <Form.Label>First name</Form.Label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Field
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    className={`form-control ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage name="email" component="div" />
                </InputGroup>
              </Form.Group>
            </Row>
            {/* Add the password form group */}
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationFormikPassword">
                <Form.Label>Password</Form.Label>
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="password" component="div" />
              </Form.Group>
            </Row>
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
              />
            </Form.Group>
            {/* Buttons  */}
            <div className="d-flex justify-content-evenly">
              <Button variant="primary" type="submit">
                {/* <ConnectTextLogo logo_size={1.5} custom_color="white" /> */}
                Sign Up
              </Button>
              <Button variant="outline-dark" type="submit" onClick={goToLogIn}>
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
