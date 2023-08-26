import { manager_URL,User } from "../../Constants/Constants";
import {getData} from '../Data/GetData';

// Function to fetch comments from the server
export async function fetchManagersFromServer(): Promise<User[]> {
    try {
    //   const url_of_comment = CommentURL[0] + postId + CommentURL[1];
    const new_url = manager_URL + '/all';
      const postData = await getData<User[]>(new_url);
      return postData;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }