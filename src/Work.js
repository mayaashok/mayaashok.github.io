import 'bootstrap/dist/css/bootstrap.min.css';

import ncsaAward from './media/ncsa.jpg';
import ncsaLogo from './media/ncsa-logo.png';

import figma from './media/figma.png';
import pilotCity from './media/pilotcity.jpeg';

import gmLogo from './media/gm-logo.png';
import gmCenter from './media/gm-photo.jpeg';

import eceLogo from './media/ece-logo.png';

import './Work.css';
import * as React from 'react';
import { useEffect, useRef } from "react";

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand}) => ({
    marginLeft: 'auto',
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  
function Work() {
  const [expanded, setExpanded] = React.useState({});
  const handleExpandClick = (id) => { setExpanded(prev => ({ ...prev, [id]: !prev[id] })); };

  return (
    <div class="page">
         <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={<Avatar src={gmLogo} alt="gm logo" sx={{ height: 40, width: 40, borderRadius: 0}}/>}
                title="General Motors: Advanced Systems Development Intern"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[14]} onClick={()=>handleExpandClick(14)} aria-expanded={!!expanded[14]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[14]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ height: 230, width: 580, margin: "0 auto", display: "block"}} image={gmCenter} title="gm tech center"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Supported simulation and validation workflows for Advanced Driver Assistance Systems (ADAS)
                        within a Software-in-the-Loop (SIL) environment. Developed Python-based analysis tools that
                        process and visualize Adaptive Cruise Control (ACC) performance data, helping assess correlation
                        between virtual testing and real-world vehicle behavior. Gaining experience with automotive
                        simulation, autonomy development workflows, and safety-critical software validation.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>  

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={<Avatar src={ncsaLogo} alt="ncsa logo" sx={{ height: 40, width: 40, borderRadius: 0}}/>}
                title="UIUC NCSA: Computer Music Project Research Assistant"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[1]} onClick={()=>handleExpandClick(1)} aria-expanded={!!expanded[1]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[1]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ height: 200 }} image={ncsaAward} title="ncsa fiddler award ceremony"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Developed the new graphical user interface for DISSCO 2.2.0, a computer-assisted music composition
                        platform created by Dr. Sever Tipei. Migrated the application from GTK to Qt using C++, redesigning
                        interface components and workflows while preserving existing functionality. The software will be used
                        in Introduction to Computer Music (MUS 448), and the project was recognized with the 2025 Fiddler Innovation
                        Undergraduate Student Fellowship.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/cmp-illinois/dissco" color="success.main" sx={{ fontSize: '0.9rem'}}>DISSCO 2.2.0 Code</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href="https://cmp.ischool.illinois.edu/software/dissco/index.php" color="success.main" sx={{ fontSize: '0.9rem'}}>DISSCO Manual</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={<Avatar src={eceLogo} alt="ece logo" sx={{ height: 40, width: 40, borderRadius: 0}}/>}
                title="UIUC ECE 385: Digital Systems Laboratory Course Assistant"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[2]} onClick={()=>handleExpandClick(2)} aria-expanded={!!expanded[2]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[2]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Selected as a Course Assistant after being invited to final project showcase. Supported a class of over 300 students
                        in FPGA-based digital systems development using SystemVerilog, C, and Vivado. Guided students through debugging hardware and software
                        designs while explaining concepts including microprocessor architecture, system-on-chip design, hardware/software co-design, and
                        embedded system development.
                    </Typography>
                    <br></br>
                    <VideocamRoundedIcon aria-label="code" color="warning" sx={{ fontSize: '1.3rem', mr: 0.8 }}></VideocamRoundedIcon>
                    <Link href={"https://www.youtube.com/watch?v=XK5O8kbOarY"} color="warning.dark" sx={{ fontSize: '0.9rem'}}>Final Project Showcase</Link>
                </CardContent>
            </Collapse>
        </Card>    

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={<Avatar src={pilotCity} alt="pilotcity logo" sx={{ height: 30, width: 25, borderRadius: 0}}/>}
                title="PilotCity: Software Engineering Intern"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[13]} onClick={()=>handleExpandClick(13)} aria-expanded={!!expanded[13]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[13]} timeout="auto" unmountOnExit>
                {/* <CardMedia sx={{ width: 290, height: 200, margin: "0 auto", display: "block" }} image={figma} title="blog post website figma"/> */}
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Contributed to the 2020 development of web applications supporting educational and community-focused initiatives. Built frontend
                        features using HTML, CSS, JavaScript, and React while integrating Firebase for data management. Also developed tools supporting
                        content creation and communication workflows for future program participants.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/mayaashok/PilotCity-Website" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>Blog Post Website Code</Link>
                    <br></br>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/mayaashok/PDK-ClientEmails" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>Email Template Code</Link>
                </CardContent>
            </Collapse>
        </Card>    

    </div>  
  );
}

export default Work;