import React from "react";
import { User } from "../../../../../Constants/Constants";
import { removeOnePersonFromProjectOnServer } from "../../../../../Services/Project/RemoveOnePersonFromProject";

interface Props {
    projectID: string;
    getAndSetDevQaData: () => void;
    setIsLoading: (isLoading: boolean) => void;
  teamDevelopers: User[];
  canEdit: boolean;
}

const TeamDevelopers: React.FC<Props> = ({
  teamDevelopers,
  canEdit,
    projectID,
    getAndSetDevQaData,
    setIsLoading,
    
}) => {
    async function removeDeveloperFromTeam(developerId: string) {
        setIsLoading(true);
        await removeOnePersonFromProjectOnServer(
          projectID,
          developerId,
          "developer"
        );
        getAndSetDevQaData();
      }
  return (
    <div className="w-100 border-top border-bottom border-success pt-1">
      <h2 className="text-center mb-4">Team Developers</h2>
      <div className="d-flex flex-column align-items-center">
        {teamDevelopers.map((developer) => (
          <div
            key={developer.id}
            className="d-flex justify-content-between align-items-center w-100 mb-3"
          >
            <div>
              {developer.firstName} {developer.lastName}
            </div>
            {canEdit && (
              <button
                className="btn btn-danger"
                onClick={() => removeDeveloperFromTeam(developer.id)}
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

export default TeamDevelopers;
