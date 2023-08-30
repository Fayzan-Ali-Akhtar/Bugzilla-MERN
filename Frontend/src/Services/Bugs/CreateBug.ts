import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function
import {createBugURL} from "../../Constants/Constants";

export async function createBug(
    title: string,
    deadline: string,
    type: string,
    projectID: string,
    description: string,
    screenshot: string,
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    console.log("createBug function screenshot: " + screenshot);
    const requestBody = {
        title: title,
        deadline: deadline,
        type: type,
        projectID: projectID,
        description: description,
        screenshots: screenshot,
    };
    
    await axios.post(createBugURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}