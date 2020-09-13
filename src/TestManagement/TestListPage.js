import React, { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { NurseContext } from "../PersonalPage/NurseContext";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  InputBase,
  Grid,
  Button,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import StyledTableCell from "../TableContent/StyledTableCell";
import StyledTableRow from "../TableContent/StyledTableRow";
import { UseStyles, TableTheme } from "../AppCss";
import {SERVER_URL} from '../Constant'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TestListPage() {
  const [tests, setTests] = useState([]);
  const [effectDependency, setDependency] = useState(false);
  const sharedNurseContext = useContext(NurseContext);
  //   set Css
  const useStyles = UseStyles();
  const tableTheme = TableTheme;
  const [listOwner, setLisOwner] = useState("");
  let history = useHistory();

  useEffect(() => {
    console.log("test Type", sharedNurseContext.searchMethod);
    let nurseId = sharedNurseContext.nurseSharedId;
    let sharedSearchMethod = sharedNurseContext.searchMethod;
    function getTests() {
      let listUrl = "";
      if (sharedSearchMethod === "patientId") {
        let patientId = sharedNurseContext.searchValue;
        listUrl = `${SERVER_URL}tests/patientId_${patientId}`;
        setLisOwner(`Patient ID ${patientId} has below tests`);
      } else {
        listUrl = `${SERVER_URL}tests/nurseId_${nurseId}`;
        setLisOwner(`Nurse ID ${nurseId} has done below tests`);
      }
      fetch(listUrl)
        .then((response) => response.json())
        .then((data) => setTests(data));
      setDependency(false);
    }
    getTests();
    console.log(sharedNurseContext.searchValue);
  }, [effectDependency]);

  const deleteItem = (url) => {
    return fetch(url, {
      method: "DELETE",
    }).then((response) => {
      response.ok && setDependency(true);
    });
  };

  const updateContext = (item) => {
    sharedNurseContext.setNurseContext("test", item);
    history.push(`testdetails`);
  };

  return (
    <>
      <ThemeProvider theme={tableTheme}>
        <div className={useStyles.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <InputBase value={listOwner} disable={true} fullWidth/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TableContainer component={Paper} elevation={5}>
                <Table aria-label="test table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Test Id</StyledTableCell>
                      <StyledTableCell>Operated by Nurse Id</StyledTableCell>
                      <StyledTableCell>Test Items</StyledTableCell>
                      <StyledTableCell>Test Results</StyledTableCell>
                      <StyledTableCell>Test Date</StyledTableCell>
                      <StyledTableCell>Edit/Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tests.length > 0 &&
                      tests.map((item, index) => {
                        return (
                          <StyledTableRow key={index} scope="row">
                            <StyledTableCell>{item.testId}</StyledTableCell>
                            <StyledTableCell>{item.nurseId}</StyledTableCell>
                            <StyledTableCell>{item.testItemId}</StyledTableCell>
                            <StyledTableCell>{item.testResult}</StyledTableCell>
                            <StyledTableCell>
                              {item.date.split("T", 1)}
                            </StyledTableCell>
                            <StyledTableCell>
                              <EditIcon
                                onClick={() => updateContext(item)}
                                color="primary"
                              >
                              </EditIcon>
                              <DeleteIcon
                                onClick={() =>
                                  deleteItem(
                                    `${SERVER_URL}tests/testId_${item.testId}`
                                  )
                                }
                                color="secondary"
                              >
                              </DeleteIcon>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
}
