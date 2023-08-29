import React, { useEffect } from "react";
import { PrimaryColor, User, Project } from "../../../Constants/Constants";
import Card from "react-bootstrap/Card";
import { fetchManageName } from "../../../Services/Manager/GetManagerName";
// import { fetchManagersFromServer } from "../../../Services/Manager/manager";
import Team from "./Team";
import Bugs from "./Bugs";
import Spinner from "react-bootstrap/Spinner";
import { deleteProjectFromServer } from "../../../Services/Project/DeleteProject";

interface Props {
  project: Project;
  isManager: boolean;
}

const Projects: React.FC<Props> = ({ project, isManager }) => {
  const [showTeam, setShowTeam] = React.useState(false);
  const [showBug, setShowBug] = React.useState(false);
  const [managerName, setManagerName] = React.useState("Loading...");

  useEffect(() => {
    const fetchManager = async () => {
      try {
        // Fetch the manager name from the server
        const managerName = await fetchManageName(project.manager);
        setManagerName(managerName);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };
    fetchManager();
  }, [project.manager]);

  function toggleShowBug() {
    if (!showBug) {
      if (showTeam) {
        // Making Sure that only one of them is open at a time
        setShowTeam(false);
      }
    }

    setShowBug(!showBug);
  }

  function toggleShowTeam() {
    if (!showTeam) {
      if (showBug) {
        // Making Sure that only one of them is open at a time
        setShowBug(false);
      }
    }
    setShowTeam(!showTeam);
  }

  function deleteProjectFun() {
    console.log("Deleting Project:", project.id);
    deleteProjectFromServer(project.id);
  }
  return (
    <>
      <Card bg="dark" text="white" className="mt-2 mb-2">
        <Card.Header>
          <div className="d-flex justify-content-between">
            {project.title}

            {managerName === "Loading..." ? (
              <Spinner animation="grow" variant="light" size="sm" />
            ) : (
              isManager && (
                <button
                  className="btn btn-danger"
                  onClick={deleteProjectFun}
                >
                  Delete
                </button>
              )
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer className="blockquote-footer">
              Managed by <cite title="Source Title">{managerName}</cite>
            </footer>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-primary" onClick={toggleShowBug}>
                {showBug ? "Hide Bug" : "Show Bug"}
              </button>
              <button className="btn btn-success" onClick={toggleShowTeam}>
                {showTeam ? "Hide Team" : "Show Team"}
              </button>
            </div>
            {showBug && <Bugs />}
            {showTeam && <Team projectID={project.id} isManager={isManager}/>}
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

export default Projects;
