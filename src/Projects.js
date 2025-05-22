import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import robot from './media/robot.png';
import wece from './media/weceEOH.png';
import idc from './media/idc.png';
import inspiritVid from './media/pneumonia.mp4';
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
        <Card.Header>UIUC ECE 385 Final Project</Card.Header>
        <Card.Body class="cardBody">
        <Card.Title>FPGA Fruit Ninja Arcade Game</Card.Title>
        <Card.Text class="text">
                For our Digital Systems Lab final project, my partner and I designed the fruit ninja game 
                on a system-on-chip Field Programmable Gate Array (FPGA)
                that uses a Video Graphic Array screen output and USB mouse input.
        </Card.Text>
        <Card.Link href="https://docs.google.com/document/d/1_xe2eH0U7YaU02WM7iQgauPf7-yudG7U5INJ5Pjg-OI/edit?usp=sharing">Final Report</Card.Link>
            <iframe class="video"
            src="https://www.youtube.com/embed/XEfdT-FjwwY" 
            title="385 Demo Video" 
            frameborder="0" 
            allow="encrypted-media; picture-in-picture" 
            allowfullscreen>
            </iframe>
        </Card.Body>
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UIUC ECE 198 Semester Project</Card.Header>
        <Card.Body class="cardBody">
        <Card.Title>Autonomous Robot: EchoNav</Card.Title>
        <Card.Text class="text">
                For our James Scholar Honors Lab project, my group and I designed an autonmous robot that can traverse a room using
                ultrasonic sensors, a finite state machine, and wheel motors.
        </Card.Text>
            <Card.Link href="https://docs.google.com/document/d/1Dx9B7okc_gUR7UUZuXER42UfKrQB217_Cz7fYfHsFGY/edit?usp=sharing">Final Report</Card.Link>
            <Card.Link href="https://docs.google.com/document/d/1r-wCB3U3eeJrBK5R5YiSYuGr5Y4xXuS1E9aDU4IqYZ8/edit?usp=sharing">Weekly Journal</Card.Link>
            <img class="media" src={robot} alt={'echonav robot'}/>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UIUC RSOs</Card.Header>
        <Card.Body class="cardBody">
        <Card.Title>WECE Website Chair / EOH Team</Card.Title>
            <Card.Link href="https://wece.ece.illinois.edu/">Official WECE Website</Card.Link>
            <Card.Link href="https://amaigabichan.github.io/wecehacks-24/">2024 WECE Hackathon Website</Card.Link>
            <Card.Link href="https://github.com/Kgo222/weceEOH_23">Solar Flower Power EOH Flutter App Code</Card.Link>
            <img class="media" src={wece} alt={'solar flower power'}/>
        <Card.Title class="idcTitle">IDC Infastructure Team</Card.Title>
            <Card.Link href="https://www.illinoisdesignchallenge.com/">Official IDC Website</Card.Link>
            <img class="media" src={idc} alt={'idc leadership'}/>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>Insprit AI Scholars</Card.Header>
        <Card.Body class="cardBody">
        <Card.Title>Pneumonia Detector</Card.Title>
        <Card.Text class="text">
                As a part of the program, I worked in a team under a mentor to learn about different AI concepts
                and use our knowledge to program an pneumonia detector in Python using convolutional neural networks
                on X-ray data.
        </Card.Text>
            <Card.Link href="https://docs.google.com/presentation/d/1IV9-cJbSi2cv31IJkVbP_mVAGybyM6k8LKo6G_hyK0E/edit?usp=sharing">Pneumonia & TB Detector Presentation</Card.Link>
            <video class="media" controls>
                <source src={inspiritVid} type="video/mp4"/>
            </video>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>UC Davis COSMOS</Card.Header>
        <Card.Body class="cardBody">
        <Card.Title>Computers in Biophysics & Robotics Cluster</Card.Title>
        <Card.Text class="text">
                As a part of the cluster, I worked on two projects. The first was designing, building, and programming
                a LegoMindstorm Robot with ultrasonic sensors in RobotC to detect and pick up objects. The second was programming an algorithm in Python to analyze
                steps and random walker movement of objects in 2D shapes.
        </Card.Text>
            <Card.Link href="https://mayaashokcosmos.weebly.com/">My COSMOS Website</Card.Link>
            <Card.Link href="https://docs.google.com/presentation/d/1g-c9IG3Pp1lefyNZAJGKZTeiG1UBNYWrZBcasy_z0WY/edit?usp=sharing">COSMOS Ignite Robotics Project Presentation</Card.Link>
            <Card.Link href="https://docs.google.com/document/d/1Azw_H6edJk5B6QxXsDSMu-MqPtmQl5Vhjoq0NrJRCnA/edit?usp=sharing">COSMOS Biophysics Project Report & Code</Card.Link>
            <iframe class="video"
            src="https://www.youtube.com/embed/7Z8WzSwCETs" 
            title="COSMOS Robotics Demo" 
            frameborder="0" 
            allow="encrypted-media; picture-in-picture" 
            allowfullscreen>
            </iframe>
        </Card.Body>       
    </Card>
    <Card class="card" bg={'white'} text={'dark'}>
        <Card.Header>PilotCity</Card.Header>
        <Card.Body class="cardBody">
        <Card.Title>Software Intern Team</Card.Title>
        <Card.Text class="text">
                As a part of the coding intern team, I worked on programming a blog post website in HTML, CSS, Javascript, React,
                and the Firebase NoSQL database. Additionally, I worked on designing and programming an email template creation page
                for the company's Project Development Kit for future fellows.
        </Card.Text>
            <Card.Link href="https://github.com/mayaashok/PilotCity-Website">Blog Post Website Code</Card.Link>
            <Card.Link href="https://github.com/mayaashok/PDK-ClientEmails">Email Template Code</Card.Link>
            <img class="media" src={figma} alt={'blog post figma'}/>
        </Card.Body>       
    </Card>
    </div>  
  );
}

export default Projects;