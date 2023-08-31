import React from "react";
import { User } from "../../../../Constants/Constants";
import { addOnePersonToProjectOnServer } from "../../../../Services/Project/AddOnePersonToProject";
interface Props {
    getAndSetDevQaData: () => void;
    setIsLoading: (isLoading: boolean) => void;
  availableQAs: User[];
  isManager: boolean;
  canEdit: boolean;
  addQAToTeam: (qaId: string) => void;
}

const AvailableQAs: React.FC<Props> = ({
  availableQAs,
  isManager,
  canEdit,
  addQAToTeam,
}) => {
  if (!isManager) {
    return null;
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
