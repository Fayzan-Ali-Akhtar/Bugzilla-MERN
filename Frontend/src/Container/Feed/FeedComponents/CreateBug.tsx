import { createBug } from "../../../Services/Bugs/CreateBug";
import React, { useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  projectID: string;
  fetchBugs: () => void;
}

interface FormValues {
  title: string;
  description: string;
  type: "feature" | "bug";
}

const CreateBug: React.FC<Props> = ({ projectID, fetchBugs }) => {
  const [screenshot, setScreenshot] = useState("");
  const [deadline, setDeadline] = useState(new Date()); // Use React state for the deadline
  const [imageSelected, setImageSelected] = useState<File | undefined>();
  const [isUploading, setIsUploading] = useState(false); // Add state for tracking upload status
  const [creatingBug, setCreatingBug] = useState(false); // Add state for tracking upload status

  // const [imageURL, setImageURL] = useState(); // Add state for tracking upload status

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    type: yup
      .string()
      .oneOf(["feature", "bug"], "Invalid type")
      .required("Type is required"),
  });

  const upLoadImage = async () => {
    if (imageSelected) {
      setIsUploading(true); // Set isUploading to true before starting upload
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "o45sypwv");

      try {
        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/dfcusg0w8/image/upload",
          formData
        );
        setScreenshot(response.data.secure_url);
        return response.data.secure_url;
      } catch (err) {
        console.log(err);
      } finally {
        setIsUploading(false); // Set isUploading to false after upload (success or failure)
      }
    }
  };

  useEffect(() => {
    upLoadImage();
  }, [imageSelected])
  

  const handleSubmit = async (values: FormValues) => {
    try {
      setCreatingBug(true);
      // // Uploading Image
      // const imageURL: string = await upLoadImage();
      // Make date string in the "yyyy-MM-dd" format
      const year = deadline.getFullYear();
      const month = (deadline.getMonth() + 1).toString().padStart(2, "0");
      const day = deadline.getDate().toString().padStart(2, "0");

      const dateString: string = `${year}-${month}-${day}`;

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
      setCreatingBug(false);
      await fetchBugs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-100 border-top border-bottom border-primary mt-3 pt-1 mb-1">
      {creatingBug? <h2>Creating Bug
        <Spinner animation="grow" variant="primary" />
                  <Spinner animation="grow" variant="primary" size="sm" />
                  <Spinner animation="grow" variant="primary" size="sm" />

      </h2> : (
        <>
      <h2>Create a Bug!
      
      </h2>
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
            <Col md="12">
              <label htmlFor="screenshot">Screenshot</label>
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setImageSelected(files[0]);
                  }
                }}
                className={`form-control`}
              />
            </Col>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 mb-3"
              disabled={isUploading} // Disable the button during upload
            >
              {isUploading ? "Uploading Image..." : "Create Bug"}
            </Button>
          </Form>
        )}
      </Formik>
      </>
      )}
    </div>
  );
};

export default CreateBug;
