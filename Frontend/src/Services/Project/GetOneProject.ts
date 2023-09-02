import { getOneProjectURL, Project } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function

export async function fetchOneProjectFromServer(projectID: string): Promise<Project> {
  try {
    const config = {
        headers: {},
        params: {
            projectid: projectID // Set the 'id' query parameter
        }
      };
    addTokenToRequestHeader(config); // Add token to headers
    const postData:any = await newGetData<any>(getOneProjectURL, config);
    const project = postData.project;
    return project;

  } catch (error) {
    // console.log(error);
    throw error;
  }
}
