import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Navigation from "./components/Navigation";

import CreateUser from "./components/CreateUser";

import Homepage from "./components/Homepage";
import CreateInfo from "./components/CreateInfo";
import ViewInfo from "./components/ViewInfo";
import EditInfo from "./components/EditInfo";

import NotesPage from "./components/Notes";
import CreateNote from "./components/CreateNote";
import ViewNote from "./components/ViewNote";

import BookmarksPage from "./components/BookmarksPage";
import SymptomsPage from "./components/Symptoms"

import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import './App.css';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          {/* Navigation Components */}
          <Nav /> 
          <Navigation>

            <Switch>
              {/* Symptoms Information Components */}
              <Route path="/" exact component={Homepage} />
              <Route path="/create" component={CreateInfo} />
              <Route path="/view/:id" component={ViewInfo} />
              <Route path="/edit/:id" component={EditInfo} />
              <Route path="/user" component={CreateUser} />

              {/* Notes Components */}
              <Route path="/notes" component={NotesPage} />
              <Route path="/create/note" component={CreateNote} />
              <Route path="/note/:id" component={ViewNote} />
              
              {/* Bookmark Component */}
              <Route path="/bookmarks" component={BookmarksPage} />

              {/* Testing API Component */}
              <Route path="/symptom" component={SymptomsPage} />
            </Switch>
          </Navigation>
        </div>
      </MuiThemeProvider>
      {/* 🦆 */}
    </Router>
  );
}

export default App;
