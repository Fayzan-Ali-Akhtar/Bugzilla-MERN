// import {Project } from "../../Constants/Constants";
// import {getData} from '../GetData/GetData';

// // Function to fetch posts from the server
// // export async function fetchPostsFromServer(): Promise<Project[]> {
// //     try {
// //     //   const postData = await getData<Project[]>(PostURL);
// //     //   return postData.reverse();
// //     } catch (error) {
// //       throw error;
// //     }
// //   }

import { manager_URL, Project } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function

// Function to fetch managers from the server
export async function fetchAllProjectsFromServer(): Promise<Project[]> {
  try {
    // const new_url = manager_URL + '/all';
    const new_url = "http://localhost:5000/api/project/allinfo";
    const config = { headers: {} }; // Initialize headers
    addTokenToRequestHeader(config); // Add token to headers
    const postData = await newGetData<Project[]>(new_url, config);
    return postData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
