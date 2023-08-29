import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { User, Project } from "../../../Constants/Constants";
import { fetchOneProjectFromServer } from "../../../Services/Project/GetOneProject";
import { addOnePersonToProjectOnServer } from "../../../Services/Project/AddOnePersonToProject";
import { fetchAllDevelopersFromServer } from "../../../Services/Developer/GetAllDevelopers";
import { fetchAllQAsFromServer } from "../../../Services/QA/GetAllQAs";
import { getLoggedInUserFromLocalStorage } from "../../../Utils/util";
interface Props {
  projectID: string;
}

// Get all the developers obj and QAs obj
// then filter which are in team and not in team

const Team: React.FC<Props> = ({ projectID }) => {
  // Project Data
  const [project, setProject] = useState<Project>();
  // Loading State
  const [isLoading, setIsLoading] = React.useState(true);
  // Developers
  const [teamDevelopers, setTeamDevelopers] = useState<User[]>([]);
  const [availableDevelopers, setAvailableDevelopers] = useState<User[]>([]);
  // QAs
  const [availableQAs, setAvailableQAs] = useState<User[]>([]);
  const [teamQAs, setTeamQAs] = useState<User[]>([]);
  // Current User 
  const [user, setUser] = useState<User | null>(null);
  // Can Edit 
  const [canEdit, setCanEdit] = useState(false);

  async function getAndSetDevQaData() {
    try {
      // // Loading Started
      // setIsLoading(true);
      // Getting Project Data fro Server
      const projectData = await fetchOneProjectFromServer(projectID);
      setProject(projectData);
      // Getting All Developers from Server
      const allDevelopersData = await fetchAllDevelopersFromServer();
      // Getting All QAs from Server
      const allQAsData = await fetchAllQAsFromServer();
      // Separeting Team Developers
      const developersInTeam = allDevelopersData.filter((developer) => {
        if (projectData.developers.includes(developer.id)) {
          return developer;
        }
      });
      // Separeting Available Developers
      const developersAvailable = allDevelopersData.filter((developer) => {
        if (!projectData.developers.includes(developer.id)) {
          return developer;
        }
      });
      // Separating Team QAs
      const QAsInTeam = allQAsData.filter((qa) => {
        if (projectData.qas.includes(qa.id)) {
          return qa;
        }
      });
      // Separating Available QAs
      const QAsAvailable = allQAsData.filter((qa) => {
        if (!projectData.qas.includes(qa.id)) {
          return qa;
        }
      });
      // Setting States
      setTeamDevelopers(developersInTeam);
      setAvailableDevelopers(developersAvailable);
      setTeamQAs(QAsInTeam);
      setAvailableQAs(QAsAvailable);
      // Loading finished
      setIsLoading(false);
    } catch (error) {
      console.log(`Error in getAndSetDevQaData: ${error}`);
    }
  }

  function removeDeveloperFromTeam(developerId: string) {
    console.log(`Remove Developer with ID: ${developerId} from Team`);
  }

  function removeQAFromTeam(qaId: string) {
    console.log(`Remove QA with ID: ${qaId} from Team`);
  }

  async function addQAToTeam(qaId: string) {
    console.log(`Add QA with ID: ${qaId} to Team`);
    setIsLoading(true);
    await addOnePersonToProjectOnServer(projectID,qaId,"qa" )
    getAndSetDevQaData();
  }

  async function addDeveloperToTeam(developerId: string) {
    // Loading Started
    console.log(`Add Developer with ID: ${developerId} to Team`);
    setIsLoading(true);
    await addOnePersonToProjectOnServer(projectID,developerId,"developer" )
    getAndSetDevQaData();
  }

  useEffect(() => {
    getAndSetDevQaData();
    const User: User | null = getLoggedInUserFromLocalStorage();
    setUser(User);
    if(User?.userType === "manager"){
      setCanEdit(true);
    }
  }, []);

  return (
    <>
    <div className="d-flex justify-content-center align-items-center  mt-2">
      {isLoading ? (
        <Spinner animation="grow" variant="success" />
      ) : (
        <div className="w-100">
          {/* Team Developers */}
          <div className="w-100 border-top border-bottom border-success pt-1">
            <h2 className="text-center mb-4">Team Developers</h2>
            <div className="d-flex flex-column align-items-center">
              {teamDevelopers.map((developer) => (
                <div
                  key={developer.id}
                  className="d-flex justify-content-between align-items-center w-100 mb-3"
                >
                  <div>
                    {developer.firstName} {developer.lastName}
                  </div>
                  {canEdit && (
                    <button
                      className="btn btn-danger"
                      onClick={() => removeDeveloperFromTeam(developer.id)}
                    >
                      Remove
                    </button>
                  )}
                  
                </div>
              ))}
            </div>
          </div>

          {/* Team QAs */}
          <div className="w-100 border-top border-bottom border-success pt-1">
            <h2 className="text-center mb-4">Team QAs</h2>
            <div className="d-flex flex-column align-items-center">
              {teamQAs.map((qa) => (
                <div
                  key={qa.id}
                  className="d-flex justify-content-between align-items-center w-100 mb-3"
                >
                  <div>
                    {qa.firstName} {qa.lastName}
                  </div>
                  {
                    canEdit && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeQAFromTeam(qa.id)}
                      >
                        Remove
                      </button>
                    )
                  }
                  
                </div>
              ))}
            </div>
          </div>

          {/* Available Developers */}
          <div className="w-100 border-top border-bottom border-success pt-1">
            <h2 className="text-center mb-4">Available Developers</h2>
            <div className="d-flex flex-column align-items-center">
              {availableDevelopers.map((developer) => (
                <div
                  key={developer.id}
                  className="d-flex justify-content-between align-items-center w-100 mb-3"
                >
                  <div>
                    {developer.firstName} {developer.lastName}
                  </div>
                  {canEdit && (
                    <button
                      className="btn btn-success"
                      onClick={() => addDeveloperToTeam(developer.id)}
                    >
                      Add
                    </button>
                  )}
                  
                </div>
              ))}
            </div>
          </div>

          {/* Available QAs */}
          <div className="w-100 border-top border-bottom border-success pt-1">
            <h2 className="text-center mb-4">Available QAs</h2>
            <div className="d-flex flex-column align-items-center">
              {availableQAs.map((qa) => (
                <div
                  key={qa.id}
                  className="d-flex justify-content-between align-items-center w-100 mb-3"
                >
                  <div>
                    {qa.firstName} {qa.lastName}
                  </div>
                  {canEdit && (
                    <button
                      className="btn btn-success"
                      onClick={() => addQAToTeam(qa.id)}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default Team;
