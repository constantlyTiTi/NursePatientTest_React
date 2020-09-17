import React from "react";
import { Grid, Card, CardContent,Typography } from "@material-ui/core";
import icon_notice from '../assets/icon_notice.png';

const ProjectDescription = () => {
  return (
    <>
      <div className="NurseProfile-page">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardContent>
                <p>*  This project is an individual react practice project </p>
                <p>*  It is built for helping nurse to manage tests and patients</p>
                <p>*  After login the system, nurse can manage tests by nurse or
                by patients</p>
                <p>*	Design and build patient and test management system for nurse by using ReactJs and spring boot.</p>
                <p>*	The Frontend main features are login, register, nurse profile, patient list/details/CRUD, and test list/details/CRUD. Use React router and material UI to build pages. Use RESTfull API to get data.</p>
                <p>*  The Backend is built by spring boot JPA, maven, memory h2 database, and RESTfull controller to expose API.</p>
                <p>*  The backend is deployed to Heroku Cloud, and the frontend is deployed to GitHub (sometimes the cloud may response a little bit slow, you may have to reload the home page to login the system.</p>
                <Typography color="primary"><p>Currently, Nurse ID is the only way used to login the system.</p></Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardContent>
              <p>*  There are 1 nurse, 2 patients , 3 testItems, and 3 tests
                in the database by default</p>
                <p>*  The ID and password of the nurse are</p>
                <div style={{paddingLeft:"5%"}}>
                <p>ID:1</p>
                 <p>Password:123</p>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProjectDescription;
