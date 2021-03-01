import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import CreateInfo from "./components/CreateInfo";
import ViewInfo from "./components/ViewInfo";
import EditInfo from "./components/EditInfo";
import CreateUser from "./components/CreateUser";

import NotesPage from "./components/Notes";
import CreateNote from "./components/CreateNote";
import ViewNote from "./components/ViewNote";

import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import './App.css';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Nav /> 
          {/* <Navigation /> */}
          <Navigation>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/create" component={CreateInfo} />
              <Route path="/view/:id" component={ViewInfo} />
              <Route path="/edit/:id" component={EditInfo} />
              <Route path="/user" component={CreateUser} />

              <Route path="/note" component={NotesPage} />
              <Route path="/create/note" component={CreateNote} />
              <Route path="/view/note/:id" component={ViewNote} />
            </Switch>
          </Navigation>
        </div>
      </MuiThemeProvider>
      {/* 🦆 */}
    </Router>
  );
}

export default App;
