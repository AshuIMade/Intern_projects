import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Loginn from "./components/Loginn.jsx";
import Overveiw from "./components/Overveiw.jsx";
import UserProfile from "./components/UserProfile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/index.css";

function App() {

  const Dashboard = () => {
    return (
      <>
        <Overveiw />
        <UserProfile />{" "}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Loginn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
