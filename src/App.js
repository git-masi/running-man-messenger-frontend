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
      <Route
        path="/"
        exact
        render={(props) => <Join {...props} title="Join" />}
      />
      <Route
        path="/chat"
        render={(props) => <Chat {...props} title="Chat" />}
      />
    </Router>
  );
}

export default App;
