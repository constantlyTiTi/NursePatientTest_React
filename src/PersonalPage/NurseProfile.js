import React from "react";
import { NurseContext } from "./NurseContext";
import { TextField, Grid, Button,CircularProgress } from "@material-ui/core";
import {SERVER_URL} from '../Constant' 
// const NurseIdContext = React.createContext(1);
export default class NurseProfile extends React.Component {
  static contextType = NurseContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nurse: {
        firstname: "",
        lastname: "",
        department: "",
        password: "",
      },
    };
    this.firstnameHandleChange = this.firstnameHandleChange.bind(this);
    this.lastnameHandleChange = this.lastnameHandleChange.bind(this);
    this.passwordHandleChange = this.passwordHandleChange.bind(this);
    this.departmentHandleChange = this.departmentHandleChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  //fetch data
  async componentDidMount() {
    const sharedNurseId = this.context.nurseSharedId;
    const url = `${SERVER_URL}nurse/${sharedNurseId}`;

    console.log("context",this.context);
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, nurse: data });
  }

  //handle data update
  firstnameHandleChange(event) {
    this.setState({
      nurse: { ...this.state.nurse, firstname: event.target.value },
    });
  }
  lastnameHandleChange(event) {
    this.setState({
      nurse: { ...this.state.nurse, lastname: event.target.value },
    });
  }
  passwordHandleChange(event) {
    this.setState({
      nurse: { ...this.state.nurse, password: event.target.value },
    });
  }
  departmentHandleChange(event) {
    this.setState({
      nurse: { ...this.state.nurse, department: event.target.value },
    });
  }
  //handle submit updated data
  async handleOnSubmit(event) {
    const sharedNurseId = this.context.nurseSharedId;
    const url = `${SERVER_URL}nurse/${sharedNurseId}`;
    const postUpdate = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.nurse),
    };
    fetch(url, postUpdate).then((response) => response.json());
  }

  render() {
    return (
        <>
      <div className="NurseProfile-page">
          {this.state.loading || !this.state.nurse ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="text"
                  name="nurseId"
                  label="Nurse ID"
                  variant="outlined"
                  value={this.context.nurseSharedId}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="text"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={this.state.nurse.firstname}
                  onChange={this.firstnameHandleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="text"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={this.state.nurse.lastname}
                  onChange={this.lastnameHandleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="text"
                  name="department"
                  label="Department"
                  variant="outlined"
                  value={this.state.nurse.department}
                  onChange={this.departmentHandleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="text"
                  name="password"
                  label="password"
                  variant="outlined"
                  value={this.state.nurse.password}
                  onChange={this.passwordHandleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>
                  Save Changes
                </Button>
              </Grid>
              </Grid>
          )}

      </div>
      </>
    );
  }
}
