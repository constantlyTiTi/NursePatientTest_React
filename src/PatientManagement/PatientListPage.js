import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter,useRouteMatch } from "react-router-dom";
import { NurseContext } from "../PersonalPage/NurseContext";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Avatar
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import StyledTableCell from "../TableContent/StyledTableCell";
import StyledTableRow from "../TableContent/StyledTableRow";
import { UseStyles, TableTheme } from "../AppCss";
import MedicalTestIcon from '../assets/Icon_medicalTestTube.png'
import {SERVER_URL} from '../Constant'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const PatientListPage = ({ history }) => {
  const [patientList, setPatientList] = useState([]);
  const nurseContext = useContext(NurseContext);
  //   set Css
  const useStyles = UseStyles();
  const tableTheme = TableTheme;
  let {url}=useRouteMatch();

  useEffect(() => {
    const id = nurseContext.nurseSharedId;
    fetchData(id);
    // nurseContext.setNurseContext("searchValue","");
  }, []);

  async function fetchData(id) {
    const listUrl = `${SERVER_URL}nurse/${id}/patients`;
    const response = await fetch(listUrl);
    const data = await response.json();
    await setPatientList(data);
  }

  const editPage = (patient,to) => {
    nurseContext.setNurseContext("patient", patient);
    history.push(to);
  };

  const createNewPatient = () => {
    history.push(`${url}/createnewpatient`);
  };

  const deleteItem = (deleteUrl, id) => {
    return fetch(deleteUrl, {
      method: "DELETE",
    }).then((response) => {
      response.ok && fetchData(id);
    });
  };

  const searchTestsByPatientId = (id) => {
    nurseContext.setNurseContext("searchMethod", "patientId");
    nurseContext.setNurseContext("searchValue", id);
    history.push("test/alltests");
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
                        <Avatar
                          onClick={() => searchTestsByPatientId(item.patientId)}
                          src={MedicalTestIcon}
                          alt="img to the Test"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <EditIcon
                          to={`patient/${item.patientId}`}
                          onClick={() => editPage(item,`patient/${item.patientId}`)}
                          color="primary"
                        >
                        </EditIcon>{" "}
                        <DeleteIcon
                          onClick={() =>
                            deleteItem(
                              `${SERVER_URL}patients/paitent_${item.patientId}`,
                              item.nurseId
                            )
                          }
                          color="secondary"
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
      <div className={useStyles.button}>
      <Button onClick={createNewPatient} color="primary" variant="contained">Add New Patient</Button>
      </div>
    </>
  );
};
export default withRouter(PatientListPage);
