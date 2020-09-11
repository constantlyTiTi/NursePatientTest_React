import React from "react";
import {
    TableCell,
  } from "@material-ui/core";

  import {
    withStyles,
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