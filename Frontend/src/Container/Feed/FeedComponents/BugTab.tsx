import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Bug } from "../../../Constants/Constants";
import {addDeveloperToBug} from '../../../Services/Bugs/AddDeveloperToBug';
import {removeDeveloperFromBug} from '../../../Services/Bugs/RemoveDeveloperFromBug';
import {updateStatusOfBug} from '../../../Services/Bugs/UpdateStatusOfBug';

interface Props {
  bug: Bug;
  userType: string | undefined;
  userID: string | undefined;
  fetchBugs: () => void;
}

const BugTab: React.FC<Props> = ({ bug, userType, userID,fetchBugs }) => {
  const [showImage, setShowImage] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);
  const [isQA, setIsQA] = React.useState(false);
  const [hasDeveloperJoined, setHasDeveloperJoined] = React.useState(false);
  const [newDeveloper, setNewDeveloper] = React.useState(false);
  const [isBugCompleted, setIsBugCompleted] = React.useState(false);

  useEffect(() => {
    // Finding Out the User Type
    if (userType === "developer") {
      if (userID) {
        if (bug.developers.includes(userID)) {
          setHasDeveloperJoined(true);
        } else {
          setNewDeveloper(true);
        }
      } else {
        setNewDeveloper(true);
      }
    } else if (userType === "qa") {
      setIsQA(true);
    }
    // Setting the Description and Screenshot
    if (bug.screenshot !== "") {
      setShowImage(true);
    }
    if (bug.description !== "") {
      setHasDescription(true);
    }
    if (bug.status === "completed"|| bug.status === "resolved") {
        setIsBugCompleted(true);
    }
  }, [bug]);

  async function deleteBugFun() 
  {
    console.log("Working on Deleting Bug!");
  }
  async function joinBug() 
  {
    await addDeveloperToBug(bug.id);
    await fetchBugs();
  }
  async function leaveBug() 
  {
      await removeDeveloperFromBug(bug.id);
      await fetchBugs();
  }
  async function bugDone() 
  {
    if(bug.type === "feature")
    {

        await updateStatusOfBug(bug.id,"completed");
    }
    else
    {
        await updateStatusOfBug(bug.id,"resolved");
    }
    await fetchBugs();
  }
  async function reOpenBug() 
  {
    await updateStatusOfBug(bug.id,"started");
    await fetchBugs();
  }
  return (
    <>
      <div className="w-100 border-top border-bottom border-primary mt-3 pt-1">
        <Card
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
          className="w-100"
        >
          <Card.Body>
            {showImage && <Card.Img variant="top" src={bug.screenshot} />}
            <Card.Title>Bug: {bug.title}</Card.Title>
            {hasDescription && <Card.Text>{bug.description}</Card.Text>}

            <ListGroup className="list-group-flush">
              <ListGroup.Item className="bg-dark text-white">
                Status : {bug.status}
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white">
                Deadline : {bug.deadline}
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white">
                Type : {bug.type}
              </ListGroup.Item>
            </ListGroup>
            {isQA && (
              <button className="btn btn-danger" onClick={deleteBugFun}>
                Delete Bug
              </button>
            )}
            {newDeveloper && (
              <button className="btn btn-primary" onClick={joinBug}>
                Join Bug
              </button>
            )}
            {hasDeveloperJoined && (
              <div className="d-flex justify-content-between">
                
                {
                    isBugCompleted? <button className="btn btn-secondary" onClick={reOpenBug}>
                    Reopen Bug
                  </button>:
                    <button className="btn btn-success" onClick={bugDone}>
                  {bug.type === "feature"
                    ? "Mark as Completed"
                    : "Mark as Resolved"}
                </button>
                }
                <button className="btn btn-danger" onClick={leaveBug}>
                  Leave Bug
                </button>
              </div>
            )}
          </Card.Body>

          {/* <div className="d-flex justify-content-between">
    <button
      className="btn btn-danger"
      onClick={deleteBugFun}
    >
      Delete
    </button>
  </div> */}
        </Card>

        {/* <div className="d-flex justify-content-between"> */}
        {/* 
            
            {bug.projectID}
            {bug.developers}
            
            {bug.screenshot} */}
      </div>
    </>
  );
};

export default BugTab;
