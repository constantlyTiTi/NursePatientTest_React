import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { NurseContext } from "../PersonalPage/NurseContext";
import { Grid, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

class testPage extends React.Component {
  static contextType = NurseContext;

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.searchTestByPatient = this.searchTestByPatient.bind(this);
    this.createTest = this.createTest.bind(this);
    this.showAllTest = this.showAllTest.bind(this);
  }

  componentDidMount() {
    this.context.setNurseContext("searchValue", "");
  }

  handleOnChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  createTest() {
    this.props.history.push(`${this.props.match.url}/createnewtest`);
  }
  searchTestByPatient(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.props.history.push(`${this.props.match.url}/alltests`);
      this.context.setNurseContext("searchMethod", "patientId");
      this.context.setNurseContext("searchValue", this.state.searchValue);
    }
  }

  showAllTest() {
    console.log(this.props.match)
    this.props.history.push(`${this.props.match.url}/alltests`);
    this.context.setNurseContext("searchMethod", "all");
  }

  render() {
    return (
      <>
        <div className="NurseProfile-page">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <SearchIcon />
              <InputBase
                variant="outlined"
                placeholder="Search by Patient Id"
                name="searchByPatientId"
                onChange={this.handleOnChange}
                onKeyPress={this.searchTestByPatient}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button variant="contained" onClick={this.createTest}>
                Create New Test
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button variant="contained" onClick={this.showAllTest}>
                Find All Tests By Nurse
              </Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withRouter(testPage);
