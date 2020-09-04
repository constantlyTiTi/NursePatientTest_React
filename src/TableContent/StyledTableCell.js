import React, { useState, useEffect, useContext } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
  } from "@material-ui/core";

  import {
    withStyles,
    makeStyles,
    createMuiTheme,
    ThemeProvider,
  } from "@material-ui/core/styles";

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.customizeTable.main,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    body: {
      fontSize: 20,
    },
  }))(TableCell);
  
  export default StyledTableCell;