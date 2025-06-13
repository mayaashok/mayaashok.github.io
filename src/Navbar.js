import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import Mlogo from './media/mlogo.svg';

import { Link } from 'react-router-dom';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-custom">
      <Container>
        {/* <img src={Mlogo} className="m-logo" alt="logo" />  */}
        <Navbar.Brand as={Link} to="/" className="m-text">
          <img src={Mlogo} className="m-logo" alt="logo" /> 
          - maya ashok -
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {/* <Nav.Link as={Link} to="/aboutme">About Me</Nav.Link> */}
            <Nav.Link as={Link} to="/projects">- PROJECTS -</Nav.Link>
            <Nav.Link as={Link} to="/resume">- RESUME -</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;