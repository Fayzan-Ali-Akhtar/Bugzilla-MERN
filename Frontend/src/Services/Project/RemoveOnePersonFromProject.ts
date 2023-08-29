import axios from 'axios';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function
import { removeOnePersonFromProjectURL } from "../../Constants/Constants";

export async function removeOnePersonFromProjectOnServer(
  projectID: string,
  dataToBeAdded: string, // Replace 'any' with the appropriate type
  typeToBeAdded: string
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
      projectid: projectID,
      dataToBeRemoved: dataToBeAdded,
      typeToBeRemoved: typeToBeAdded,
    };
    
    await axios.post(removeOnePersonFromProjectURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
