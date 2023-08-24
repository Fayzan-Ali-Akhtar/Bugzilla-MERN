import React, { useState } from "react";
import { CommentObj, UserObj } from "../../../Constants/Constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DisplayAndEditComment from "./DisplayAndEditComment";
import { getCommentsLocalStorage, saveCommentsLocalStorage } from "../../../Utils/util";

interface CommentTabProps {
  comments: CommentObj[];
  setComment: (comment: CommentObj[]) => void;
  user: UserObj;
  postId: number;
  commentId: number;
  setCommentId: (commentId: number) => void;
}

const CommentTab: React.FC<CommentTabProps> = ({
  comments,
  setComment,
  user,
  postId,
  commentId,
  setCommentId,
}) => {
  const [newCommentTitle, setNewCommentTitle] = useState<string>("");
  const [newCommentBody, setNewCommentBody] = useState<string>("");
  const [showTitleRequired, setShowTitleRequired] = useState<boolean>(false);
  const [showBodyRequired, setShowBodyRequired] = useState<boolean>(false);

  const handleCommentTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: number
  ) => {
    // Handle change for the new comment
    if (commentId === -1) {
      setNewCommentTitle(e.target.value);
    }
    // Handle change for editing comments
    else {
      const updatedComments = comments.map((c) =>
        c.id === commentId ? { ...c, name: e.target.value } : c
      );
      setComment(updatedComments);
    }
  };

  const handleCommentBodyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: number
  ) => {
    // Handle change for the new comment
    if (commentId === -1) {
      setNewCommentBody(e.target.value);
    }
    // Handle change for editing comments
    else {
      const updatedComments = comments.map((c) =>
        c.id === commentId ? { ...c, body: e.target.value } : c
      );
      setComment(updatedComments);
    }
  };

  const handleAddComment = () => {
    if (newCommentTitle.trim() === "" || newCommentBody.trim() === "") {
      setShowTitleRequired(newCommentTitle.trim() === "");
      setShowBodyRequired(newCommentBody.trim() === "");
      return;
    }

    const newComment: CommentObj = {
      postId: postId,
      id: commentId,
      name: newCommentTitle,
      email: user.email,
      body: newCommentBody,
    };

    setComment([...comments, newComment]);
    setCommentId(commentId + 1);
    setNewCommentTitle("");
    setNewCommentBody("");
  };

  const handleDeleteComment = (commentToDelete: CommentObj) => {
    if (commentToDelete.email === user.email) {
      const updatedComments = comments.filter(
        (c) => c.id !== commentToDelete.id
      );
      setComment(updatedComments);

      let AllCommentArray: { [postId: string]: CommentObj[] } =
        getCommentsLocalStorage();
      AllCommentArray[postId] = updatedComments;
      // Updating local storage after deleting!
      saveCommentsLocalStorage(AllCommentArray);
    }
  };

  return (
    <>
      <div className="mb-3 mt-3 ms-3 me-3">
        {comments.map((comment) => (
          <DisplayAndEditComment
            key={comment.id}
            comment={comment}
            user={user}
            onDelete={() => handleDeleteComment(comment)}
            onTitleChange={(e) => handleCommentTitleChange(e, comment.id)}
            onBodyChange={(e) => handleCommentBodyChange(e, comment.id)}
          />
        ))}

        {/* Add New Comment! */}
        <div className="border border-success rounded p-3">
          <Form>
            <Form.Group className="mb-3" controlId="new-comment-title">
              <Form.Label>Comment Title</Form.Label>
              <Form.Control
                type="text"
                value={newCommentTitle}
                onChange={(e) => handleCommentTitleChange(e, -1)}
                required
              />
              {showTitleRequired && <div className="text-danger">Required</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="new-comment-body">
              <Form.Label>Comment Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newCommentBody}
                onChange={(e) => handleCommentBodyChange(e, -1)}
                required
              />
              {showBodyRequired && <div className="text-danger">Required</div>}
              <Button
                variant="success"
                onClick={handleAddComment}
                className="mt-3"
              >
                Add Comment
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CommentTab;
