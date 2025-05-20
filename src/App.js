import Home from './Home.js';
import { Route, Routes } from "react-router-dom";

import Animation from './Animation.js';
import './App.css';
import Navbar from './Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Animation/>
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
