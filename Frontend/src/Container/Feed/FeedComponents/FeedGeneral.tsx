import React, { ReactNode, useState, useEffect } from "react";
import HeadingLogo from "../../../Component/Logo/HeadingLogo";
import LogHero from "../../Log/LogHero/LogHero";
import Footer from "../../../Component/Footer/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../NavBar/NavBar";
import CreateProject from "./CreateProject";
import {
  PrimaryColor,
  User,
  DisplayName,
  Project,
} from "../../../Constants/Constants";
import { getLoggedInUserFromLocalStorage } from "../../../Utils/util";
import { useNavigate } from "react-router-dom";
import { fetchAllProjectsFromServer } from "../../../Services/Project/GetAllProjects";
import Projects from "./Projects";
import Spinner from "react-bootstrap/Spinner";

interface MyStyleState {
  right: string;
  display?: string; // Add display property to the interface
}

const FeedGeneral = () => {
  const [myStyle, setMyStyle] = useState<MyStyleState>({
    right: "1.5em",
    display: window.innerWidth >= 992 ? "block" : "none", // Initial display based on window size
  });
  const navigate = useNavigate(); // Get the navigate function
  // Logined In User
  const [user, setUser] = useState<User | null>(null); // User State
  const [displayName, setDisplayName] = useState<DisplayName>({
    name: "Bugzilla",
    userType: "",
  }); // Display Name State
  const [hasProject, sethasProject] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isManager, setIsManager] = useState(false);

  // Function for images
  const detectSize = () => {
    if (window.innerWidth < 992) {
      setMyStyle({
        ...myStyle,
        display: "none",
      });
    } else if (window.innerWidth >= 992) {
      setMyStyle({
        ...myStyle,
        display: "block",
      });
    }
  };

  // Function for images
  useEffect(() => {
    // Detect initial window size when the component mounts
    detectSize();

    // Add event listener for window resize
    window.addEventListener("resize", detectSize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []); // Empty dependency array to run this effect only once, on mount

  const fetchProjects = async () => {
    try {
      const ProjectsData = await fetchAllProjectsFromServer();

      if (ProjectsData.length === 0) {
        // console.log("No Projects");
        setMessage("No Projects");
        sethasProject(false);
      } else {
        sethasProject(true);
        setProjects(ProjectsData);
        for (const project of ProjectsData) {
          console.log(project);
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    const User: User | null = getLoggedInUserFromLocalStorage();
    // Check to see if the user is logged in
    if (!User) {
      navigate("/home");
    }
    setUser(User);
    let capitalizedString: string = "";
    if (User?.userType) {
      capitalizedString =
        User?.userType.charAt(0).toUpperCase() + User?.userType.slice(1);
    }

    setDisplayName({
      name: User?.firstName,
      userType: capitalizedString,
    });
    if (User?.userType === "manager") {
      setIsManager(true);
    }

    fetchProjects();
  }, []);

  return (
    <>
      <div className="bg-dark">
        <HeadingLogo DarkMode={true} />
        <NavBar userName={displayName} />
        <Container>
          <Row>
            {isManager ? <CreateProject fetchProjects={fetchProjects} /> : null}

            <Col
              lg={10}
              xs={12}
              style={{ border: `solid ${PrimaryColor} 0.3em` }}
              className="mt-3  p-3 mb-5 bg-body rounded center"
            >
              {hasProject ? (
                <>
                  {projects.map((project) => (
                    <Projects
                      key={project.id}
                      project={project}
                      isManager={isManager}
                      fetchProjects={fetchProjects}
                      userType={user?.userType}
                      userID={user?.id}
                    />
                  ))}
                </>
              ) : (
                <>
                  <h1 className="text-primary ">{message}</h1>
                  <Spinner animation="grow" variant="primary" />
                  <Spinner animation="grow" variant="primary" size="sm" />
                  <Spinner animation="grow" variant="primary" size="sm" />
                </>
              )}
            </Col>
            <Col lg={2} xs={0} className="mt-3 position-fixed" style={myStyle}>
              {/* <LogHero/> */}
              <LogHero type="feed" />
            </Col>
          </Row>
        </Container>
        <Footer DarkMode={true} />
      </div>
    </>
  );
};

export default FeedGeneral;
