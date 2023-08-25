import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { PrimaryColor,FourthColor } from "../../Constants/Constants";

interface Props {
  userName: string;
}

function CollapsibleExample({ userName }: Props) {
  function logOut() {
    localStorage.setItem("CurrentUser", JSON.stringify({}));
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
        <Button style={{background:`${PrimaryColor}`}} type="submit">
          {userName}
          </Button>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/" onClick={logOut}>
              <Button style={{background:`${FourthColor}` ,color:"black"}} type="submit">
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
