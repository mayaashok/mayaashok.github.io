import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import Mlogo from './media/mlogo.svg';

import { Link } from 'react-router-dom';

import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

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
          <Nav className="me-auto d-flex align-items-lg-center"></Nav>
          <Nav>
            {/* <Nav.Link as={Link} to="/aboutme">- ABOUT ME -</Nav.Link> */}
            <Nav.Link as={Link} to="/work">- WORK -</Nav.Link>
            <Nav.Link as={Link} to="/projects">- PROJECTS -</Nav.Link>
            <Nav.Link as={Link} to="/resume">- RESUME -</Nav.Link>
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start gap-3 mx-auto mx-lg-0 ms-lg-3 mt-3 mt-lg-0">
              <a 
                href="https://github.com/mayaashok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-icon-link"
              >
                <FaGithubSquare size={30} color="#000000" />
              </a>

              <a 
                href="https://www.linkedin.com/in/maya-ashok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-icon-link"
              >
                <FaLinkedin size={30} color="#000000" />
              </a>
            </div>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;