import 'bootstrap/dist/css/bootstrap.min.css';

import ncsaAward from './media/ncsa.jpg';
import disscoVid from './media/gui.mp4';

import demo385 from './media/demo385.mp4';
import report385 from './media/report385.pdf';

import robot from './media/robot.png';
import report198 from './media/report198.pdf';
import journal198 from './media/journal198.pdf';
import demo198 from './media/demo198.mp4';

import weceLogo from './media/wece.png';
import wece from './media/weceEOH.png';
import wcsLogo from './media/wcs-logo.png';
import wcs from './media/wcsTeam.png';
import idcLogo from './media/idc-logo.jpeg';
import idc from './media/idc.png';

import aiSlides from './media/inspiritSlides.pdf'
import inspiritVid from './media/pneumonia.mp4';

import cosmosSlides from './media/cosmosSlides.pdf'
import cosmosReport from './media/cosmosReport.pdf'

import figma from './media/figma.png';
import pilotCity from './media/pilotcity.jpeg';

import './Projects.css';
import * as React from 'react';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import DataExplorationOutlinedIcon from '@mui/icons-material/DataExplorationOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';

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

function Projects() {
  const [expanded, setExpanded] = React.useState({});
  const handleExpandClick = (id) => { setExpanded(prev => ({ ...prev, [id]: !prev[id] })); };

  return (
    <div class="page">
        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <QueueMusicRoundedIcon aria-label="music"></QueueMusicRoundedIcon>}
                title="UIUC NCSA Research Project"
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
                    <Typography gutterBottom variant="h7" component="div">DISSCO Software</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        I assisted with programming the new graphical user interface using C++ and the QT framework 
                        (upgrading from the old GTK framework) for Dr. Sever Tipei’s project DISSCO (version 2.2.0). When finalized, the software
                        with the new GUI will be utilized in Dr. Tipei's class Introduction to Computer Music (Music 448). I received the 2025 Fiddler
                        Innovation Undergraduate Student Fellowship Award for project contributions.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/passyur/DISSCO-2.2.0" color="success.main" sx={{ fontSize: '0.9rem'}}>DISSCO 2.2.0</Link>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/tipei/DISSCO-2.1.0" color="success.main" sx={{ fontSize: '0.9rem'}}>DISSCO 2.1.0</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href="https://cmp.ischool.illinois.edu/software/dissco/index.php" color="success.main" sx={{ fontSize: '0.9rem'}}>DISSCO Manual</Link>
                    <br></br>
                    <VideocamRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></VideocamRoundedIcon>
                    <Link href={disscoVid} color="success.main" sx={{ fontSize: '0.9rem'}}>QT GUI Demo (WIP)</Link>
                </CardContent>
            </Collapse>
        </Card>


        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <MemoryRoundedIcon aria-label="fpga"></MemoryRoundedIcon>}
                title="UIUC Digital Systems Laboratory (ECE 385) Final Project"
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
                    <Typography gutterBottom variant="h7" component="div">FPGA Arcade Game: Fruit Ninja</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        For our Digital Systems Lab final project, my partner and I designed the fruit ninja game 
                        on a system-on-chip Field Programmable Gate Array (FPGA)
                        that uses a Video Graphic Array screen output and USB mouse input. I utilized SystemVerilog
                        and C to program the game logic and mouse data on the FPGA.
                    </Typography>
                    <br></br>
                    <GitHubIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="#projects" color="success.main" sx={{ fontSize: '0.9rem'}}>Code</Link>
                    <br></br>
                    <DescriptionRoundedIcon aria-label="code" color="success" sx={{ fontSize: '1.3rem', mr: 0.8 }}></DescriptionRoundedIcon>
                    <Link href={report385} color="success.main" sx={{ fontSize: '0.9rem'}}>Final Report</Link>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <TerminalRoundedIcon aria-label="os"></TerminalRoundedIcon>}
                title="UIUC Computer Systems Engineering (ECE 391) Semester Project"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[3]} onClick={()=>handleExpandClick(3)} aria-expanded={!!expanded[3]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[3]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">Custom UNIX OS: Triple Byte OS</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        in progress ...
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <DataExplorationOutlinedIcon aria-label="data"></DataExplorationOutlinedIcon>}
                title="UIUC Applied Machine Learning (CS 441) Final Project"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[4]} onClick={()=>handleExpandClick(4)} aria-expanded={!!expanded[4]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[4]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">Multi-Sport Event Embedding Space</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        in progress ...
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <SensorsIcon aria-label="sensor"></SensorsIcon>}
                title="UIUC First-Year Design Laboratory (ECE 198) Semester Project"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[5]} onClick={()=>handleExpandClick(5)} aria-expanded={!!expanded[5]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[5]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 500, height: 300, margin: "0 auto", display: "block" }} image={robot} title="echo nav"/>
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">Autonomous Robot: EchoNav</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        For our James Scholar Honors Lab project, my group and I designed an autonmous robot that can traverse a room using
                        ultrasonic sensors, a finite state machine, and wheel motors.
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
                title="WECE Website Chair / WECEHacks & EOH Software Team (2023-25)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[6]} onClick={()=>handleExpandClick(6)} aria-expanded={!!expanded[6]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[6]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 380, height: 200, margin: "0 auto", display: "block" }} image={wece} title="solar flower power eoh"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        As the Website Chair for the WECE Infastructure Committee, I developed and maintained the official WECE website
                        utilizing React, Next JS, Vercel, and MongoDB. Additionally as a member of the committee, I led monthly workshops
                        teaching full-stack web development to students. For WECE's 2024 hackathon, I was on the software team where
                        I helped build the official website with interactive games using HTML, CSS, and Javascript. For WECE's 2023-24
                        EOH Project Solar Flower Power, I was also on the software team where I contributed to coding the IOS mobile app
                        to control solar panel direction and power monitoring using Flutter in Dart.
                    </Typography>
                    <br></br>
                    <ComputerRoundedIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></ComputerRoundedIcon>
                    <Link href="https://wece.ece.illinois.edu/" color="secondary.dark" sx={{ fontSize: '0.9rem', mr: 1.8}}>WECE Website</Link>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/uiuc-wece/wece-next-app" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>WECE Website Code</Link>
                    <br></br>
                    <ComputerRoundedIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></ComputerRoundedIcon>
                    <Link href="https://amaigabichan.github.io/wecehacks-24/" color="secondary.dark" sx={{ fontSize: '0.9rem', mr: 1.8}}>2024 WECE Hackathon Website</Link>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/amaigabichan/wecehacks-24" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>2024 WECE Hackathon Website Code</Link>
                    <br></br>
                    <GitHubIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></GitHubIcon>
                    <Link href="https://github.com/Kgo222/weceEOH_23" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>Solar Flower Power EOH Flutter App Code</Link>
                </CardContent>
            </Collapse>
            <CardHeader 
                avatar={ <Avatar src={wcsLogo} alt="WCS logo" sx={{ height: 30, width: 120, borderRadius: 0}}/>}
                title="WCS Technical Resources Facilitator, Girls Who Code Volunteer (2023-24)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[7]} onClick={()=>handleExpandClick(7)} aria-expanded={!!expanded[7]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[7]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 290, height: 200, margin: "0 auto", display: "block" }} image={wcs} title="wcs leadership"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        As a member of WCS Technical Resources Subteam of the Explorations Commitee in 2023-24, I led monthly workshops teaching
                        AI, Python, and Web Dev basics to college and high school students. Additionally, I volunteered in 2024 to assist in weekly
                        Python and Scratch coding lessons for elementary school girls in Girls Who Code.
                    </Typography>
                </CardContent>
            </Collapse>
            <CardHeader 
                avatar={ <Avatar src={idcLogo} alt="IDC logo" sx={{ height: 30, borderRadius: 0}}/>}
                title="IDC Infrastructure Coordinator (2024-25)"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[8]} onClick={()=>handleExpandClick(8)} aria-expanded={!!expanded[8]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[8]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 290, height: 200, margin: "0 auto", display: "block" }} image={idc} title="idc leadership"/>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        As a member of the IDC Infrastructure Team, I was responsible for creating digital platforms for promoting
                        and hosting a 3-day CAD product design competition. I worked with a partner to develop the official IDC website 
                        hosted for 70+ competition teams, which was a 300% increase in participation and engagement from previous years.
                    </Typography>
                    <br></br>
                    <ComputerRoundedIcon aria-label="code" color="secondary" sx={{ fontSize: '1.3rem', mr: 0.8 }}></ComputerRoundedIcon>
                    <Link href="https://www.illinoisdesignchallenge.com/" color="secondary.dark" sx={{ fontSize: '0.9rem'}}>IDC Website</Link>
                </CardContent>
            </Collapse>
        </Card>


        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={ <MonitorHeartOutlinedIcon aria-label="health monitor"></MonitorHeartOutlinedIcon>}
                title="Inspirit AI Scholars Project"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[9]} onClick={()=>handleExpandClick(9)} aria-expanded={!!expanded[9]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[9]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ height: 200, backgroundColor: "#263238" }} component="video" src={inspiritVid} title="ai pneumonia detector demo video" controls/>   
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">Pneumonia Detector</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        As a part of the program, I worked in a team under a mentor to learn about different AI concepts
                        and use our knowledge to program an pneumonia detector in Python using convolutional neural networks
                        on X-ray data. The video to the right shows our pneumonia detection app deployed with a Flask backend and HTML frontend.
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
                title="UC Davis COSMOS Project"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[10]} onClick={()=>handleExpandClick(10)} aria-expanded={!!expanded[10]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[10]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">Computers in Biophysics & Robotics Cluster</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        As a part of the cluster, I worked on two projects. The first was designing, building, and programming
                        a LegoMindstorm Robot with ultrasonic sensors in RobotC to detect and pick up objects. The second was programming an algorithm in Python to analyze
                        steps and random walker movement of objects in 2D shapes.
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

        <Card sx={{ width: '100%', maxWidth: 700 }}>
            <CardHeader 
                avatar={<Avatar src={pilotCity} alt="pilotcity logo" sx={{ height: 30, width: 25, borderRadius: 0}}/>}
                title="PilotCity Software Intern"
                sx={{ textAlign: "left", "& .MuiCardHeader-content": { textAlign: "left",},}}
                action={
                    <ExpandMore expand={!!expanded[11]} onClick={()=>handleExpandClick(11)} aria-expanded={!!expanded[11]} aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            <Collapse in={!!expanded[11]} timeout="auto" unmountOnExit>
                <CardMedia sx={{ width: 290, height: 200, margin: "0 auto", display: "block" }} image={figma} title="blog post website figma"/>
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">Blog Post & Email Template Websites</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        As a part of the software intern team, I worked on programming a blog post website in HTML, CSS, Javascript, and React using
                        the NoSQL Firebase database. Additionally, I worked on designing and programming an email template creation page
                        for the company's Project Development Kit for future fellows.
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

export default Projects;