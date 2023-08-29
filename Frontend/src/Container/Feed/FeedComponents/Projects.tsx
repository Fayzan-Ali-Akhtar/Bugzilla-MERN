import React, { useEffect } from 'react';
import { PrimaryColor,User,Project } from '../../../Constants/Constants';
import Card from 'react-bootstrap/Card';
import {fetchManageName} from "../../../Services/Manager/GetManagerName"
// import { fetchManagersFromServer } from "../../../Services/Manager/manager";
interface Props {
  project: Project;
}

const Projects: React.FC<Props> = ({ project }) => {
 const [showTeam, setShowTeam] = React.useState(false);
 const [showBug, setShowBug] = React.useState(false);
 const [showBugText, setShowBugText] = React.useState("Show Bugs");
 const [showTeamText, setShowTeamText] = React.useState("Show Team");
 const [managerName, setManagerName] = React.useState("Loading...");

 useEffect(() => {
    // Fetch the manager name from the server
    fetchManageName(project.manager)
    .then((mangerName) => {
      setManagerName(mangerName);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  , [project.manager]);

  function toggleShowBug () {
    if(!showBug){
      setShowBugText("Show Bugs");
    }
    else{
      setShowBugText("Hide Bugs");
      setShowTeamText("Show Team");
      setShowTeam(false);
    }
    setShowBug(!showBug);
  }

  function toggleShowTeam () {
    if(!showTeam){
      setShowTeamText("Show Team");
    }
    else{
      setShowTeamText("Hide Team");
      setShowBugText("Show Bugs");
      setShowTeam(false);
    }
    setShowTeam(!showTeam);
  }
  return (
    <>
    <Card bg="dark" text="white" className="mt-2 mb-2">
      <Card.Header >{project.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          {/* <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.{' '}
          </p> */}
          <footer className="blockquote-footer">
            Managed by <cite title="Source Title">{managerName}</cite>
          </footer>
          <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={toggleShowBug}>{showBugText}</button>
          <button className="btn btn-secondary" onClick={toggleShowTeam}>{showTeamText}</button>
          </div>
        </blockquote>
      </Card.Body>
    </Card>
    </>
  );
};

export default Projects;
