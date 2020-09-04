import React from 'react';

class CreateNewTest extends React.Component{
    constructor(props){
        super(props);
        this.state={test:{
            nurseId:'',
            patientId:'',
            date:''
        }};
        this.submitForm=this.submitForm.bind(this);
        this.nurseIdEventHandler=this.nurseIdEventHandler.bind(this);
        this.patientIdEventHandler=this.patientIdEventHandler.bind(this);
        this.dateEventHandler=this.dateEventHandler.bind(this);
    }
    submitForm(){
        const url="http://localhost:8080/newTest"
        fetch(url,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.test),
        }).then(response=>response.json());
    }

    testItemsEventHandler(e){

    }

    nurseIdEventHandler(e){
        this.setState({test:{...this.state.test,nurseId:e.target.value}});
    }
    patientIdEventHandler(e){
        this.setState({test:{...this.state.test,patientId:e.target.value}});
    }
    dateEventHandler(e){
        this.setState({test:{...this.state.test,date:e.target.value}});
    }

    render(){
        console.log(this);
        return(
            <>
                <label>Nurse Id</label>
                <input name="nurseId" value={this.state.test.nurseId} onChange={this.nurseIdEventHandler} type="text"/>
                <label>Patient Id</label>
                <input name="patientId" value={this.state.test.patientId} onChange={this.patientIdEventHandler} type="text"/>
                <label>Date</label>
                <input type="date" name="date" value={this.state.test.date} onChange={this.dateEventHandler}/>
                <button onClick={this.submitForm}>Submit</button>                
            </>
        );
    }
}

export default CreateNewTest;