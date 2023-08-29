import React,{useState,useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {User,Project} from '../../../Constants/Constants'
import { fetchOneProjectFromServer } from "../../../Services/Project/GetOneProject";
import { fetchAllDevelopersFromServer } from "../../../Services/Developer/GetAllDevelopers";
import { fetchAllQAsFromServer } from "../../../Services/QA/GetAllQAs";

interface Props {
  projectID: string;
}

// Get all the developers obj and QAs obj
// then filter which are in team and not in team

const Team: React.FC<Props> = ({projectID}) => {
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
  

  useEffect(() => {
    // Fetch and set the developer and QA data here
    // For example:
    // setAllDevelopers([...arrayOfDevelopers]);
    // setAllQAs([...arrayOfQAs]);
    // setIsLoading(false); // After fetching data, set isLoading to false
  }, []);

  // const fetchProjects = async () => {
  //   try {
  //     // const ProjectsData = await fetchAllProjectsFromServer(projectID);

  //     if (ProjectsData.length === 0) {
  //       // console.log("No Projects");
  //       // setMessage("No Projects")
  //       // sethasProject(false);
  //     } else {
  //       // sethasProject(true);
  //       // setProjects(ProjectsData);
  //       for (const project of ProjectsData) {
  //         console.log(project);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching projects:", error);
  //   }
  // };

  async function getAndSetDevQaData(){
    console.log("getAndSetDevQaData");
    try
    {

      const projectData = await fetchOneProjectFromServer(projectID);
      // console.log("projectData");
      // console.log(projectData);
      setProject(projectData);
      const allDevelopersData = await fetchAllDevelopersFromServer();
      // console.log("allDevelopersData");
      // console.log(allDevelopersData);
      const allQAsData = await fetchAllQAsFromServer();
      // console.log("allQAsData");
      // console.log(allQAsData);
      // Separeting Team Developers 
      const developersInTeam = allDevelopersData.filter((developer) => 
      {
         if(projectData.developers.includes(developer.id))
         {
            return developer;
         }
        }
      );
      // Separeting Available Developers 
      const developersAvailable = allDevelopersData.filter((developer) => 
      {
         if(!projectData.developers.includes(developer.id))
         {
            return developer;
         }
        }
      );
      // Separating Team QAs
      const QAsInTeam = allQAsData.filter((qa) => 
      {
         if(projectData.qas.includes(qa.id))
         {
            return qa;
         }
        }
      );
      // Separating Available QAs
      const QAsAvailable = allQAsData.filter((qa) => 
      {
         if(!projectData.qas.includes(qa.id))
         {
            return qa;
         }
        }
      );
        // Setting States 
        setTeamDevelopers(developersInTeam);
        setAvailableDevelopers(developersAvailable);
        setTeamQAs(QAsAvailable);
        setAvailableQAs(QAsAvailable);
        setIsLoading(false);
        setIsLoading(false)

    }
    catch(error)
    {
      console.log(`Error in getAndSetDevQaData: ${error}`);
    }
    // Get all the developers obj and QAs obj
    // then filter which are in team and not in team
    // For example:
    // setAllDevelopers([...arrayOfDevelopers]);
    // setAllQAs([...arrayOfQAs]);
    // setIsLoading(false); // After fetching data, set isLoading to false
  }

  useEffect(() => {   
    getAndSetDevQaData();
    getAndSetDevQaData();
  }, []);

  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
      {isLoading && (
        <Spinner animation="grow" variant="success" />
      )}
    </div>
    <div className="d-flex flex-column align-items-center">
        {/* <h1>Team Tab</h1> */}

        {/* Displaying Team Developers */}
        <h2>Team Developers</h2>
        {teamDevelopers.map((developer) => (
          <div key={developer.id}>{developer.firstName}</div>
        ))}

        {/* Displaying Team QAs */}
        <h2>Team QAs</h2>
        {teamQAs.map((qa) => (
          <div key={qa.id}>{qa.firstName}</div>
        ))}

        {/* Displaying Available Developers */}
        <h2>Available Developers</h2>
        {availableDevelopers.map((developer) => (
          <div key={developer.id}>{developer.firstName}</div>
        ))}

        {/* Displaying Available QAs */}
        <h2>Available QAs</h2>
        {availableQAs.map((qa) => (
          <div key={qa.id}>{qa.firstName}</div>
        ))}
      </div>

  </>
  );
};

export default Team;
