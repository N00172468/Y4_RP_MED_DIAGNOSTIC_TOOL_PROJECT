import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Nav from "./components/Nav";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
// import EditInfo from "./components/EditInfo";
// import CreateInfo from "./components/CreateInfo";
// import CreateUser from "./components/CreateUser";
import { MuiThemeProvider } from "@material-ui/core/styles";


import theme from "./theme";
import './App.css';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          {/* <Nav />  */}
          {/* 🦆 */}
          <Navigation>
            <Switch>
              <Route path="/" exact component={Homepage} />
              {/* <Route path="/edit/:id" component={EditInfo} />
              <Route path="/create" component={CreateInfo} />
              <Route path="/user" component={CreateUser} /> */}
            </Switch>
          </Navigation>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
