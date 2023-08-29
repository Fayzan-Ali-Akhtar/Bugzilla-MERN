import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { PrimaryColor,FourthColor,DisplayName } from "../../Constants/Constants";
import {removeUserFromLocalStorage,removeTokenFromLocalStorage} from '../../Utils/util'
import { useNavigate } from "react-router-dom";

interface Props {
  userName: DisplayName;
}

function CollapsibleExample({ userName }: Props) {
  const navigate = useNavigate(); // Get the navigate function
  function logOut() {
    // localStorage.setItem("CurrentUser", JSON.stringify({}));
    removeUserFromLocalStorage();
    removeTokenFromLocalStorage();
    navigate("/home"); 

  }

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/feed">
        <Button className="btn btn-primary" type="submit">
        {/* <Button style={{background:`${PrimaryColor}`}} type="submit"> */}
          {userName.name}
          </Button>
        
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
            <Button  variant="dark" >
          {userName.userType}
          </Button>
            </Nav.Link>
            <Nav.Link eventKey={2} href="/" onClick={logOut}>
              <Button className="btn btn-secondary" type="submit">
              {/* <Button style={{background:`${FourthColor}` ,color:"black"}} type="submit"> */}
                Log Out
              </Button>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
