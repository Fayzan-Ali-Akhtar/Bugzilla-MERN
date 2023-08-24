import React, { useState, useEffect } from "react";
import { PostObj, CommentObj, UserObj } from "../../../Constants/Constants";
import CommentTab from "../Comments/CommentTab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchCommentsFromServer } from "../../../Services/Comments/comment";
import Spinner from "react-bootstrap/Spinner";
import {
  getCommentsLocalStorage,
  saveCommentIdLocalStorage,
  saveCommentsLocalStorage,
  getCommentIdLocalStorage,
} from "../../../Utils/util";

interface PostTabProps {
  post: PostObj;
  updatePost: (posts: PostObj[]) => void;
  user: UserObj;
  posts: PostObj[];
}

const PostTab: React.FC<PostTabProps> = ({ post, updatePost, user, posts }) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState<CommentObj[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loadComments, setLoadComments] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
  const [commentId, setCommentId] = useState(501);
  const [okToSaveCommentIdLocalStorage, setOkToSaveCommentIdLocalStorage] =
    useState(false);

  const [loadingComments, setLoadingComments] = useState(false);

  const postId = post.id; // Get the postId

  // Function to delete the specific postId from AllCommentArray and update local storage
  const deletePostComments = (postIdToDelete: string) => {
    let AllCommentArray: { [postId: string]: CommentObj[] } =
      getCommentsLocalStorage();

    if (AllCommentArray[postIdToDelete]) {
      delete AllCommentArray[postIdToDelete]; // Delete the comments for the specific postId
      saveCommentsLocalStorage(AllCommentArray); // Update local storage
    }
  };

  // Function to update the commentId based on the postData
  const updateCommentId = () => {
    // Read CommentIdAvailable from localStorage
    let CommentIdAvailable: number = getCommentIdLocalStorage();
    // Set the commentId state
    setCommentId(CommentIdAvailable);
  };

  // Target UseEffect to handle CommentIdAvailable in local storage
  useEffect(() => {
    if (okToSaveCommentIdLocalStorage === true) {
      // Write CommentIdAvailable to localStorage whenever the commentId state changes
      saveCommentIdLocalStorage(commentId);
    }
  }, [okToSaveCommentIdLocalStorage, commentId]);

  // Target UseEffect
  useEffect(() => {
    if (loadComments === true) {
      // Read AllCommentArray from localStorage
      let AllCommentArray: { [postId: string]: CommentObj[] } =
        getCommentsLocalStorage();

      // Check if comments for the postId exist in AllCommentArray
      if (AllCommentArray[postId]) {
        // If comments are present, set them to state
        setComment(AllCommentArray[postId]);

        // Call the updateCommentId function to update the commentId state
        updateCommentId();
        setOkToSaveCommentIdLocalStorage(true);
      } else {
        if (postId < 100) {
          setLoadingComments(true);
          // If comments are not present, fetch them from the server
          // Fetch comments using the utility function
          fetchCommentsFromServer(postId)
            .then((postData) => {
              setComment(postData);
              setLoadingComments(false);
              // alert(`Comments loaded for :  ${post.id}`);

              // Update AllCommentArray with the new comments
              AllCommentArray[postId] = postData.length > 0 ? postData : [];
              // Store the updated AllCommentArray in localStorage
              saveCommentsLocalStorage(AllCommentArray);

              // Call the updateCommentId function to update the commentId state
              updateCommentId();
              setOkToSaveCommentIdLocalStorage(true);
            })
            .catch((error) => {
              // console.error(error);
            });
        } else {
          // Update AllCommentArray with the new comments
          AllCommentArray[postId] = [];
          // Store the updated AllCommentArray in localStorage
          saveCommentsLocalStorage(AllCommentArray);

          // Call the updateCommentId function to update the commentId state
          updateCommentId();
          setOkToSaveCommentIdLocalStorage(true);
        }
      }
    }
  }, [loadComments]);

  function showCommentSection() {
    setLoadComments(true);
    setShowComment(!showComment);
  }

  function handleDelete() {
    deletePostComments(String(postId));
    // Filter out the post to be deleted from the posts array
    const updatedPosts = posts.filter((p) => p.id !== post.id);
    // Call the updatePost function to update the posts in the parent component
    updatePost(updatedPosts);
  }

  function handleEdit() {
    if (isEditing) {
      // Save the edited post here (you can call an API to update the post on the server)
      const editedPost: PostObj = {
        ...post,
        title: editedTitle,
        body: editedBody,
      };

      // Combine the edited post with other posts in the array
      const updatedPosts = posts.map((p) =>
        p.id === editedPost.id ? editedPost : p
      );

      // Call the updatePost function to update the posts in the parent component
      updatePost(updatedPosts);
    }

    setIsEditing(!isEditing);
  }

  // Function to update AllCommentArray in local storage
  const updateAllCommentArray = (
    postIdToUpdate: string,
    updatedComments: CommentObj[]
  ) => {
    let AllCommentArray: { [postId: string]: CommentObj[] } =
      getCommentsLocalStorage();
    AllCommentArray[postIdToUpdate] = updatedComments;
    saveCommentsLocalStorage(AllCommentArray);
  };

  // useEffect to update AllCommentArray whenever the comment state changes
  useEffect(() => {
    if (comment.length > 0) {
      updateAllCommentArray(String(postId), comment);
    }
  }, [comment]);

  return (
    <div className="mb-3 mt-3 ms-3 me-3">
      <Card border={`${isEditing ? "warning" : "primary"}`}>
        <Card.Header>
          {post.userId === user.userId
            ? `User Name: ` + user.firstName + " " + user.lastName
            : `User ID: ` + post.userId}
        </Card.Header>
        <Card.Body>
          {isEditing ? (
            // Post When Editing 
            <Form>
              <Form.Group controlId="editedTitle">
                <Form.Label>Post Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="editedBody">
                <Form.Label>Post Body *</Form.Label>
                <Form.Control
                  as="textarea"
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                />
              </Form.Group>
            </Form>
          ) : (
            // Body When Not Editing 
            <>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </>
          )}
          {/* Loader for while loading Comments  */}
          {loadingComments && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant={showComment ? "dark" : "primary"}
              onClick={showCommentSection}
              className="me-3"
            >
              {showComment ? "Hide Comments" : "Show Comments"}
            </Button>
            {/* Show these buttons to the user if He/She/They/Them is the writer of the post!  */}
            {post.userId === user.userId ? (
              <>
                {isEditing ? (
                  <Button
                    variant="success"
                    onClick={handleEdit}
                    className="me-3"
                  >
                    Save Edit
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleEdit}
                    className="me-3"
                  >
                    Edit Post
                  </Button>
                )}
                {isEditing && (
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Undo Edit
                  </Button>
                )}
                {!isEditing ? (
                  <Button variant="danger" onClick={handleDelete}>
                    Delete Post
                  </Button>
                ) : null}
              </>
            ) : null}
          </div>
          {/* Comment Section !  */}
          {showComment && (
            <CommentTab
              comments={comment}
              setComment={setComment}
              user={user}
              postId={post.id}
              commentId={commentId}
              setCommentId={setCommentId}
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostTab;
