import React from 'react'
import { InputLabel,TextField,Grid } from '@material-ui/core';
import {NurseContext} from '../PersonalPage/NurseContext'

class testDetails extends React.Component{

    static contextType=NurseContext;

    constructor(props){
        super(props);
        this.state={
            test:{
                testId:"",
                nurseId:"",
                patientId:"",
                testItem:"",
                date:""
            }
        }
    }

    async componentDidMount(){
        console.log(this.context);
        let testId=this.context.test.testId;
        const url=`http://localhost:8080/tests/testId_${testId}`
        const response=await fetch(url);
        const data=await response.json();
        this.setState({test:data});

    }

    render(){
    return(
        <>
        <Grid container >
        <form>
            <Grid  item xs={12} sm={12} md={6} lg={6}>
            <TextField id="input_nurseId" variant="outlined" label="Nurse Id" value={this.state.test.nurseId} name="nurseId" type="text" required={true}/>
            </Grid>
            <Grid  item xs={12} sm={12} md={6} lg={6}>
            <TextField id="input_patientId" variant="outlined" label="Patient Id" value={this.state.test.patientId} name="patientId" type="text" required={true}/>
            </Grid>
            <InputLabel>Test Item</InputLabel>
            {/* {this.state.testList.map((item,index)=><Input value={item} key={index} name={"testItem: "+item} type="text" required={true}/>)} */}
            <TextField id="input_testDate" variant="outlined" label="Test Date" value={this.state.test.date} name="date" type="dateTime" required={true}/>
        </form>
        </Grid>
        </>
        )
    }
}
export default testDetails;