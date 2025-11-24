import 'bootstrap/dist/css/bootstrap.min.css';

import general from './media/general.png';
import swe from './media/swe.png';
import embedded from './media/embedded.png';


import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Resume() {
  const [key, setKey] = useState('general');

  return (
    <div style={{display: 'flex', justifyContent: 'center',  alignItems: 'center', minHeight: '100vh', padding: '20px',}}>
      <div style={{ width: '900px', display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "20px"}}>
          <div className='buttons' style={{ display: "flex", flexDirection: "column", gap: "16px", marginRight: "32px"}}>
              <Button
                component="a"
                href="https://github.com/mayaashok"
                sx={{ borderRadius: '50%',
                      width: 48,
                      height: 48,
                      minWidth: 0,
                      backgroundColor: 'success.main','&:hover': {  backgroundColor: 'success.light',},
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 0,
                  
                  }}
                variant="contained"        
              >
                <GitHubIcon sx={{ fontSize: 24 }}/>
              </Button>

              <Button
                component="a"
                href="https://www.linkedin.com/in/maya-ashok"
                sx={{ borderRadius: '50%',
                      width: 48,
                      height: 48,
                      minWidth: 0,
                      backgroundColor: 'success.main','&:hover': {  backgroundColor: 'success.light',},
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 0,
                  
                  }}
                variant="contained"        
              >
                <LinkedInIcon sx={{ fontSize: 24 }}/>
              </Button>
            <br></br>
          </div>

          <div className='tabs' style={{ flexGrow: 1, maxWidth: "800px", paddingRight: "80px" }}>
            <Tabs activeKey={key}
            onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="general"  title={<span style={{ color: 'black' }}>General Resume</span>}>
                <img className="resumePic" src={general} alt={'my resume'} style={{ width: '100%', padding: '10px'}}/>
              </Tab>

              <Tab eventKey="swe" title={<span style={{ color: 'black' }}>SWE-Focused Resume</span>}>
                <img className="resumePic" src={swe} alt={'my resume'} style={{ width: '100%', padding: '10px'}}/>
              </Tab>

              <Tab eventKey="embedded" title={<span style={{ color: 'black' }}>Embedded-Focused Resume</span>}>
                <img className="resumePic" src={embedded} alt={'my resume'} style={{ width: '100%', padding: '10px'}}/>
              </Tab>
            </Tabs>
          </div>
      </div>
    </div>
  );
}

export default Resume;