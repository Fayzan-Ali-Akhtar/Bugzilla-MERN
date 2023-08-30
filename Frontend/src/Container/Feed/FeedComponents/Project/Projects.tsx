import React, { useEffect } from "react";
import { Project } from "../../../../Constants/Constants";
import Card from "react-bootstrap/Card";
import { fetchManageName } from "../../../../Services/Manager/GetManagerName";
// import { fetchManagersFromServer } from "../../../Services/Manager/manager";
import Team from "../Team/Team";
import Bugs from "../Bugs/Bugs";
import Spinner from "react-bootstrap/Spinner";
import { deleteProjectFromServer } from "../../../../Services/Project/DeleteProject";

interface Props {
  project: Project;
  isManager: boolean;
  userType: string | undefined;
  fetchProjects: () => void;
  userID: string | undefined;
}

const Projects: React.FC<Props> = ({
  project,
  isManager,
  fetchProjects,
  userType,
  userID,
}) => {
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

  async function deleteProjectFun() {
    await deleteProjectFromServer(project.id);
    await fetchProjects();
  }
  return (
    <>
      <Card
        bg="dark"
        text="white"
        className="mt-4 mb-3 border border-primary border-3 "
      >
        <Card.Header>
          <div className="fs-4 d-flex justify-content-between">
            {project.title}

            {managerName === "Loading..." ? (
              <Spinner animation="grow" variant="light" size="sm" />
            ) : (
              isManager && (
                <button className="btn btn-danger" onClick={deleteProjectFun}>
                  Delete
                </button>
              )
            )}
          </div>
        </Card.Header>
        <Card.Body >
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
            {showBug && (
              <Bugs
                projectID={project.id}
                userType={userType}
                userID={userID}
              />
            )}
            {showTeam && <Team projectID={project.id} isManager={isManager} />}
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

export default Projects;
