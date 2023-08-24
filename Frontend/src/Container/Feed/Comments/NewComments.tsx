import React from "react";
import { CommentObj } from "../../../Constants/Constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface NewCommentsProps {
  newCommentTitle: string;
  newCommentBody: string;
  onCommentTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddComment: () => void;
  showTitleRequired: boolean;
  showBodyRequired: boolean;
}

const NewComments: React.FC<NewCommentsProps> = ({
  newCommentTitle,
  newCommentBody,
  onCommentTitleChange,
  onCommentBodyChange,
  onAddComment,
  showTitleRequired,
  showBodyRequired,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="new-comment-title">
        <Form.Label>Comment Title *</Form.Label>
        <Form.Control
          type="text"
          value={newCommentTitle}
          onChange={onCommentTitleChange}
          required
        />
        {showTitleRequired && (
          <div className="text-danger">Required</div>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="new-comment-body">
        <Form.Label>Comment Body *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={newCommentBody}
          onChange={onCommentBodyChange}
          required
        />
        {showBodyRequired && (
          <div className="text-danger">Required</div>
        )}
        <Button variant="success" onClick={onAddComment} className="mt-3">
          Add Comment
        </Button>
      </Form.Group>
    </Form>
  );
};

export default NewComments;
