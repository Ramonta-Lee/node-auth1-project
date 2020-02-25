import React from "react";
import Login from "./components/Login.js";
import "./App.css";
import Register from "./components/Register.js";

function App() {
  return (
    <div className="App">
      <h2>Register Form</h2>
      <Register />
      <h2>Login Form</h2>
      <Login />
    </div>
  );
}

export default App;
