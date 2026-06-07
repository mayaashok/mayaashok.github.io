import 'bootstrap/dist/css/bootstrap.min.css';


import demo385 from './media/demo385.mp4';
import report385 from './media/report385.pdf';

import plot441 from './media/plot441.png';
import report441 from './media/report441.pdf';

import robot from './media/robot.png';
import report198 from './media/report198.pdf';
import journal198 from './media/journal198.pdf';
import demo198 from './media/demo198.mp4';

import rank438 from './media/rank438.png';

import weceLogo from './media/wece.png';
import wece from './media/weceEOH.png';
import wcsLogo from './media/wcs-logo.png';
import wcs from './media/wcsTeam.png';
import idcLogo from './media/idc-logo.jpeg';
import idc from './media/idc.png';
import evLogo from './media/ev-logo.png';
import irisLogo from './media/iris-logo.png';
import gwcLogo from './media/gwc-logo.png';

import aiSlides from './media/inspiritSlides.pdf'
import inspiritVid from './media/pneumonia.mp4';

import cosmosSlides from './media/cosmosSlides.pdf'
import cosmosReport from './media/cosmosReport.pdf'


import './Projects.css';
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

import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import DataExplorationOutlinedIcon from '@mui/icons-material/DataExplorationOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import WifiIcon from '@mui/icons-material/Wifi';

import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';


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

  function AsciinemaPlayer() {
    const containerRef = useRef(null);
  
    useEffect(() => {
      const container = containerRef.current; // copy ref to local variable
      if (!container) return;
  
      const script = document.createElement("script");
      script.src = "https://asciinema.org/a/Xhx4MwTwev8eHmMI8cEDKNbMq.js";
      script.id = "asciicast-Xhx4MwTwev8eHmMI8cEDKNbMq";
      script.async = true;
  
      container.innerHTML = ""; // clear previous player
      container.appendChild(script);
  
      return () => {
        if (container) container.innerHTML = ""; // use local variable here
      };
    }, []);
  
    return <div ref={containerRef} style={{ width: "58%", height: "100%" }} />;
  }
  
  
