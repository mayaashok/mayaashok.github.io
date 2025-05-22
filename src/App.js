import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home.js';
import Resume from './Resume.js';
import Projects from './Projects.js';

import './App.css';
import Navbar from './Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/resume" element={<Resume/>} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
    </div>
  );
}

export default App;
