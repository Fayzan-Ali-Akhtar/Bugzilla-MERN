import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { User, Project } from "../../../../Constants/Constants";
import { fetchOneProjectFromServer } from "../../../../Services/Project/GetOneProject";
import { fetchAllDevelopersFromServer } from "../../../../Services/Developer/GetAllDevelopers";
import { fetchAllQAsFromServer } from "../../../../Services/QA/GetAllQAs";
import { getLoggedInUserFromLocalStorage } from "../../../../Utils/util";
// -----------------
import TeamDevelopers from "./Developers/TeamDevelopers"; // Import child components
import TeamQAs from "./QAs/TeamQAs";
import AvailableDevelopers from "./Developers/AvailableDevelopers";
import AvailableQAs from "./QAs/AvailableQAs";
interface Props {
  projectID: string;
  isManager: boolean;
}

const Team: React.FC<Props> = ({ projectID, isManager }) => {
  // Component state variables and functions here...
  const [isLoading, setIsLoading] = useState(true);
  
  // Current User
  const [user, setUser] = useState<User | null>(null);
  // Can Edit
  const [canEdit, setCanEdit] = useState(false);
  // QAs
  const [teamQAs, setTeamQAs] = useState<User[]>([]);
  const [availableQAs, setAvailableQAs] = useState<User[]>([]);
  // Developers 
  const [teamDevelopers, setTeamDevelopers] = useState<User[]>([]);
  const [availableDevelopers, setAvailableDevelopers] = useState<User[]>([]);
  // Function To Load Data from Server and Set States
  async function getAndSetDevQaData() {
    try {
      // // Loading Started
      setIsLoading(true);
      // Getting Project Data from Server
      const projectData = await fetchOneProjectFromServer(projectID);
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
              projectID={projectID}
              getAndSetDevQaData={getAndSetDevQaData}
              setIsLoading={setIsLoading}
              teamDevelopers={teamDevelopers}
              canEdit={canEdit}
            />
            <TeamQAs
              projectID={projectID}
              getAndSetDevQaData={getAndSetDevQaData}
              setIsLoading={setIsLoading}
              teamQAs={teamQAs}
              canEdit={canEdit}
            />
            {isManager && (
              <AvailableDevelopers
                projectID={projectID}
                getAndSetDevQaData={getAndSetDevQaData}
                setIsLoading={setIsLoading}
                availableDevelopers={availableDevelopers}
                canEdit={canEdit}
              />
            )}
            {isManager && (
              <AvailableQAs
                projectID={projectID}
                getAndSetDevQaData={getAndSetDevQaData}
                setIsLoading={setIsLoading}
                availableQAs={availableQAs}
                canEdit={canEdit}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Team;