import * as React from 'react';
import './Portfolio.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import GmSil from './graphics/GmSil.js';
import GateSeg from './graphics/GateSeg.js';
import Lassie from './graphics/Lassie.js';
import HomeScene from './graphics/HomeScene.js';

import GitHubIcon from '@mui/icons-material/GitHub';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

// Main experience: big, graphic beside the text.
const featured = {
  company: 'General Motors',
  role: 'Advanced Systems Development Intern',
  graphic: <GmSil background="transparent" />,
  description:
    'Supported simulation and validation workflows for Advanced Driver Assistance Systems (ADAS) ' +
    'in a CarMaker Software-in-the-Loop (SIL) environment. Built Python analysis tools that process and ' +
    'visualize Adaptive Cruise Control (ACC) performance data, to check how closely virtual testing ' +
    'matches real-world vehicle behavior.',
  tools: ['SiL', 'Automation', 'Python'],
};

// Everything else: one compact row each, small graphic on the left.
// graphic can be a component or an image, e.g. graphic: <img src={someImg} alt="..." />
// Leave graphic out and the row is just text, lined up on the left.
const other = [
  {
    org: 'UIUC Reliable Autonomy Lab',
    role: 'Unified Gate Segmentation Model',
    graphic: <GateSeg />,
    summary:
      'Creating one well-performing gate segmentation model + pipeline to use for all drone-racing research projects.',
    tools: ['Perception', 'Computer Vision', 'Python'],
    github: 'https://github.com/illiniaerialrobotics/unified-gate-segmentation',
  },
  {
    org: 'UIUC CMP + NCSA',
    role: 'DISSCO',
    graphic: <Lassie />,
    summary:
      'Developed GUI for a sound synthesis and composition software used by INFO 448.',
    tools: ['UI', 'C++', 'Qt'],
    github: 'https://github.com/cmp-illinois/DISSCO',
    award: {
      label: 'NCSA Fiddler Innovation Fellowship',
      url: 'https://www.ncsa.illinois.edu/2025/11/03/ncsa-awards-38-students-fiddler-innovation-fellowships/',
    },
  },
  {
    org: 'ECE 484',
    role: 'Unsafe State Enjoyers: Autonomous Drone Race',
    summary:
      'Validated PID controllers using A* and cubic spline planning in MuJoCo simulation environment, deploying them on CrazyFlie drones for autonomous flight.',
    tools: ['Control', 'Planning', 'Python'],
    website: 'https://safeautonomy-illinois-students.github.io/fa26_ece484_final_project_site_team_Unsafe_State_Enjoyers/'
  },
  {
    org: 'ECE 438',
    role: 'Espressos: TCP-like Protocol',
    summary:
      'Built reliable transport protocol on top of UDP achieving 8.92 Mbps throughput, placing 2nd on the course leaderboard.',
    tools: ['Networking', 'C'],
  },
  {
    org: 'ECE 391',
    role: 'Triple Byte: Custom OS',
    summary:
      'Built a Unix-like OS for a 64-bit RISC-V system emulated in QEMU, implementing core kernel subsystems and process management.',
    tools: ['OS', 'Embedded', 'C'],
  },
  {
    org: 'ECE 385',
    role: 'FPGA Fruit Ninja Game',
    summary:
      'Designed game as a SoC with a SPI peripheral, Microblaze USB Driver, and RTL modules.',
    tools: ['SoC', 'Embedded', 'SystemVerilog'],
    github: 'https://github.com/mayaashok/final-385-project',
  },
  {
    org: 'ECE 145',
    role: 'EchoNav: Obstacle-Avoiding Robot',
    summary:
      'Built an autonomous perimeter-navigating vehicle using ultrasonic sensors, finite-state-machine logic, and custom discrete electronics.',
    tools: ['Circuit Design', 'Oscilloscope', 'Multimeter'],
  },
  {
    org: 'WECE',
    role: 'Website Developer',
    summary:
      'Developed websites for the 24-25 infrastructure committee and 23-24 WECEHacks software team.',
    tools: ['React', 'Vercel'],
    github: 'https://github.com/uiuc-wece/wece-next-app'
  },
  
];

function Portfolio() {
  const { hash, key } = useLocation();
  useEffect(() => {
    const go = () => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    const menuOpen = document.querySelector('.navbar-collapse.show, .navbar-collapse.collapsing');
    const timer = setTimeout(go, menuOpen ? 400 : 0);
    return () => clearTimeout(timer);
  }, [hash, key]);
  return (
    <div className="page">
      <HomeScene />
      <br />
      <div className="xp-list">
        <p className="xp-company" id="work">Work Experience</p>
        <section className="xp-entry">
          <div className="xp-media">{featured.graphic}</div>
          <div className="xp-text">
            <p className="xp-company">{featured.company}</p>
            <h2 className="xp-role">{featured.role}</h2>
            <p className="xp-desc">{featured.description}</p>
            <ul className="xp-chips">
              {featured.tools.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        {other.length > 0 && (
          <section className="xp-other">
            <p className="xp-company" id="projects">Projects</p>
            {other.map((xp) => (
              <article key={xp.role} className="xp-row">
                {xp.graphic && <div className="xp-row-media">{xp.graphic}</div>}
                <div className="xp-row-text">
                  <h3>{xp.role} <span>· {xp.org}</span></h3>
                  <p>{xp.summary}</p>
                  <ul className="xp-chips small">
                    {xp.github && (
                      <li className="xp-link">
                        <a href={xp.github} target="_blank" rel="noopener noreferrer"
                           aria-label={`${xp.role} on GitHub`} title="View on GitHub">
                          <GitHubIcon fontSize="inherit" />
                        </a>
                      </li>
                    )}
                    {xp.website && (
                      <li className="xp-link">
                        <a href={xp.website} target="_blank" rel="noopener noreferrer"
                           aria-label={`${xp.role} website`} title="Visit website">
                          <LanguageRoundedIcon fontSize="inherit" />
                        </a>
                      </li>
                    )}
                    {xp.award && (
                      <li className="xp-link">
                        <a href={xp.award.url} target="_blank" rel="noopener noreferrer"
                           aria-label={xp.award.label} title={xp.award.label}>
                          <EmojiEventsRoundedIcon fontSize="inherit" />
                        </a>
                      </li>
                    )}
                    {xp.tools.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
