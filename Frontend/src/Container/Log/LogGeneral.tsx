import React , { ReactNode } from 'react';
import HeadingLogo from '../../Component/Logo/HeadingLogo';
import LogHero from './LogHero/LogHero'
import Footer from '../../Component/Footer/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface Props {
    childComponet: ReactNode;
}

const LogGeneral = (props:Props) => {
  return(
    <>
      <HeadingLogo />
      <Container>
        <Row>
          <Col lg={6} xs={12}  className='mt-3 form-shadow p-3 mb-5 bg-body rounded center'> {/* On large screens, take half width (6 out of 12 columns), on small screens, take full width */}
            {props.childComponet}
          </Col>
          <Col lg={6} xs={12}  className='mt-3'> {/* On large screens, take half width (6 out of 12 columns), on small screens, take full width */}
            <LogHero />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
    );
};

export default LogGeneral;