function Projects() {
  const [expanded, setExpanded] = React.useState({});
  const handleExpandClick = (id) => { setExpanded(prev => ({ ...prev, [id]: !prev[id] })); };

  return (
    <div class="page">
        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <WifiIcon aria-label="network"></WifiIcon>}
                title="UIUC ECE 438: TCP-like Communication Protocol"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[15]} onClick={()=>handleExpandClick(15)} aria-expanded={!!expanded[15]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[15]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 360, height: 200, margin: "0 auto", display: "block" }} image={rank438} title="438 mp3 leaderboard"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Developed a reliable TCP-inspired transport protocol in C implementing connection establishment, sliding-window data transfer,
                        congestion control, retransmission, and connection teardown. The project provided hands-on experience with transport-layer networking
                        concepts including flow control, congestion control, and reliable communication, achieving 8.92 Mbps throughput on the course
                        leaderboard as Team Espressos.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="#projects" color="success.main" sx={{ fontSize: '0.9rem'}}>Code</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <TerminalRoundedIcon aria-label="os"></TerminalRoundedIcon>}
                title="UIUC ECE 391: RISC-V Operating System - Triple-Byte OS"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[3]} onClick={()=>handleExpandClick(3)} aria-expanded={!!expanded[3]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[3]} timeout="auto" unmountOnExit>
                <Box sx={{ height: "400px", backgroundColor: "#282a36", display: "flex", justifyContent: "center"}}>
                    <AsciinemaPlayer />
                </Box>
                <br></br>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Built a Unix-like operating system in C for a 64-bit RISC-V platform running on QEMU. Implemented core kernel functionality
                        including process management, virtual memory, device drivers, file systems, inter-process communication, and a system call
                        interface. The project provided hands-on experience with operating systems, computer architecture, and low-level systems programming.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="#projects" color="success.main" sx={{ fontSize: '0.9rem'}}>Code</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <DataExplorationOutlinedIcon aria-label="data"></DataExplorationOutlinedIcon>}
                title="UIUC CS 441: Machine Learning Event Classification"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[4]} onClick={()=>handleExpandClick(4)} aria-expanded={!!expanded[4]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[4]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 220, height: 165, margin: "0 auto", display: "block" }} image={plot441} title="pca embeddings plot"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Developed a machine learning pipeline to classify sports events into five categories using natural language descriptions.
                        Trained and evaluated Logistic Regression, Linear SVM, and Multi-Layer Perceptron models, selecting the MLP based on
                        quantitative and qualitative performance metrics. Built an interactive Gradio application for live inference and model demonstration.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/sebastian-chamorro/CS441_FINAL_PROJECT/tree/main" color="success.main" sx={{ fontSize: '0.9rem'}}>Code</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={report441} color="success.main" sx={{ fontSize: '0.9rem'}}>Final Report</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <MemoryRoundedIcon aria-label="fpga"></MemoryRoundedIcon>}
                title="UIUC ECE 385: FPGA Fruit Ninja Game"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[2]} onClick={()=>handleExpandClick(2)} aria-expanded={!!expanded[2]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[2]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ height: 200, backgroundColor: "#263238" }} component="video" src={demo385} title="fruit ninja demo video" controls/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Designed and implemented a Fruit Ninja-inspired game on a Spartan-7 FPGA using a system-on-chip architecture. Integrated a
                        MicroBlaze soft processor, custom SystemVerilog hardware modules, VGA graphics output, and USB mouse input through an SPI interface.
                        Developed hardware-accelerated sprite rendering, collision detection, and game logic while utilizing BRAM storage and an LFSR-based
                        randomization system.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/mayaashok/mayaashok.github.io/tree/main" color="success.main" sx={{ fontSize: '0.9rem'}}>Code</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={report385} color="success.main" sx={{ fontSize: '0.9rem'}}>Final Report</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <SensorsIcon aria-label="sensor"></SensorsIcon>}
                title="UIUC ECE 198: Autonomous Obstacle-Avoiding Robot - EchoNav"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[5]} onClick={()=>handleExpandClick(5)} aria-expanded={!!expanded[5]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[5]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 297, height: 180, margin: "0 auto", display: "block" }} image={robot} title="echo nav"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Designed and built a miniature autonomous vehicle capable of navigating a room perimeter using ultrasonic sensing and
                        finite-state-machine-basedcontrol. Developed custom sensor interface circuitry, digital logic for decision-making, and
                        motor control hardware using discrete electronic components. The project provided hands-on experience with embedded systems,
                        electronics debugging, control logic, and test instrumentation.
                    </Typography>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={report198} color="success.main" sx={{ fontSize: '0.9rem'}}>Final Report</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={journal198} color="success.main" sx={{ fontSize: '0.9rem'}}>Weekly Journal</Link>
                    <br></br>
                    <VideocamRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></VideocamRoundedIcon>
                    <Link href={demo198} color="success.main" sx={{ fontSize: '0.9rem'}}>Demo Video</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <GroupsRoundedIcon aria-label="data"></GroupsRoundedIcon>}
                title="UIUC Registered Student Organizations (RSO) Involvement"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
            />
            <CardHeader 
                avatar={ <Avatar src={weceLogo} alt="WECE logo" sx={{ height: 30, borderRadius: 0}}/>}
                title="Women in Electrical and Computer Engineering (WECE)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[6]} onClick={()=>handleExpandClick(6)} aria-expanded={!!expanded[6]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[6]} timeout="auto" unmountOnExit>
                {/* <CardMedia sx={{ width: 380, height: 200, margin: "0 auto", display: "block" }} image={wece} title="solar flower power eoh"/> */}
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Served as 2024-25 Website Chair for the Infrastructure Committee, developing and maintaining the organization's website using
                        React, Next.js, MongoDB, and Vercel. Contributed to 2023-24 software projects including an interactive hackathon website built
                        with HTML, CSS, and JavaScript, and a Flutter-based mobile application for monitoring and controlling a solar-powered
                        engineering project. Led monthly workshops introducing students to full-stack web development concepts.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/uiuc-wece/wece-next-app" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>WECE Website Code</Link>
                    <br></br>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/amaigabichan/wecehacks-24" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>2024 WECE Hackathon Website Code</Link>
                    <br></br>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/Kgo222/weceEOH_23" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>Solar Flower Power EOH Flutter App Code</Link>
                </CardContent>
            </Collapse>
            <CardHeader 
                avatar={ <Avatar src={idcLogo} alt="IDC logo" sx={{ height: 30, borderRadius: 0}}/>}
                title="Illinois Design Challenge (IDC)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[10]} onClick={()=>handleExpandClick(10)} aria-expanded={!!expanded[10]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[10]} timeout="auto" unmountOnExit>
                {/* <CardMedia sx={{ width: 290, height: 200, margin: "0 auto", display: "block" }} image={idc} title="idc leadership"/> */}
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Developed digital platforms supporting a three-day CAD-focused product design competition. Collaborated on the
                        design and implementation of the official competition website, helping support a significant increase in participant
                        engagement and event scale.
                    </Typography>
                </CardContent>
            </Collapse>
            <CardHeader 
                avatar={ <Avatar src={irisLogo} alt="IRIS logo" sx={{ height: 30, borderRadius: 0}}/>}
                title="Illinois Robotics in Space (IRIS)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[8]} onClick={()=>handleExpandClick(8)} aria-expanded={!!expanded[8]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[8]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Participated on the 2024-25 autonomy team for the Lunar Autonomy Challenge (LAC), a robotics competition focused on autonomous lunar exploration.
                        Worked with Python and OpenCV to investigate image denoising techniques for lunar imagery.
                    </Typography>
                </CardContent>
            </Collapse>
            <CardHeader 
                avatar={ <Avatar src={gwcLogo} alt="WCS logo" sx={{ height: 30, width: 55, borderRadius: 0}}/>}
                title="Girls Who Code (GWC) / Women in Computer Science (WCS)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[9]} onClick={()=>handleExpandClick(9)} aria-expanded={!!expanded[9]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[9]} timeout="auto" unmountOnExit>
                {/* <CardMedia sx={{ width: 290, height: 200, margin: "0 auto", display: "block" }} image={wcs} title="wcs leadership"/> */}
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Contributed to the 2023-24 Technical Resources subteam within the Explorations Committee, developing and leading workshops
                        on Python, web development, and introductory AI topics for college and high school students. Volunteered with 2024-25 GWC
                        to support weekly programming lessons in Python and Scratch for elementary school students.
                    </Typography>
                </CardContent>
            </Collapse>
            <CardHeader 
                avatar={ <Avatar src={evLogo} alt="EV logo" sx={{ height: 38, borderRadius: 0}}/>}
                title="Illini Electric Vehicle (EV) Concept"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[7]} onClick={()=>handleExpandClick(7)} aria-expanded={!!expanded[7]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[7]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Contributed to the 2023-24 embedded systems subteam for a student-built energy-efficient electric vehicle competing in the Shell
                        Eco-marathon. Explored current and voltage sensing solutions and STM32-based development for a joulemeter project.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>


        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <MonitorHeartOutlinedIcon aria-label="health monitor"></MonitorHeartOutlinedIcon>}
                title="Inspirit AI Scholars: Pneumonia Detection with Deep Learning"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[11]} onClick={()=>handleExpandClick(11)} aria-expanded={!!expanded[11]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[11]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ height: 200, backgroundColor: "#263238" }} component="video" src={inspiritVid} title="ai pneumonia detector demo video" controls/>   
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Developed a pneumonia detection application using convolutional neural networks trained on chest X-ray imagery. Collaborated within a mentored
                        team environment to explore machine learning concepts and deploy the final model through a Flask backend and web-based interface. The project
                        introduced practical workflows for computer vision and deep learning applications.
                    </Typography>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={aiSlides} color="success.main" sx={{ fontSize: '0.9rem'}}>Presentation Slides</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <PrecisionManufacturingOutlinedIcon aria-label="robotics"></PrecisionManufacturingOutlinedIcon>}
                title="UC Davis COSMOS: Robotics & Biophysics Research Projects"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[12]} onClick={()=>handleExpandClick(12)} aria-expanded={!!expanded[12]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[12]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Completed robotics and computational modeling projects through the UC Davis COSMOS Robotics & Biophysics program. Designed and
                        programmed a Lego Mindstorms robot capable of detecting and retrieving objects using ultrasonic sensing, and developed Python-based
                        simulations to analyze random walker behavior in two-dimensional environments. These projects introduced foundational concepts in robotics,
                        sensing, and scientific computing
                    </Typography>
                    <br></br>
                    <ComputerRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></ComputerRoundedIcon>
                    <Link href="https://mayaashokcosmos.weebly.com/" color="success.main" sx={{ fontSize: '0.9rem'}}>COSMOS Website</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={cosmosSlides} color="success.main" sx={{ fontSize: '0.9rem'}}>Ignite Robotics Project Presentation</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={cosmosReport} color="success.main" sx={{ fontSize: '0.9rem'}}>Biophysics Project Report & Code</Link>
                    <br></br>
                    <VideocamRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></VideocamRoundedIcon>
                    <Link href="https://www.youtube.com/embed/7Z8WzSwCETs" color="success.main" sx={{ fontSize: '0.9rem'}}>Robotics Project Demo</Link>
                </CardContent>
            </Collapse>
        </Card>  

    </div>  
  );
}

export default Projects;