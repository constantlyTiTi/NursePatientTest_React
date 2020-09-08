import React from "react";
import { NurseContext } from "../PersonalPage/NurseContext";
import { TextField, Grid, Button } from "@material-ui/core";

class createNewPatient extends React.Component {
  static contextType = NurseContext;

  constructor(props) {
    super(props);
    this.state = {
      patient: {
        firstName: "",
        lastName: "",
        room: "",
        nurseId: "",
        department:""
      },
    };
    this.firstNameEventHandler = this.firstNameEventHandler.bind(this);
    this.lastNameEventHandler = this.lastNameEventHandler.bind(this);
    this.roomEventHandler = this.roomEventHandler.bind(this);
    this.departmentEventHandler=this.departmentEventHandler.bind(this);
    // this.nurseIdEventHandler=this.nurseIdEventHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
    this.setState({
      patient: { ...this.state.patient, nurseId: this.context.nurseSharedId },
    });
  }
  firstNameEventHandler(event) {
    this.setState({
      patient: { ...this.state.patient, firstName: event.target.value },
    });
  }
  lastNameEventHandler(event) {
    this.setState({
      patient: { ...this.state.patient, lastName: event.target.value },
    });
  }
  roomEventHandler(event) {
    this.setState({
      patient: { ...this.state.patient, room: event.target.value },
    });
  }
  departmentEventHandler(event) {
    this.setState({
      patient: { ...this.state.patient, department: event.target.value },
    });
  }
  // nurseIdEventHandler(event){
  //     this.setState({patient:{...this.state.patient,nurseId:event.target.value}});
  // }

  submitForm(event) {
    const url = "http://localhost:8080/nurse/1/newPatient";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.patient),
    }).then((response) => response.json);
  }

  render() {
    return (
      <>
        <div className="NurseProfile-page">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="firstName"
                variant="outlined"
                label="First Name"
                value={this.state.patient.firstName}
                onChange={this.firstNameEventHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="lastName"
                variant="outlined"
                label="Last Name"
                value={this.state.patient.lastName}
                onChange={this.lastNameEventHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="room"
                variant="outlined"
                label="Room"
                value={this.state.patient.room}
                onChange={this.roomEventHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="nurseId"
                variant="outlined"
                label="Nurse ID"
                value={this.state.patient.nurseId}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="department"
                variant="outlined"
                label="Department"
                value={this.state.patient.department}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button onClick={this.submitForm}>Submit</Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
export default createNewPatient;
