import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import Mlogo from './media/micon.png';
import Resume from './media/Resume.png';

import { Link } from 'react-router-dom';

import { FaGithubSquare, FaLinkedin, FaFileAlt} from 'react-icons/fa';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-body-custom">
      <Container>
        {/* <img src={Mlogo} className="m-logo" alt="logo" />  */}
        <Navbar.Brand as={Link} to="/portfolio" className="m-text">
          <img src={Mlogo} className="m-logo" alt="logo" /> 
          Portfolio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex align-items-lg-center"></Nav>
          <Nav>
            {/* <Nav.Link as={Link} to="/aboutme">- ABOUT ME -</Nav.Link> */}
            <Nav.Link as={Link} to="/portfolio#work" eventKey="work" className="m-text">WORK</Nav.Link>
            <Nav.Link as={Link} to="/portfolio#projects" eventKey="projects" className="m-text">PROJECTS</Nav.Link>
            {/* <Nav.Link as={Link} to="/resume">- RESUME -</Nav.Link> */}
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start gap-3 mx-auto mx-lg-0 ms-lg-3 mt-3 mt-lg-0">
              <a 
                href="https://github.com/mayaashok" 
                target="_blank" 
                rel="noopener noreferrer"
                title="View GitHub Profile"
                className="nav-icon-link"
              >
                <FaGithubSquare size={30} color="#1F1F1F" />
              </a>

              <a 
                href="https://www.linkedin.com/in/maya-ashok" 
                target="_blank" 
                rel="noopener noreferrer"
                title="View Linkedin Profile"
                className="nav-icon-link"
              >
                <FaLinkedin size={30} color="#1F1F1F" />
              </a>

              <a 
                href={Resume} 
                target="_blank" 
                rel="noopener noreferrer"
                title="View Resume"
                className="nav-icon-link"
              >
                <FaFileAlt size={27} color="#1F1F1F" />
              </a>
            </div>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;