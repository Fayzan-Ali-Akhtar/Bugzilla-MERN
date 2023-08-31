import React from "react";
import { User } from "../../../../../Constants/Constants";
import { removeOnePersonFromProjectOnServer } from "../../../../../Services/Project/RemoveOnePersonFromProject";

interface Props {
    projectID: string;
    getAndSetDevQaData: () => void;
    setIsLoading: (isLoading: boolean) => void;
  teamQAs: User[];
  canEdit: boolean;
}

const TeamQAs: React.FC<Props> = ({ teamQAs, canEdit, 
    projectID,
    getAndSetDevQaData,
    setIsLoading,


}) => {
    async function removeQAFromTeam(qaId: string) {
        setIsLoading(true);
        await removeOnePersonFromProjectOnServer(projectID, qaId, "qa");
        getAndSetDevQaData();
      }
  return (
    <div className="w-100 border-top border-bottom border-success pt-1">
      <h2 className="text-center mb-4">Team QAs</h2>
      <div className="d-flex flex-column align-items-center">
        {teamQAs.map((qa) => (
          <div
            key={qa.id}
            className="d-flex justify-content-between align-items-center w-100 mb-3"
          >
            <div>
              {qa.firstName} {qa.lastName}
            </div>
            {canEdit && (
              <button
                className="btn btn-danger"
                onClick={() => removeQAFromTeam(qa.id)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamQAs;
