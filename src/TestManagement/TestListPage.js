import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { NurseContext } from "../PersonalPage/NurseContext";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import StyledTableCell from "../TableContent/StyledTableCell";
import StyledTableRow from "../TableContent/StyledTableRow";
import { UseStyles, TableTheme } from "../AppCss";

export default function TestListPage() {
  const [tests, setTests] = useState([]);
  const [effectDependency, setDependency] = useState(false);
  const sharedNurseContext = useContext(NurseContext);
  //   set Css
  const useStyles = UseStyles();
  const tableTheme = TableTheme;

  useEffect(() => {
    let nurseId = sharedNurseContext.nurseSharedId;
    let sharedSearchMethod = sharedNurseContext.searchMethod;
    function getTests() {
      let url = "";
      if (sharedSearchMethod === "patientId") {
        let patientId = sharedNurseContext.searchValue;
        url = `http://localhost:8080/tests/patientId_${patientId}`;
      } else {
        url = `http://localhost:8080/tests/nurseId_${nurseId}`;
      }
      fetch(url)
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
  };

  // //get TestItems of each Test
  // const getTestItem= (testItemId)=>{
  //   let url = `http://localhost:8080/TestItems/TestItem_${testItemId}`;
  //   let testItem= await fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => data.itemName);
    
  //     return testItem;
  // }

  return (
    <>
      <ThemeProvider theme={tableTheme}>
        <div className={useStyles.root}>
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
                        {/* <StyledTableCell>{getTestItem(item.testItemId)}</StyledTableCell> */}
                        <StyledTableCell>{item.testResult}</StyledTableCell>
                        <StyledTableCell>{item.date}</StyledTableCell>
                        <StyledTableCell>
                          <Link
                            to="/TestManagement/TestDetails"
                            onClick={() => updateContext(item)}
                          >
                            Edit
                          </Link>
                          <input
                            type="button"
                            onClick={() =>
                              deleteItem(
                                `http://localhost:8080/tests/testId_${item.testId}`
                              )
                            }
                            value="Delete"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </>
  );
}
