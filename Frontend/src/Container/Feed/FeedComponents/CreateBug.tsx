import { createBug } from "../../../Services/Bugs/CreateBug";
import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import * as yup from "yup";

interface Props {
    projectID: string;
    fetchBugs: () => void;
  }
  
  interface FormValues {
    title: string;
    description: string;
    type: "feature" | "bug";
  }
  
  const CreateBug: React.FC<Props> = ({ projectID,fetchBugs }) => {
    const [screenshot, setScreenshot] = useState("");
    const [deadline, setDeadline] = useState(new Date()); // Use React state for the deadline
    const schema = yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string(),
      type: yup
        .string()
        .oneOf(["feature", "bug"], "Invalid type")
        .required("Type is required"),
    });
  
    const handleSubmit = async (values: FormValues) => {
      // Make date string in the "yyyy-MM-dd" format
      const year = deadline.getFullYear();
      const month = (deadline.getMonth() + 1).toString().padStart(2, '0');
      const day = deadline.getDate().toString().padStart(2, '0');
      
      const dateString: string = `${year}-${month}-${day}`;
      
      console.log(dateString);
      
      // Call createBug function here with the values
      console.log("Form values:", values);
      await createBug(
        values.title,
        dateString,
        values.type,
        projectID,
        values.description,
        screenshot
      );
      
      // Reset the form
      values.title = "";
      setDeadline(new Date()); // Reset the deadline using React state
      values.description = "";
      values.type = "feature";
      await fetchBugs();
    };
  
    return (
      <div className="w-100 border-top border-bottom border-primary mt-3 pt-1 mb-1">
        <h2>Create a Bug!</h2>
        <Formik
  validationSchema={schema}
  onSubmit={handleSubmit}
  initialValues={{
    title: "",
    description: "",
    type: "feature",
  }}
>
  {({ handleSubmit, touched, errors }) => (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md="6">
          <label htmlFor="title">Title</label>
          <Field
            type="text"
            name="title"
            className={`form-control ${
              touched.title && errors.title ? "is-invalid" : ""
            }`}
          />
          <ErrorMessage
            name="title"
            component="div"
            className="invalid-feedback"
          />
        </Col>
        <Col md="6">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            value={deadline.toISOString().split("T")[0]}
            onChange={(e) => setDeadline(new Date(e.target.value))}
            className={`form-control`}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="12">
          <label htmlFor="description">Description</label>
          <Field
            as="textarea" // Use "as" prop to specify the HTML element type
            name="description"
            className={`form-control ${
              touched.description && errors.description
                ? "is-invalid"
                : ""
            }`}
          />
          <ErrorMessage
            name="description"
            component="div"
            className="invalid-feedback"
          />
        </Col>
      </Row>
              <Col md="12">
              <label htmlFor="type">Type</label>
              <Field
                as="select"
                name="type"
                className={`form-control ${
                  touched.type && errors.type ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Type</option>
                <option value="feature">Feature</option>
                <option value="bug">Bug</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="invalid-feedback"
              />
            </Col>
            <Button variant="primary" type="submit" className="mt-3 mb-3">
              Create Bug
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBug;
