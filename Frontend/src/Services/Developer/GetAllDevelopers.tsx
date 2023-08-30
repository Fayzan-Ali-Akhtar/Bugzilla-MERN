import { getAllDevelopersURL, User } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function

export async function fetchAllDevelopersFromServer(): Promise<User[]> {
  try {
    const config = { headers: {} }; // Initialize headers
    addTokenToRequestHeader(config); // Add token to headers
    const postData:any = await newGetData<any[]>(getAllDevelopersURL, config);
    const developers = postData.developers;
    // Making the array of developers in the correct foemat to be used in the frontend
    const arrDevelopers:User[] = developers.map((dev: any) => {
        const existingProject = {
            id: dev._id,
            firstName: dev.firstName,
            lastName: dev.lastName,
            email: dev.email,
            password: dev.password,
            userType: dev.userType,
            };
        return existingProject;
    });
    return arrDevelopers;

  } catch (error) {
    console.log(error);
    throw error;
  }
}