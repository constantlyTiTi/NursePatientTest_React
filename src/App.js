import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import NavigationBar from "./NavigationBar/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import ProjectDescription from "./WebDescription/ProjectNavigation";
import { NurseContext } from "./PersonalPage/NurseContext";
// import PersonalPage from "./PersonalPage/PersonalPage";
import { AppBar, Typography, Box, Toolbar, Grid } from "@material-ui/core";
import Profile from "./PersonalPage/NurseProfile";
import Calender from "./PersonalPage/Calender";

import TestPage from "./TestManagement/TestPage";
import PatientListPage from "./PatientManagement/PatientListPage";
import TestDetails from "./TestManagement/TestDetails";
import CreateNewTest from "./TestManagement/CreateNewTest";
import TestListPage from "./TestManagement/TestListPage";
import CreateNewPatient from "./PatientManagement/CreateNewPatient";
import PatientDetails from "./PatientManagement/PatientDetails";
import Logout from "./Logout/Logout";
import Register from './Register/Register';
const navHeader = [
  {
    name: "Home Page",
    to: "/",
    typoClass: "App-NavHeader-typo",
    buttonClass: "HomePage-Button",
  },
  {
    name: "Login",
    to: "/Login",
    typoClass: "App-NavHeader-typo",
    buttonClass: "",
  },
  {
    name: "Register",
    to: "/Register",
    typoClass: "App-NavHeader-typo",
    buttonClass: "",
  },
];
const routerMapping = [
  {
    name: "Profile",
    to: "/NurseProfile",
    typoClass: "App-NavHeader-typo",
  },
  { name: "Tests", to: "/TestPage", typoClass: "App-NavHeader-typo" },
  {
    name: "Patients",
    to: "/PatientListPage",
    typoClass: "App-NavHeader-typo",
  },
];
const logoutRouterMapping = {
  name: "Logout",
  to: "/",
  typoClass: "App-NavHeader-typo",
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      nurseSharedId: "",
      patient: {},
      test: {},
      setNurseContext: (key, value) => {
        this.setState({ [key]: value });
      },
    };
  }

  //Before Login AppBar items
  setAppBarBeforeLogin = () => {
    console.log("login")
    return navHeader.map((item, index) => (
      <NavigationBar
        key={index}
        name={item.name}
        click={item.to}
        buttonClass={item.buttonClass}
        typoClass={item.typoClass}
      />
    ));
  };

  //after Login AppBar items
  setAppBarAfterLogin = () => {
    return routerMapping.map((item, index) => {
      return (
        <Grid key={index} container item xs={12} sm={6} lg={3} md={3}>
          <NavigationBar
            key={index}
            name={item.name}
            click={item.to}
            typoClass={item.typoClass}
          />
        </Grid>
      );
    });
  };

  //switch AppBar by Login and Logout
  setAppBar = (value) => {
    let item = logoutRouterMapping;
    if (value.nurseSharedId === "") {
      return this.setAppBarBeforeLogin();
    } else {
      return (
        <>
          {this.setAppBarAfterLogin()}
          <Logout name={item.name} to={item.to} typoClass={item.typoClass} />
        </>
      );
    }
  };

  //footer
  copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        TingLi Website{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  //profileBody
  profilePage = () => (
    <Grid container spacing={3} style={{paddingLeft:"10%"}}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Profile />
      </Grid>
    </Grid>
  );

  render() {
    return (
      <>
        <header>Nurse Patient Tests Management System</header>
        <NurseContext.Provider value={this.state}>
          <body className="App-body">
            <Router>
              <AppBar position="static">
                <Toolbar>
                  <NurseContext.Consumer>
                    {(value) => {
                      return this.setAppBar(value);
                    }}
                  </NurseContext.Consumer>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route exact path="/">
                  <ProjectDescription />
                </Route>
                <Route exact path="/Login">
                  <Login />
                </Route>
                <Route exact path="/Register">
                  <Register />
                </Route>
                <Route exact path="/TestPage">
                  <TestPage />
                </Route>
                <Route exact path="/NurseProfile">
                  {this.profilePage()}
                </Route>
                <Route exact path="/PatientListPage">
                  <PatientListPage />
                </Route>
                <Route exact path="/TestManagement/TestDetails">
                  <TestDetails />
                </Route>
                <Route exact path="/TestManagement/createNewTest">
                  <CreateNewTest />
                </Route>
                <Route exact path="/TestManagement/testListPage">
                  <TestListPage />
                </Route>
                <Route exact path="/TestManagement/allTestListPage">
                  <TestListPage />
                </Route>
                <Route exact path="/PatientManagement/createNewPatient">
                  <CreateNewPatient />
                </Route>
                <Route path="/PatientManagement/Patient/:id">
                  <PatientDetails />
                </Route>
              </Switch>
            </Router>
          </body>
        </NurseContext.Provider>
        <footer>
          <Box mt={8}>{this.copyright()}</Box>
        </footer>
      </>
    );
  }
}
export default App;
