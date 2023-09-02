import { allProjectURL, Project } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function

export async function fetchAllProjectsFromServer(): Promise<Project[]> {
  try {
    const config = { headers: {} }; // Initialize headers
    addTokenToRequestHeader(config); // Add token to headers
    const postData:any = await newGetData<any[]>(allProjectURL, config);
    const projects = postData.projects;
    // Making the array of projects in the correct foemat to be used in the frontend
    const arrProjects:Project[] = projects.map((project: any) => {
        const existingProject = {
            id: project._id,
            title: project.title,
            bugs: project.bugs,
            developers: project.developers,
            qas: project.qas,
            manager: project.manager,
            };
        return existingProject;
    });
    return arrProjects;

  } catch (error) {
    throw error;
  }
}
