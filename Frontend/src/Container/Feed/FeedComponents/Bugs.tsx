import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { fetchAllBugsFromServer } from "../../../Services/Bugs/GetAllBugsOfProject";
import { Bug } from "../../../Constants/Constants";
import BugTab from "./BugTab";
import CreateBug from "./CreateBug";
interface Props {
  projectID: string;
  userType: string | undefined;
  userID: string | undefined;
}

const Bugs: React.FC<Props> = ({ projectID, userType, userID }) => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchBugs = async () => {
    try {
      setIsLoading(true);
      // getting all bugs of a project
      const bugs = await fetchAllBugsFromServer(projectID);
      setBugs(bugs);
      setIsLoading(false);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [projectID]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100">
        {isLoading ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
              {userType === "qa" && (
                <CreateBug projectID={projectID} fetchBugs={fetchBugs} />
              )}
              <h2>Bugs Report</h2>
              {bugs.map((bug) => (
                <BugTab
                  key={bug.id}
                  bug={bug}
                  userType={userType}
                  userID={userID}
                  fetchBugs={fetchBugs}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Bugs;
