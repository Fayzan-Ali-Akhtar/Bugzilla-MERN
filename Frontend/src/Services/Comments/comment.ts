import { CommentObj,CommentURL } from "../../Constants/Constants";
import {getData} from '../Data/GetData';

// Function to fetch comments from the server
export async function fetchCommentsFromServer(postId: number): Promise<CommentObj[]> {
    try {
      const url_of_comment = CommentURL[0] + postId + CommentURL[1];
      const postData = await getData<CommentObj[]>(url_of_comment);
      return postData;
    } catch (error) {
      throw error;
    }
  }