import React, { useState } from "react";
import { CommentObj, UserObj } from "../../../Constants/Constants";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface DisplayAndEditCommentProps {
    comment: CommentObj;
    user: UserObj;
    onDelete: () => void;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }

  const DisplayAndEditComment : React.FC<DisplayAndEditCommentProps> = ({
    comment,
    user,
    onDelete,
    onTitleChange,
    onBodyChange,
  }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
  
    const handleEdit = () => {
      if (comment.email === user.email) {
        setEditMode(true);
      }
    };

    const handleSave = () => {
        if (comment.name.trim() === "" || comment.body.trim() === "") {
          return;
        }

    // Update logic
    setEditMode(false);
  };

  const handleUndoEdit = () => {
    setEditMode(false);
  };

  return (
    <div className="mb-3 mt-3">
      <Card className="comment" border={`${editMode? "warning":"primary"}`}>
        <Card.Header>
          {comment.email === user.email
            ? user.email
            : `User Email: ` + comment.email}
        </Card.Header>
        <Card.Body>
          {editMode ? (
            <>
              <Form.Group className="mb-3" controlId={comment.id.toString()}>
                <Form.Label>Comment Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={comment.name}
                  onChange={onTitleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={comment.id.toString()}>
                <Form.Label>Comment Body *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment.body}
                  onChange={onBodyChange}
                  required
                />
                <div className="d-flex justify-content-between">
                  <Button variant="success" onClick={handleSave} className="mt-3 ">
                    Save Edit
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={handleUndoEdit}
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
                <div className="d-flex justify-content-between ">
                  <Button variant="primary me-1" onClick={handleEdit}>
                    Edit Comment
                  </Button>
                  <Button variant="danger ms-1" onClick={onDelete}>
                    Delete Comment
                  </Button>{" "}
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DisplayAndEditComment;