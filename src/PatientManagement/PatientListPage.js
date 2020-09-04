import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
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

const PatientListPage = ({ history }) => {
  const [patientList, setPatientList] = useState([]);
  const nurseContext = useContext(NurseContext);
  //   set Css
  const useStyles = UseStyles();
  const tableTheme = TableTheme;

  useEffect(() => {
    const id = nurseContext.nurseSharedId;
    fetchData(id);
    // nurseContext.setNurseContext("searchValue","");
  }, []);

  async function fetchData(id) {
    const url = `http://localhost:8080/nurse/${id}/patients`;
    const response = await fetch(url);
    const data = await response.json();
    await setPatientList(data);
  }

  const method = (patient) => {
    nurseContext.setNurseContext("patient", patient);
  };

  const createNewPatient = () => {
    history.push("/PatientManagement/createNewPatient");
  };

  const deleteItem = (url, id) => {
    return fetch(url, {
      method: "DELETE",
    }).then((response) => {
      response.ok && fetchData(id);
    });
  };

  const searchTestsByPatientId = (id) => {
    console.log(id);
    console.log(nurseContext);
    nurseContext.setNurseContext("searchMethod", "patientId");
    nurseContext.setNurseContext("searchValue", id);
    console.log(nurseContext);
  };

  return (
    <>
      <ThemeProvider theme={tableTheme}>
        <div className={useStyles.root}>
          <TableContainer component={Paper} elevation={5}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Patient Id</StyledTableCell>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Responsible By Nurse</StyledTableCell>
                  <StyledTableCell>Room</StyledTableCell>
                  <StyledTableCell>Tests</StyledTableCell>
                  <StyledTableCell>Edit/Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientList.length > 0 &&patientList.map((item, index) => {
                  return (
                    <StyledTableRow key={index} scope="row">
                      <StyledTableCell>{item.patientId}</StyledTableCell>
                      <StyledTableCell>{item.firstName}</StyledTableCell>
                      <StyledTableCell>{item.lastName}</StyledTableCell>
                      <StyledTableCell>{item.department}</StyledTableCell>
                      <StyledTableCell>{item.nurseId}</StyledTableCell>
                      <StyledTableCell>{item.room}</StyledTableCell>
                      <StyledTableCell>
                        <Link
                          to="/TestManagement/testListPage"
                          onClick={() => searchTestsByPatientId(item.patientId)}
                        >
                          Find Tests
                        </Link>{" "}
                        |
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link
                          to={`/PatientManagement/Patient/${item.patientId}`}
                          onClick={() => method(item)}
                        >
                          Edit
                        </Link>{" "}
                        |
                        <input
                          type="button"
                          onClick={() =>
                            deleteItem(
                              `http://localhost:8080/patients/paitent_${item.patientId}`,
                              item.nurseId
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
      <button onClick={createNewPatient}>Add New Patient</button>
    </>
  );
};
export default withRouter(PatientListPage);
