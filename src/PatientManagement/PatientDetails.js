import React, { useState, useEffect, useContext }from 'react'
import {NurseContext} from '../PersonalPage/NurseContext'
import{useParams} from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default function Details(){

// let { id } = useParams();
const nurseContext=useContext(NurseContext);
const sharedPatient=nurseContext.patient;
const [patient,setPatient]= useState({
    firstName:sharedPatient.firstName,
    lastName:sharedPatient.lastName,
    department:sharedPatient.department,
    room:sharedPatient.room,
    nurseId:sharedPatient.nurseId
}); 
// const [newPatient,setNewPatient]=useState(sharedPatient);

function firstNameOnChange(e){
    setPatient({...patient,firstName:e.target.value});
}
function lastNameOnChange(e){
    setPatient({...patient,lastName:e.target.value});
}
function departmentOnChange(e){
    setPatient({...patient,department:e.target.value});
}
function roomOnChange(e){
    setPatient({...patient,room:e.target.value});
}
function nurseIdOnChange(e){
    setPatient({...patient,nurseId:e.target.value});
}

async function updatePatient(){
    const patientId=sharedPatient.patientId;
    const url=`http://localhost:8080/patients/patient_${patientId}`;
    const postUpdate={
        method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
    }
    fetch(url,postUpdate).then(response=>response.json());
}



// useEffect(()=>{

//     async function fetchData(){
//     const patientId=nurseContext.patient;
//     console.log(patientId);
//     console.log(id);
//     const url=`http://localhost:8080/patient/${patientId}`;
//     const response=await fetch(url);
//     const data=await response.json();
//     setPatient(data);
//     }
//     fetchData();
    
// },[]);

return(
    <>
    <label>First Name</label>
    <input value={patient.firstName} onChange={firstNameOnChange}/>
    <label>Last Name</label>
    <input value={patient.lastName} onChange={lastNameOnChange}/>
    <label>Department</label>
    <input value={patient.department} onChange={departmentOnChange}/>
    <label>Room</label>
    <input value={patient.room} onChange={roomOnChange}/>
    <label>Nurse ID</label>
    <input value={patient.nurseId} onChange={nurseIdOnChange}/>
    <Button onClick={updatePatient}variant="contained">Submit</Button>
    </>
)
}


