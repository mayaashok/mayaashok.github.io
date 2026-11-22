import { Route, Routes, Navigate } from "react-router-dom";
import Home from './deprecated/Home.js';
import Resume from './deprecated/Resume.js';
import Projects from './deprecated/Projects.js';
import Work from './deprecated/Work.js';
import Portfolio from './Portfolio.js';

import './App.css';
import Navbar from './Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/portfolio" />} />
        {/* <Route path="/home" element={<Home/>} />
        <Route path="/resume" element={<Resume/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/work" element={<Work/>} /> */}
        <Route path="/portfolio" element={<Portfolio/>} />
      </Routes>
    </div>
  );
}

export default App;
