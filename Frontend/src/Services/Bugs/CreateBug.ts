import axios from 'axios';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function
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
    
    const requestBody = {
        title: title,
        deadline: deadline,
        type: type,
        projectID: projectID,
        description: description,
        screenshot: screenshot,
    };
    
    await axios.post(createBugURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
