import React from 'react'
import {NurseContext} from '../PersonalPage/NurseContext'
import Button from '@material-ui/core/Button';

class createNewPatient extends React.Component{

static contextType=NurseContext;

constructor(props){
    super(props);
    this.state={patient:{
        firstName:'',
        lastName:'',
        room:'',
        nurseId:this.context.nurseSharedId}
    };
    this.firstNameEventHandler=this.firstNameEventHandler.bind(this);
    this.lastNameEventHandler=this.lastNameEventHandler.bind(this);
    this.roomEventHandler=this.roomEventHandler.bind(this);
    // this.nurseIdEventHandler=this.nurseIdEventHandler.bind(this);
    this.submitForm=this.submitForm.bind(this);
}
firstNameEventHandler(event){
    this.setState({patient:{...this.state.patient,firstName:event.target.value}});
}
lastNameEventHandler(event){
    this.setState({patient:{...this.state.patient,lastName:event.target.value}});
}
roomEventHandler(event){
    this.setState({patient:{...this.state.patient,room:event.target.value}});
}
// nurseIdEventHandler(event){
//     this.setState({patient:{...this.state.patient,nurseId:event.target.value}});
// }

submitForm(event){
    const url="http://localhost:8080/nurse/1/newPatient"
    fetch(url,{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.patient),
    }).then(response=>response.json);
}

render(){
    return(
        <>
            <label>First name</label>
            <input name="firstName" value={this.state.patient.firstName} onChange={this.firstNameEventHandler}/>
            <label>Last name</label>
            <input name="lastName" value={this.state.patient.lastName} onChange={this.lastNameEventHandler}/>
            <label>Room</label>
            <input name="room" value={this.state.patient.room} onChange={this.roomEventHandler}/>
            <label>NurseId</label>
            <input name="nurseId" value={this.state.patient.nurseId} disabled={true}/>
        <Button onClick={this.submitForm}>Submit</Button>
        </>
    )
}
}
export default createNewPatient;