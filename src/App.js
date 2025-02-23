import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';  
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; // ✅ Apply class to entire document
    localStorage.setItem("theme", theme);
  }, [theme]);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <NoteState>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Alert alert={alert} />
        <div className="main-container"> {/* ✅ Add a wrapper for styling */}
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
