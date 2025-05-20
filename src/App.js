import Home from './Home.js';
import { Route, Routes } from "react-router-dom";

import './App.css';
import Navbar from './Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
