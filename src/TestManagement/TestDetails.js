import React from "react";
import {
  InputLabel,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { NurseContext } from "../PersonalPage/NurseContext";
import { withRouter } from "react-router-dom";
import {ServerUrl} from '../Constant'

class testDetails extends React.Component {
  static contextType = NurseContext;

  constructor(props) {
    super(props);
    this.state = {
      test: {
        testId: "",
        nurseId: "",
        patientId: "",
        testItemId: "",
        testResult: "",
        date: "",
      },
      backupTest:{
        testId: "",
        nurseId: "",
        patientId: "",
        testItemId: "",
        testResult: "",
        date: "",
      },
      loading:true,
      testItemloading:true,
      testItems: [],
      nurseIdError: false,
      patientIdError: false,
      dateError: false,
      testItemIdError: false,
      testResultError: false,
      patientList: [],
      patientLoading:true
    };
    this.submitForm = this.submitForm.bind(this);
    this.nurseIdEventHandler = this.nurseIdEventHandler.bind(this);
    this.patientIdEventHandler = this.patientIdEventHandler.bind(this);
    this.dateEventHandler = this.dateEventHandler.bind(this);
    this.reset = this.reset.bind(this);
    this.testItemIdEventHandler = this.testItemIdEventHandler.bind(this);
    this.testResultEventHandler = this.testResultEventHandler.bind(this);
  }
  //Get testInfor and testItem options and patient options
  async componentDidMount() {
    let testId = this.context.test.testId;
    const url = `${ServerUrl}tests/testId_${testId}`;
    const response = await fetch(url);
    const data = await response.json();
    if(response.ok){
    this.setState({ test: data,backupTest:data,loading:false });}

    const testItemUrl = `${ServerUrl}TestItem/AllTestItems`;
    const testItemResponse = await fetch(testItemUrl);
    const testItemData = await testItemResponse.json();
    if(testItemResponse.ok){
    this.setState({ testItems: testItemData, testItemloading: false });}

    const patientUrl = `${ServerUrl}nurse/${this.context.nurseSharedId}/patients`;
    const patientResponse = await fetch(patientUrl);
    const patientData = await patientResponse.json();
    if(patientResponse.ok){
    this.setState({ patientList: patientData, patientLoading: false });}
  }
  //handle data
  nurseIdEventHandler(e) {
    this.setState({
      test: { ...this.state.test, nurseId: e.target.value },
      nurseIdError: false,
    });
  }
  patientIdEventHandler(e) {
    this.setState({
      test: { ...this.state.test, patientId: e.target.value },
      patientIdError: false,
    });
  }
  dateEventHandler(e) {
    this.setState({
      test: { ...this.state.test, date: e.target.value },
      dateError: false,
    });
  }
  testItemIdEventHandler(e) {
    this.setState({
      test: { ...this.state.test, testItemId: e.target.value },
      testItemIdError: false,
    });
  }

  testResultEventHandler(e) {
    this.setState({
      test: { ...this.state.test, testResult: e.target.value },
      testResultError: false,
    });
  }
  //handle button function
  submitForm() {
    let testId = this.context.test.testId;
    if (
      this.state.test.nurseId !== "" &&
      this.state.test.patientId !== "" &&
      this.state.test.date !== "" &&
      this.state.test.testItemId !== "" &&
      this.state.test.testResult !== ""
    ) {
      const url = `${ServerUrl}tests/testId_${testId}`;
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.test),
      }).then((response) => {
        if(response.ok){
        this.context.setNurseContext("searchMethod", "all");
        this.props.history.push(`alltests`);}
      });
    } else {
      this.state.test.nurseId === "" && this.setState({ nurseIdError: true });
      this.state.test.patientId === "" &&
        this.setState({ patientIdError: true });
      this.state.test.date === "" && this.setState({ dateError: true });
      this.state.test.testItemId === "" &&
        this.setState({ testItemIdError: true });
      this.state.test.testResult === "" &&
        this.setState({ testResultError: true });
    }
  }
  reset() {
    this.setState({
      test: this.state.backupTest
    });
  }

  render() {

    return (
      <>
        <div className="testPage-page">
          {this.state.loading ||this.state.testItemloading||this.state.patientLoading ||this.state.testItems.length === 0 ? (
            <div>loading...</div>
          ) : (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    name="nurseId"
                    label="Test is done by Nurse Id"
                    variant="outlined"
                    value={this.state.test.nurseId}
                    onChange={this.nurseIdEventHandler}
                    type="text"
                    error={this.state.nurseIdError}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl variant="outlined" className="createTest-select">
                    <InputLabel>Patient Id</InputLabel>
                    <Select
                      error={this.state.patientIdError}
                      id="patientId"
                      value={this.state.test.patientId}
                      label="Patient Id"
                      onChange={this.patientIdEventHandler}
                    >
                      {this.state.patientList.length > 0 ? (
                        this.state.patientList.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.patientId}>
                              {`${item.patientId} ${item.firstName} ${item.lastName}`}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem value={""}>None</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl variant="outlined" className="createTest-select">
                    <InputLabel>Test Item</InputLabel>
                    <Select
                      error={this.state.testItemIdError}
                      id="testItemId"
                      value={this.state.test.testItemId}
                      label="Test Item"
                      onChange={this.testItemIdEventHandler}
                    >
                      {this.state.testItems.map((item, index) => {
                        console.log("this.state.testItemId",this.state.testItemId)
                        console.log("loadITemId",item.itemId)
                        return (
                          <MenuItem key={index} value={item.itemId}>
                            {item.itemName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    error={this.state.testResultError}
                    type="text"
                    name="testResult"
                    variant="outlined"
                    label="Test Result"
                    value={this.state.test.testResult}
                    onChange={this.testResultEventHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    error={this.state.dateError}
                    type="date"
                    name="date"
                    variant="outlined"
                    value={this.state.test.date.split("T",1)}
                    onChange={this.dateEventHandler}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button color="primary" onClick={this.submitForm}>
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button color="secondary" onClick={this.reset}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </>
    );
  }
}
export default withRouter(testDetails);
