import React, { ReactNode } from "react";
import HeadingLogo from "../../Component/Logo/HeadingLogo";
import LogHero from "./LogHero/LogHero";
import Footer from "../../Component/Footer/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  childComponet: ReactNode;
  DarkMode?: boolean;
}

const LogGeneral = ({ childComponet, DarkMode = true }: Props) => {
  return (
    <>
      <div className={`${DarkMode ? "bg-dark" : ""}`}>
        <HeadingLogo DarkMode={true} />
        <Container>
          <Row>
            {/* form-shadow  */}
            <Col
              lg={6}
              xs={12}
              className="mt-3  mb-5 center third-border-right"
            >
              {" "}
              {/* On large screens, take half width (6 out of 12 columns), on small screens, take full width */}
              {childComponet}
            </Col>
            <Col lg={6} xs={12} className="mt-3">
              {" "}
              {/* On large screens, take half width (6 out of 12 columns), on small screens, take full width */}
              <LogHero />
            </Col>
          </Row>
        </Container>
        <Footer DarkMode={true} />
      </div>
    </>
  );
};

export default LogGeneral;
