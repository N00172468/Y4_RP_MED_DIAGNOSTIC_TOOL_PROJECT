import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
// import Homepage from "./components/Homepage";
// import EditInfo from "./components/EditInfo";
// import CreateInfo from "./components/CreateInfo";
// import CreateUser from "./components/CreateUser";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        {/* <Route path="/" exact component={Homepage} />
        <Route path="/edit/:id" component={EditInfo} />
        <Route path="/create" component={CreateInfo} />
        <Route path="/user" component={CreateUser} /> */}
      </div>
    </Router>
  );
}

export default App;
