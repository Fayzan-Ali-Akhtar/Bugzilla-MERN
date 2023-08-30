import { manager_URL, User } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function

// This Used ONLY FOR TESTING 
// Function to fetch managers from the server
export async function fetchManagersFromServer(): Promise<User[]> {
  try {
    const new_url = manager_URL + '/all';
    const config = { headers: {} }; // Initialize headers
    addTokenToRequestHeader(config); // Add token to headers
    const postData = await newGetData<User[]>(new_url, config);
    return postData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
