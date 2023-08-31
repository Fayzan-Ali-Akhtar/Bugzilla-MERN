import React from "react";
import { User } from "../../../../Constants/Constants";

interface Props {
    projectID: string;
    getAndSetDevQaData: () => void;
    setIsLoading: (isLoading: boolean) => void;
  teamDevelopers: User[];
  canEdit: boolean;
  removeDeveloperFromTeam: (developerId: string) => void;
}

const TeamDevelopers: React.FC<Props> = ({
  teamDevelopers,
  canEdit,
  removeDeveloperFromTeam,
}) => {
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
