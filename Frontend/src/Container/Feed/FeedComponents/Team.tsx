import React,{useState,useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {User,Project} from '../../../Constants/Constants'
import { fetchOneProjectFromServer } from "../../../Services/Project/GetOneProject";

interface Props {
  projectID: string;
}

// Get all the developers obj and QAs obj
// then filter which are in team and not in team

const Team: React.FC<Props> = ({projectID}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [allDevelopers, setAllDevelopers] = useState<User[]>([]);
  const [allQAs, setAllQAs] = useState<User[]>([]);
  const [project, setProject] = useState<Project>();

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
      console.log("projectData");
      console.log(projectData);
      setProject(projectData);

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
    <div className="d-flex justify-content-center align-items-center">
      In Team Tab
      {allDevelopers.map((developer) => (
          <div key={developer.id}>{developer.firstName}</div>
        ))}
      </div>
  </>
  );
};

export default Team;
