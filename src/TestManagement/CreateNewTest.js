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

class CreateNewTest extends React.Component {
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
    };
    this.submitForm = this.submitForm.bind(this);
    this.nurseIdEventHandler = this.nurseIdEventHandler.bind(this);
    this.patientIdEventHandler = this.patientIdEventHandler.bind(this);
    this.dateEventHandler = this.dateEventHandler.bind(this);
    this.cancel = this.cancel.bind(this);
    this.testItemIdEventHandler = this.testItemIdEventHandler.bind(this);
    this.testResultEventHandler = this.testResultEventHandler.bind(this);
  }
  //Handle button function
  submitForm() {
    const url = "http://localhost:8080/newTest";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.test),
    }).then((response) => response.json());
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
    });
  }
//Get Test Item Options
  async componentDidMount() {
    const url = "http://localhost:8080/TestItem/AllTestItems";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ testItems: data, loading: false });
  }

  testItemsEventHandler(e) {}

  nurseIdEventHandler(e) {
    this.setState({ test: { ...this.state.test, nurseId: e.target.value } });
  }
  patientIdEventHandler(e) {
    this.setState({ test: { ...this.state.test, patientId: e.target.value } });
  }
  dateEventHandler(e) {
    this.setState({ test: { ...this.state.test, date: e.target.value } });
  }
  testItemIdEventHandler(e) {
    this.setState({ test: { ...this.state.test, testItemId: e.target.value } });
    console.log(e.target.value);
  }

  testResultEventHandler(e) {
    this.setState({ test: { ...this.state.test, testResult: e.target.value } });
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
                    label="Nurse Id"
                    variant="outlined"
                    value={this.state.test.nurseId}
                    onChange={this.nurseIdEventHandler}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    name="patientId"
                    label="Patient Id"
                    variant="outlined"
                    value={this.state.test.patientId}
                    onChange={this.patientIdEventHandler}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl variant="outlined" className="createTest-select">
                    <InputLabel>Test Item</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
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
                  <Button onClick={this.submitForm}>Submit</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button onClick={this.cancel}>Cancel</Button>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </>
    );
  }
}

export default CreateNewTest;
