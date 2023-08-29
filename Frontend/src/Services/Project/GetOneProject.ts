import { getOneProjectURL, Project } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function

export async function fetchOneProjectFromServer(projectID: string): Promise<Project> {
  try {
    console.log('projectID:', projectID);
    const config = {
        headers: {},
        params: {
            projectid: projectID // Set the 'id' query parameter
        }
      };
    addTokenToRequestHeader(config); // Add token to headers
    const postData:any = await newGetData<any>(getOneProjectURL, config);
    // console.log("Here");
    // console.log(postData);
    const project = postData.project;
    // // Making the array of projects in the correct foemat to be used in the frontend
    // const arrProjects:Project = projects.map((project: any) => {
    //     const existingProject = {
    //         id: project._id,
    //         title: project.title,
    //         bugs: project.bugs,
    //         developers: project.developers,
    //         qas: project.qas,
    //         manager: project.manager,
    //         };
    //     return existingProject;
    // });
    return project;

  } catch (error) {
    console.log(error);
    throw error;
  }
}
