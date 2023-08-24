import React, { ReactNode, useState, useEffect } from 'react';
import HeadingLogo from '../../../Component/Logo/HeadingLogo';
import LogHero from '../../Log/LogHero/LogHero';
import Footer from '../../../Component/Footer/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../NavBar/NavBar';

interface Props {
  userName: string;
  childComponet: ReactNode;
}
interface MyStyleState {
  right: string;
  display?: string; // Add display property to the interface
}

const LogGeneral = (props: Props) => {
  const [myStyle, setMyStyle] = useState<MyStyleState>({
    right: '1.5em',
    display: window.innerWidth >= 992 ? 'block' : 'none', // Initial display based on window size
  });

  const detectSize = () => {
    if (window.innerWidth < 992) {
      setMyStyle({
        ...myStyle,
        display: 'none',
      });
    } else if (window.innerWidth >= 992) {
      setMyStyle({
        ...myStyle,
        display: 'block',
      });
    }
  };

  useEffect(() => {
    // Detect initial window size when the component mounts
    detectSize();

    // Add event listener for window resize
    window.addEventListener('resize', detectSize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []); // Empty dependency array to run this effect only once, on mount

  return (
    <>
      <HeadingLogo backgroundBlack = {true}/>
      <NavBar userName={props.userName} />
      <Container>
        <Row>
          <Col lg={10} xs={12} className='mt-3 form-shadow p-3 mb-5 bg-body rounded center'>
            {props.childComponet}
          </Col>
          <Col lg={2} xs={0} className='mt-3 position-fixed' style={myStyle}>
            {/* <LogHero/> */}
            <LogHero type='feed' />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LogGeneral;
