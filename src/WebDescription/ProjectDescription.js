import React from "react";
import { Grid, Card, CardContent,Avatar } from "@material-ui/core";
import icon_information from '../assets/icon_information.png';
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
                <p>*  It is built for helping nurse manage tests and patients</p>
                <p>*  After login the system, nurse can manage tests by nurse or
                by patients</p>
                <p>*  Database is H2 database</p>
                <p>*  Backend is built by spring-boot, and it is deployed on
                Alibaba cloud</p>
                <p><Avatar src={icon_notice}/>Currently, Nurse ID is the only way used to login the system.</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardContent>
                *  There are 1 nurse, 2 patients , 3 testItems, and 3 tests
                in the database by default<br/>
                *  The ID and password of the nurse are<br/>
                       ID:1<br/>
                       Password:123
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProjectDescription;
