import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import NavigationBar from "./NavigationBar/NavigationBar";
import { Switch, Route,withRouter } from "react-router-dom";
import Login from "./Login/Login";
import ProjectDescription from "./WebDescription/ProjectDescription";
import { NurseContext } from "./PersonalPage/NurseContext";
// import PersonalPage from "./PersonalPage/PersonalPage";
import { AppBar, Typography, Box, Toolbar, Grid,CardMedia } from "@material-ui/core";
import Profile from "./PersonalPage/NurseProfile";

import TestPage from "./TestManagement/TestPage";
import PatientListPage from "./PatientManagement/PatientListPage";
import TestDetails from "./TestManagement/TestDetails";
import CreateNewTest from "./TestManagement/CreateNewTest";
import TestListPage from "./TestManagement/TestListPage";
import CreateNewPatient from "./PatientManagement/CreateNewPatient";
import PatientDetails from "./PatientManagement/PatientDetails";
import Logout from "./Logout/Logout";
import Register from './Register/Register';
import HeaderBackground from './assets/SignIn_background.jpg'

const navHeader = [
  {
    name: "Home Page",
    to: "",
    typoClass: "App-NavHeader-typo",
    buttonClass: "HomePage-Button",
  },
  {
    name: "Login",
    to: "login",
    typoClass: "App-NavHeader-typo",
    buttonClass: "",
  },
  {
    name: "Register",
    to: "register",
    typoClass: "App-NavHeader-typo",
    buttonClass: "",
  },
];
const routerMapping = [
  {
    name: "Profile",
    to: "nurseprofile",
    typoClass: "App-NavHeader-typo",
  },
  { name: "Tests", to: "test", typoClass: "App-NavHeader-typo" },
  {
    name: "Patients",
    to: "patient",
    typoClass: "App-NavHeader-typo",
  },
];
const logoutRouterMapping = {
  name: "Logout",
  to: "",
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
        const url=this.props.match.url;
    return navHeader.map((item, index) => (
      <NavigationBar
        key={index}
        name={item.name}
        click={`${url}${item.to}`}
        // click={item.to}
        buttonClass={item.buttonClass}
        typoClass={item.typoClass}
      />
    ));
  };

  //after Login AppBar items
  setAppBarAfterLogin = () => {
    const url=this.props.match.url;
    return routerMapping.map((item, index) => {
      return (
        <Grid key={index} container item xs={12} sm={6} lg={3} md={3}>
          <NavigationBar
            key={index}
            name={item.name}
            click={`${url}${item.to}`}
            typoClass={item.typoClass}
          />
        </Grid>
      );
    });
  };

  //switch AppBar by Login and Logout
  setAppBar = (value) => {
    let item = logoutRouterMapping;
    const url=this.props.match.url;
    if (value.nurseSharedId === "") {
      return this.setAppBarBeforeLogin();
    } else {
      return (
        <>
          {this.setAppBarAfterLogin()}
          <Logout name={item.name} to={`${url}${item.to}`} typoClass={item.typoClass} />
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
    const path=this.props.match.path;
    return (
      <>
        <header >
          <CardMedia className="header-css" image={HeaderBackground} alt="header image"> Test Management System for Nurses</CardMedia>
         </header>
        <NurseContext.Provider value={this.state}>
          <body className="App-body">
              <AppBar position="sticky">
                <Toolbar>
                  <NurseContext.Consumer>
                    {(value) => {
                      return this.setAppBar(value);
                    }}
                  </NurseContext.Consumer>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route exact path={`${path}`}>
                  <ProjectDescription />
                </Route>
                <Route exact path={`${path}login`}>
                  <Login parentPath={path}/>
                </Route>
                <Route exact path={`${path}register`}>
                  <Register />
                </Route>
                <Route exact path={`${path}test`}>
                  <TestPage />
                </Route>
                <Route exact path={`${path}nurseprofile`}>
                  {this.profilePage()}
                </Route>
                <Route exact path={`${path}patient`}>
                  <PatientListPage />
                </Route>
                <Route exact path={`${path}test/testdetails`}>
                  <TestDetails />
                </Route>
                <Route exact path={`${path}test/createnewtest`}>
                  <CreateNewTest />
                </Route>
                <Route exact path={`${path}test/alltests`}>
                  <TestListPage />
                </Route>
                <Route exact path={`${path}test/createnewtest/alltests`}>
                  <TestListPage />
                </Route>
                <Route exact path={`${path}patient/createnewpatient`}>
                  <CreateNewPatient />
                </Route>
                <Route path={`${path}patient/:id`}>
                  <PatientDetails />
                </Route>
              </Switch>
          </body>
        </NurseContext.Provider>
        <footer>
          <Box mt={8}>{this.copyright()}</Box>
        </footer>
      </>
    );
  }
}
export default withRouter(App);
