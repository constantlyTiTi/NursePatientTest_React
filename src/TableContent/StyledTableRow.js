import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  StyledTableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
export default StyledTableRow;
