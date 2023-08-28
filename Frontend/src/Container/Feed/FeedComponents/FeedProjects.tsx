import React from 'react';
import { PrimaryColor,User,Project } from '../../../Constants/Constants';
import Card from 'react-bootstrap/Card';
interface Props {
  project: Project;
}

const FeedProjects: React.FC<Props> = ({ project }) => {

  return (
    <>
    <Card bg="dark" text="white" className="mt-2 mb-2">
      <Card.Header>{project.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.{' '}
          </p>
          <footer className="blockquote-footer">
            Managed by <cite title="Source Title">{project.manager}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    </>
  );
};

export default FeedProjects;
