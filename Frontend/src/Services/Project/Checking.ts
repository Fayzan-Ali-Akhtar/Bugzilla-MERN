import { manager_URL,Project } from "../../Constants/Constants";
import {getData} from '../GetData/GetData';

// Function to fetch comments from the server
export async function fetchProjectsFromServer(): Promise<Project[]> {
    try {
    //   const url_of_comment = CommentURL[0] + postId + CommentURL[1];
    const new_url = "http://localhost:5000/api/project/allinfo";
    // Need to 
      const postData = await getData<Project[]>(new_url);
      console.log("kk",postData);
      return postData;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }