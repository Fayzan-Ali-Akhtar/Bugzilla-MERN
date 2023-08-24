import { CommentObj, PostObj } from "../Constants/Constants";

// GETTERS
export function getCommentsLocalStorage() {
  return JSON.parse(localStorage.getItem("Comments") || "{}");
}
export function getCommentIdLocalStorage() {
  return parseInt(localStorage.getItem("CommentId") || "501");
}
export function getAllPostsLocalStorage():string|null {
  return localStorage.getItem('Posts');
}
export function getCurrentUserLocalStorage():string|null {
  return localStorage.getItem('CurrentUser');
}
export function getNewPostIdLocalStorage():string|null {
  return localStorage.getItem("NewPostId");
}

// SETTERS
export function saveCommentIdLocalStorage(commentId: number) {
  localStorage.setItem("CommentId", String(commentId));
}
export function saveCommentsLocalStorage(AllCommentArray: {
    [postId: string]: CommentObj[];
}) {
    localStorage.setItem("Comments", JSON.stringify(AllCommentArray)); // Update local storage
}
export function saveNewPostIdLocalStorage(newPostIdAvailable: number) {
    localStorage.setItem("NewPostId", JSON.stringify(newPostIdAvailable)); 
}
export function savePostsLocalStorage(posts: PostObj[]) {
    localStorage.setItem('Posts', JSON.stringify(posts)); 
}




