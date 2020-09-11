import React, { useState, useEffect, useContext } from "react";
import { NurseContext } from "../PersonalPage/NurseContext";
import { useHistory } from "react-router-dom";
import {
  InputLabel,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import {ServerUrl} from '../Constant'

export default function Details() {
  let history = useHistory();
  const nurseContext = useContext(NurseContext);
  const sharedPatient = nurseContext.patient;
  const [patient, setPatient] = useState({
    firstName: sharedPatient.firstName,
    lastName: sharedPatient.lastName,
    department: sharedPatient.department,
    room: sharedPatient.room,
    nurseId: sharedPatient.nurseId,
  });
  const patient_backup = {
    firstName: sharedPatient.firstName,
    lastName: sharedPatient.lastName,
    department: sharedPatient.department,
    room: sharedPatient.room,
    nurseId: sharedPatient.nurseId,
  };
  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    departmentError: false,
    roomError: false,
  });
  // const [newPatient,setNewPatient]=useState(sharedPatient);

  function firstNameOnChange(e) {
    setPatient({ ...patient, firstName: e.target.value });
    setError({ ...error, firstNameError: false });
  }
  function lastNameOnChange(e) {
    setPatient({ ...patient, lastName: e.target.value });
    setError({ ...error, lastNameError: false });
  }
  function departmentOnChange(e) {
    setPatient({ ...patient, department: e.target.value });
    setError({ ...error, departmentError: false });
  }
  function roomOnChange(e) {
    setPatient({ ...patient, room: e.target.value });
    setError({ ...error, roomError: false });
  }

  async function updatePatient() {
    const patientId = sharedPatient.patientId;
    const patientUrl = `${ServerUrl}patients/patient_${patientId}`;

    if (
      patient.firstName !== "" &&
      patient.lastName !== "" &&
      patient.department !== "" &&
      patient.room !== ""
    ) {
      const postUpdate = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      };
      fetch(patientUrl, postUpdate).then((response) => {
        if (response.ok) {
          history.push(`/patient`);
        }
      });
    } else {
      patient.firstName === "" && setError({ ...error, firstNameError: true });
      patient.lastName === "" && setError({ ...error, lastNameError: true });
      patient.department === "" &&
        setError({ ...error, departmentError: true });
      patient.room === "" && setError({ ...error, roomError: true });
    }
  }

  function reset() {
    setPatient({
      firstName: patient_backup.firstName,
      lastName: patient_backup.lastName,
      department: patient_backup.department,
      room: patient_backup.room,
    });
  }

  return (
    <>
      <div className="testPage-page">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="First Name"
              variant="outlined"
              value={patient.firstName}
              onChange={firstNameOnChange}
              type="text"
              error={error.firstNameError}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              value={patient.lastName}
              onChange={lastNameOnChange}
              type="text"
              error={error.lastNameError}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="Department"
              variant="outlined"
              value={patient.firstName}
              onChange={departmentOnChange}
              type="text"
              error={error.lastNameError}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="department"
              variant="outlined"
              value={patient.department}
              onChange={departmentOnChange}
              type="text"
              error={error.departmentError}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="Room"
              variant="outlined"
              value={patient.room}
              onChange={roomOnChange}
              type="text"
              error={error.roomError}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="Nurse Id"
              variant="outlined"
              value={patient.nurseId}
              disable={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button onClick={updatePatient} variant="contained" color="primary">
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button onClick={reset} variant="contained" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
