import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { NurseContext } from "../PersonalPage/NurseContext";
import { withRouter } from "react-router-dom";
import {SERVER_URL} from '../Constant'

class CreateNewTest extends React.Component {
  static contextType = NurseContext;
  constructor(props) {
    super(props);
    this.state = {
      test: {
        nurseId: "",
        patientId: "",
        date: "",
        testItemId: "",
        testResult: "",
      },
      testItems: [],
      loading: true,
      patientList: [],
      patientLoading: true,
      nurseIdError: false,
      patientIdError: false,
      dateError: false,
      testItemIdError: false,
      testResultError: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.nurseIdEventHandler = this.nurseIdEventHandler.bind(this);
    this.patientIdEventHandler = this.patientIdEventHandler.bind(this);
    this.dateEventHandler = this.dateEventHandler.bind(this);
    this.cancel = this.cancel.bind(this);
    this.testItemIdEventHandler = this.testItemIdEventHandler.bind(this);
    this.testResultEventHandler = this.testResultEventHandler.bind(this);
  }

  //Get Test Item Options and the Patients of current Nurse
  async componentDidMount() {
    const url = `${SERVER_URL}TestItem/AllTestItems`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ testItems: data, loading: false });

    const patientUrl = `${SERVER_URL}nurse/${this.context.nurseSharedId}/patients`;
    const patientResponse = await fetch(patientUrl);
    const patientData = await patientResponse.json();
    this.setState({ patientList: patientData, patientLoading: false });

    this.context.setNurseContext("searchMethod", "");
    this.context.setNurseContext("searchValue", "");
  }

  //Handle button function
  submitForm() {
      //check if all the fields are provided
    if (
      this.state.test.nurseId !== "" &&
      this.state.test.patientId !== "" &&
      this.state.test.date !== "" &&
      this.state.test.testItemId !== "" &&
      this.state.test.testResult !== ""
    ) {
      const url = `${SERVER_URL}newTest`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.test),
      }).then((response) => {
          debugger
        if (response.ok) {
          //if response.ok then set the search Method
          if (this.state.test.nurseId !== this.context.nurseSharedId) {
            this.context.setNurseContext("searchMethod", "patientId");
            this.context.setNurseContext(
              "searchValue",
              this.state.test.patientId
            );
          } else {
            this.context.setNurseContext("searchMethod", "all");
          } //End searchMethod set
          this.props.history.push(`alltests`);
        }
      });//End data fetch
    } 
    else {
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
  cancel() {
    this.setState({
      test: {
        nurseId: "",
        patientId: "",
        date: "",
        testItemId: "",
        testResult: "",
      },
      nurseIdError: true,
      patientIdError: true,
      dateError: true,
      testItemIdError: true,
      testResultError: true,
    });
  }

  //Handle Data onChange
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

  render() {
    return (
      <>
        <div className="testPage-page">
          {this.state.loading || this.state.testItems.length === 0 ? (
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
                      value={this.state.testItemId}
                      label="Test Item"
                      onChange={this.testItemIdEventHandler}
                    >
                      {this.state.testItems.map((item, index) => {
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
                    value={this.state.test.date}
                    onChange={this.dateEventHandler}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button onClick={this.submitForm} color="primary">
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button onClick={this.cancel} color="secondary">
                    Cancel
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

export default withRouter(CreateNewTest);
