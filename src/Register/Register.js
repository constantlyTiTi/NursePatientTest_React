import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { NurseContext } from "../PersonalPage/NurseContext";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
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
  //handle submit data
  async handleOnSubmit(event) {
    const url = `http://localhost:8080/register`;
    const postSubmit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.nurse),
    };
    fetch(url, postSubmit)
      .then((response) => response.json())
      .then((data) =>{
        this.context.setNurseContext("nurseSharedId", data.nurseId);
        this.props.history.push("/NurseProfile");}
      );
  }

  render() {
    return (
      <>
        <div className="NurseProfile-page">
          <Grid container spacing={2}>
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
              <Button variant="contained" onClick={this.handleOnSubmit}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
export default withRouter(Register);
