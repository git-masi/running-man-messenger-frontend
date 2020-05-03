// Packages
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

// CSS
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
