import React from "react";
import { User } from "../../../../Constants/Constants";
import { addOnePersonToProjectOnServer } from "../../../../Services/Project/AddOnePersonToProject";
interface Props {
  projectID: string;
  getAndSetDevQaData: () => void;
  setIsLoading: (isLoading: boolean) => void;
  availableDevelopers: User[];
  canEdit: boolean;
}

const AvailableDevelopers: React.FC<Props> = ({
  projectID,
  getAndSetDevQaData,
  setIsLoading,
  availableDevelopers,
  canEdit,
}) => {
  async function addDeveloperToTeam(developerId: string) {
    // Loading Started
    setIsLoading(true);
    await addOnePersonToProjectOnServer(projectID, developerId, "developer");
    getAndSetDevQaData();
  }

  return (
    <>
      {availableDevelopers.length > 0 && (
        <div className="w-100 border-top border-bottom border-success pt-1">
          <h2 className="text-center mb-4">Available Developers</h2>
          <div className="d-flex flex-column align-items-center">
            {availableDevelopers.map((developer) => (
              <div
                key={developer.id}
                className="d-flex justify-content-between align-items-center w-100 mb-3"
              >
                <div>
                  {developer.firstName} {developer.lastName}
                </div>
                {canEdit && (
                  <button
                    className="btn btn-success"
                    onClick={() => addDeveloperToTeam(developer.id)}
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AvailableDevelopers;
