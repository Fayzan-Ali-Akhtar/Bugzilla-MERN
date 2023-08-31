import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { User,Project } from "../../../../Constants/Constants";
import { fetchOneProjectFromServer } from "../../../../Services/Project/GetOneProject";
import { addOnePersonToProjectOnServer } from "../../../../Services/Project/AddOnePersonToProject";
import { removeOnePersonFromProjectOnServer } from "../../../../Services/Project/RemoveOnePersonFromProject";
import { fetchAllDevelopersFromServer } from "../../../../Services/Developer/GetAllDevelopers";
import { fetchAllQAsFromServer } from "../../../../Services/QA/GetAllQAs";
import { getLoggedInUserFromLocalStorage } from "../../../../Utils/util";
// ----------------- 
import TeamDevelopers from "./TeamDevelopers"; // Import child components
import TeamQAs from "./TeamQAs";
import AvailableDevelopers from "./AvailableDevelopers";
import AvailableQAs from "./AvailableQAs";
interface Props {
  projectID: string;
  isManager: boolean;
}

const Team: React.FC<Props> = ({ projectID, isManager }) => {
  // Component state variables and functions here...
  const [isLoading, setIsLoading] = useState(true);
  const [teamDevelopers, setTeamDevelopers] = useState<User[]>([]);
  // Project Data
  const [project, setProject] = useState<Project>();
  // Current User
  const [user, setUser] = useState<User | null>(null);
  // Can Edit
  const [canEdit, setCanEdit] = useState(false);
  // QAs
  const [teamQAs, setTeamQAs] = useState<User[]>([]);
  const [availableDevelopers, setAvailableDevelopers] = useState<User[]>([]);
  const [availableQAs, setAvailableQAs] = useState<User[]>([]);
  async function getAndSetDevQaData() {
    try {
      // // Loading Started
      setIsLoading(true);
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
      
      setIsLoading(false);
    } catch (error) {
      console.log(`Error in getAndSetDevQaData: ${error}`);
    }
  }
  async function removeDeveloperFromTeam(developerId: string) {
    setIsLoading(true);
    await removeOnePersonFromProjectOnServer(
      projectID,
      developerId,
      "developer"
    );
    getAndSetDevQaData();
  }

  async function removeQAFromTeam(qaId: string) {
    setIsLoading(true);
    await removeOnePersonFromProjectOnServer(projectID, qaId, "qa");
    getAndSetDevQaData();
  }

  async function addQAToTeam(qaId: string) {
    setIsLoading(true);
    await addOnePersonToProjectOnServer(projectID, qaId, "qa");
    getAndSetDevQaData();
  }

  async function addDeveloperToTeam(developerId: string) {
    // Loading Started
    setIsLoading(true);
    await addOnePersonToProjectOnServer(projectID, developerId, "developer");
    getAndSetDevQaData();
  }

  useEffect(() => {
    getAndSetDevQaData();
    const loggedInUser: User | null = getLoggedInUserFromLocalStorage();
    setUser(loggedInUser);
    if (loggedInUser?.userType === "manager") {
      setCanEdit(true);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-2">
        {isLoading ? (
          <Spinner animation="grow" variant="success" />
        ) : (
          <div className="w-100">
            <TeamDevelopers
            getAndSetDevQaData={getAndSetDevQaData}
            setIsLoading={setIsLoading}
              teamDevelopers={teamDevelopers}
              canEdit={canEdit}
              removeDeveloperFromTeam={removeDeveloperFromTeam}
            />
            <TeamQAs
            getAndSetDevQaData={getAndSetDevQaData}
            setIsLoading={setIsLoading}
              teamQAs={teamQAs}
              canEdit={canEdit}
              removeQAFromTeam={removeQAFromTeam}
            />
            <AvailableDevelopers
            getAndSetDevQaData={getAndSetDevQaData}
            setIsLoading={setIsLoading}
              availableDevelopers={availableDevelopers}
              isManager={isManager}
              canEdit={canEdit}
              addDeveloperToTeam={addDeveloperToTeam}
            />
            <AvailableQAs
            getAndSetDevQaData={getAndSetDevQaData}
            setIsLoading={setIsLoading}
              availableQAs={availableQAs}
              isManager={isManager}
              canEdit={canEdit}
              addQAToTeam={addQAToTeam}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
