import React from 'react';
import './App.css';
import Footer from './Components/Footer';
import Headers from './Components/Headers';
import Main from './Components/Main';
import Settings from './Components/Settings';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/adminsetting" element={<Settings />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
