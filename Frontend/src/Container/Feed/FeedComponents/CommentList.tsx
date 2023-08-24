import React from "react";
import { CommentObj, UserObj } from "../../../Constants/Constants";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface CommentListProps {
  comments: CommentObj[];
  user: UserObj;
  editMode: Record<string, boolean>;
  onEdit: (comment: CommentObj) => void;
  onDelete: (comment: CommentObj) => void;
  onUndoEdit: (comment: CommentObj) => void;
  onCommentTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showTitleRequired: boolean;
  showBodyRequired: boolean;
  editCommentTitle: string;
  editCommentBody: string;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  user,
  editMode,
  onEdit,
  onDelete,
  onUndoEdit,
  onCommentTitleChange,
  onCommentBodyChange,
  showTitleRequired,
  showBodyRequired,
  editCommentTitle,
  editCommentBody,
}) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-3 mt-3">
          <Card key={comment.id} className="comment" border="dark">
            <Card.Header>
              {comment.email === user.email
                ? user.email
                : `User Email: ` + comment.email}
            </Card.Header>
            <Card.Body>
              {editMode[comment.id] ? (
                <>
                  <Form.Group className="mb-3" controlId={comment.id.toString()}>
                    <Form.Label>Comment Title *</Form.Label>
                    <Form.Control
                      type="text"
                      value={editCommentTitle} // Use the specific comment's name value here
                      onChange={onCommentTitleChange}
                      required
                    />
                    {showTitleRequired && (
                      <div className="text-danger">Required</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={comment.id.toString()}>
                    <Form.Label>Comment Body *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editCommentBody} // Use the specific comment's body value here
                      onChange={onCommentBodyChange}
                      required
                    />
                    {showBodyRequired && (
                      <div className="text-danger">Required</div>
                    )}
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        onClick={() => onEdit(comment)}
                        className="mt-3"
                      >
                        Save Edit
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        onClick={() => onUndoEdit(comment)}
                        className="mt-3"
                      >
                        Undo Edit
                      </Button>
                    </div>
                  </Form.Group>
                </>
              ) : (
                <>
                  <Card.Title>{comment.name}</Card.Title>
                  <Card.Text>{comment.body}</Card.Text>
                  {comment.email === user.email && (
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => onEdit(comment)}
                      >
                        Edit Comment
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onDelete(comment)}
                      >
                        Delete Comment
                      </Button>{" "}
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
};

export default CommentList;
