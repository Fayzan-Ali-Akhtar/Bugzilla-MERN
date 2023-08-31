import React from "react";
import { User } from "../../../../../Constants/Constants";
import { addOnePersonToProjectOnServer } from "../../../../../Services/Project/AddOnePersonToProject";
interface Props {
    projectID: string;
    getAndSetDevQaData: () => void;
    setIsLoading: (isLoading: boolean) => void;
  availableQAs: User[];
  canEdit: boolean;
}

const AvailableQAs: React.FC<Props> = ({
  availableQAs,
  canEdit,
    projectID,
    getAndSetDevQaData,
    setIsLoading,
    
}) => {
    async function addQAToTeam(qaId: string) {
        setIsLoading(true);
        await addOnePersonToProjectOnServer(projectID, qaId, "qa");
        getAndSetDevQaData();
      }

  return (
    <>
      {availableQAs.length > 0 && (
        <div className="w-100 border-top border-bottom border-success pt-1">
          <h2 className="text-center mb-4">Available QAs</h2>
          <div className="d-flex flex-column align-items-center">
            {availableQAs.map((qa) => (
              <div
                key={qa.id}
                className="d-flex justify-content-between align-items-center w-100 mb-3"
              >
                <div>
                  {qa.firstName} {qa.lastName}
                </div>
                {canEdit && (
                  <button
                    className="btn btn-success"
                    onClick={() => addQAToTeam(qa.id)}
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

export default AvailableQAs;
