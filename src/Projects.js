import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import robot from './media/robot.png';
import wece from './media/weceEOH.png';
import idc from './media/idc.png';
import wcs from './media/wcsTeam.png';
import inspiritVid from './media/pneumonia.mp4';
import disscoVid from './media/gui.mp4';
import figma from './media/figma.png';
import './Projects.css';

function Projects() {
  return (
    <div class="page">
    {/* <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>Personal Project</Card.Header>
        <Card.Body>
        <Card.Title>Idea</Card.Title>
        <Card.Text>
              placeholder text
        </Card.Text>
        </Card.Body>
    </Card> */}
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UIUC NCSA Research Assistant</Card.Header>
        <Card.Title class="title">Music on HPC DISSCO Software</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                I volunteered to assist with programming the new graphical user interface using C++ and the QT framework 
                (upgrading from the old GTK framework) for Dr. Sever Tipei’s project DISSCO (version 2.2.0). When finalized, the software
                with the new GUI will be utilized in Dr. Tipei's class Introduction to Computer Music (Music 448).
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://cmp.ischool.illinois.edu/software/dissco/index.php">DISSCO Info</Card.Link><br></br>
            <Card.Link href="https://github.com/passyur/DISSCO-2.2.0">DISSCO 2.2.0 Code</Card.Link><br></br>
            <Card.Link href="https://github.com/tipei/DISSCO-2.1.0">DISSCO 2.1.0 Code</Card.Link><br></br>
            <video class="media" controls>
                <source src={disscoVid} type="video/mp4"/>
            </video>
        </div>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UIUC ECE 385 Final Project</Card.Header>
        {/* <Card.Body class="cardBody"> */}
        <Card.Title class="title">FPGA Fruit Ninja Arcade Game</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                For our Digital Systems Lab final project, my partner and I designed the fruit ninja game 
                on a system-on-chip Field Programmable Gate Array (FPGA)
                that uses a Video Graphic Array screen output and USB mouse input. I utilized SystemVerilog
                and C to program the game logic and mouse data on the FPGA.
        </Card.Text>
        </div>
        <div className="column2">
        <Card.Link href="https://docs.google.com/document/d/1_xe2eH0U7YaU02WM7iQgauPf7-yudG7U5INJ5Pjg-OI/edit?usp=sharing">Final Report</Card.Link><br></br>
            <iframe class="video"
            src="https://www.youtube.com/embed/XEfdT-FjwwY" 
            title="385 Demo Video" 
            frameborder="0" 
            allow="encrypted-media; picture-in-picture" 
            allowfullscreen>
            </iframe>
        </div>
        </Card.Body>
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UIUC ECE 198 Semester Project</Card.Header>
        <Card.Title class="title">Autonomous Robot: EchoNav</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                For our James Scholar Honors Lab project, my group and I designed an autonmous robot that can traverse a room using
                ultrasonic sensors, a finite state machine, and wheel motors.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://docs.google.com/document/d/1Dx9B7okc_gUR7UUZuXER42UfKrQB217_Cz7fYfHsFGY/edit?usp=sharing">Final Report</Card.Link><br></br>
            <Card.Link href="https://docs.google.com/document/d/1r-wCB3U3eeJrBK5R5YiSYuGr5Y4xXuS1E9aDU4IqYZ8/edit?usp=sharing">Weekly Journal</Card.Link><br></br>
            <img class="media" src={robot} alt={'echonav robot'}/>
        </div>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UIUC RSOs</Card.Header>
        <Card.Title class="title">WECE Website Chair / WECEHacks & EOH Software Team (2023-25)</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                As the Website Chair for the WECE Infastructure Committee, I developed and maintained the official WECE website
                utilizing React, Next JS, Vercel, and MongoDB. Additionally as a member of the committee, I led monthly workshops
                teaching full-stack web development to students. For WECE's 2024 hackathon, I was on the software team where
                I helped build the official website with interactive games using HTML, CSS, and Javascript. For WECE's 2023-24
                EOH Project Solar Flower Power, I was also on the software team where I contributed to coding the IOS mobile app
                to control solar panel direction and power monitoring using Flutter in Dart.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://wece.ece.illinois.edu/">Official WECE Website</Card.Link><br></br>
            <Card.Link href="https://github.com/uiuc-wece/wece-next-app">WECE Website Code</Card.Link><br></br>
            <Card.Link href="https://amaigabichan.github.io/wecehacks-24/">2024 WECE Hackathon Website</Card.Link><br></br>
            <Card.Link href="https://github.com/amaigabichan/wecehacks-24">WECE Hackathon Code</Card.Link><br></br>
            <Card.Link href="https://github.com/Kgo222/weceEOH_23">Solar Flower Power EOH Flutter App Code</Card.Link><br></br>
            <img class="media" src={wece} alt={'solar flower power'}/>
        </div>
        </Card.Body>
        <Card.Title class="title">IDC Infrastructure Coordinator (2024-25)</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                As a member of the IDC Infrastructure Team, I was responsible for creating digital platforms for promoting
                and hosting a 3-day CAD product design competition. I worked with a partner to develop the official IDC website 
                hosted for 70+ competition teams, which was a 300% increase in participation and engagement from previous years.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://www.illinoisdesignchallenge.com/">Official IDC Website</Card.Link><br></br>
            <img class="media" src={idc} alt={'idc leadership'}/>
        </div>
        </Card.Body>
        <Card.Title class="title">WCS Technical Resources Facilitator, GWC (2023-24)</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                As a member of WCS Technical Resources Subteam of the Explorations Commitee in 2023-24, I led monthly workshops teaching
                AI, Python, and Web Dev basics to college and high school students. Additionally, I volunteered in 2024 to assist in weekly
                Python and Scratch coding lessons for elementary school girls in Girls Who Code.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://docs.google.com/presentation/d/1BBHaLfCewSUBoVGpqQ0uUjwoZvWEh3p7PTXr8G2vzUs/edit?usp=sharing">CS Sail Web Dev Slides</Card.Link><br></br>
            <img class="media" src={wcs} alt={'wcs leadership'}/>
        </div>
        </Card.Body> 

    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>Insprit AI Scholars</Card.Header>
        <Card.Title class="title">Pneumonia Detector</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                As a part of the program, I worked in a team under a mentor to learn about different AI concepts
                and use our knowledge to program an pneumonia detector in Python using convolutional neural networks
                on X-ray data. The video to the right shows our pneumonia detection app deployed with a Flask backend and HTML frontend.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://docs.google.com/presentation/d/1IV9-cJbSi2cv31IJkVbP_mVAGybyM6k8LKo6G_hyK0E/edit?usp=sharing">Pneumonia & TB Detector Presentation</Card.Link><br></br>
            <video class="media" controls>
                <source src={inspiritVid} type="video/mp4"/>
            </video>
        </div>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UC Davis COSMOS</Card.Header>
        <Card.Title class="title">Computers in Biophysics & Robotics Cluster</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                As a part of the cluster, I worked on two projects. The first was designing, building, and programming
                a LegoMindstorm Robot with ultrasonic sensors in RobotC to detect and pick up objects. The second was programming an algorithm in Python to analyze
                steps and random walker movement of objects in 2D shapes.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://mayaashokcosmos.weebly.com/">My COSMOS Website</Card.Link><br></br>
            <Card.Link href="https://docs.google.com/presentation/d/1g-c9IG3Pp1lefyNZAJGKZTeiG1UBNYWrZBcasy_z0WY/edit?usp=sharing">COSMOS Ignite Robotics Project Presentation</Card.Link><br></br>
            <Card.Link href="https://docs.google.com/document/d/1Azw_H6edJk5B6QxXsDSMu-MqPtmQl5Vhjoq0NrJRCnA/edit?usp=sharing">COSMOS Biophysics Project Report & Code</Card.Link><br></br>
            <iframe class="video"
            src="https://www.youtube.com/embed/7Z8WzSwCETs" 
            title="COSMOS Robotics Demo" 
            frameborder="0" 
            allow="encrypted-media; picture-in-picture" 
            allowfullscreen>
            </iframe>
        </div>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>PilotCity</Card.Header>
        <Card.Title class="title">Software Intern Team</Card.Title>
        <Card.Body class="cardBody">
        <div className="column1">
        <Card.Text class="text">
                As a part of the coding intern team, I worked on programming a blog post website in HTML, CSS, Javascript, React,
                and the Firebase NoSQL database. Additionally, I worked on designing and programming an email template creation page
                for the company's Project Development Kit for future fellows.
        </Card.Text>
        </div>
        <div className="column2">
            <Card.Link href="https://github.com/mayaashok/PilotCity-Website">Blog Post Website Code</Card.Link><br></br>
            <Card.Link href="https://github.com/mayaashok/PDK-ClientEmails">Email Template Code</Card.Link><br></br>
            <img class="media" src={figma} alt={'blog post figma'}/>
        </div>
        </Card.Body>       
    </Card>
    </div>  
  );
}

export default Projects;