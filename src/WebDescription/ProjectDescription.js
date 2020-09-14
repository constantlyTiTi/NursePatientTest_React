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
                <p>*  Database is h2 database</p>
                <p>*  Backend is built by spring-boot, and it is deployed on
                Alibaba cloud</p>
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardContent>
              <Typography color="secondary">
                <p>As the server is using a free SSL invalid certificate, you will be not able to use login for the first time.</p>
                <p>Please start a new page and go to https://47.88.53.81:8443/</p>
                <p>then for chrome, just simply type thisisunsafe on the page</p>
                <p>for safari, click visit website in the advance</p>
                <p>then you will be able to use the functions of this web page.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProjectDescription;