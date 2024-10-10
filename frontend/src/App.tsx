import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />{" "}
        {/* Redirect to Login */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
