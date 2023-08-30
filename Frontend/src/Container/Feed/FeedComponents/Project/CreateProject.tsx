import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { createProjectOnServer } from "../../../../Services/Project/CreateProjectOnServer";

interface Props {
  fetchProjects: () => void;
}

const CreateProject: React.FC<Props> = ({ fetchProjects }) => {
  const [projectTitle, setProjectTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any necessary action with the project title
    console.log("Creating project:", projectTitle);
    await createProjectOnServer(projectTitle);
    // Reset the input field
    setProjectTitle("");
    // Call the fetchProjects function to update the project list
    await fetchProjects();
  };

  return (
    <>
      <div
        className="border-bottom border-success pt-1"
        style={{ width: "82%" }}
      >
        <Card bg="dark" text="white" className="mt-4 w-100">
          <Card.Body>
            <Card.Title style={{ fontSize: "2.4rem" }}>
              Create New Project
            </Card.Title>
            <Card.Subtitle className="mb-2  text-white">
              Project Title
            </Card.Subtitle>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="projectTitle"
                  value={projectTitle}
                  onChange={handleTitleChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CreateProject;
