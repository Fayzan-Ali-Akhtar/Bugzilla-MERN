import { getSingleBugURL, Bug } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function

export async function fetchAllBugsFromServer(projectID:string): Promise<Bug[]> {
  try {
    const config = {
      headers: {},
      params: {
        projectID: projectID // Set the 'id' query parameter
      }
    };
    addTokenToRequestHeader(config); // Add token to headers
    const bugsData:any = await newGetData<any[]>(getSingleBugURL, config);
    const bugs = bugsData.bugs;
    // Making the array of projects in the correct foemat to be used in the frontend
    const arrProjects:Bug[] = bugs.map((bug: any) => {
        const existingProject = {
            id: bug._id,
            title: bug.title,
            deadline: bug.deadline,
            status: bug.status,
            type: bug.type,
            projectID: bug.projectID,
            developers: bug.developers,
            description: bug.description,
            screenshot: bug.screenshot,
            };
        return existingProject;
    });
    return arrProjects;

  } catch (error) {
    console.log(error);
    throw error;
  }
}
