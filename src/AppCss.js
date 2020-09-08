  import {
    makeStyles,
    createMuiTheme,
  } from "@material-ui/core/styles";

  export const UseStyles = makeStyles((theme) => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
      '& > *': {
        marginTop: theme.spacing(5),
        marginRight: 'auto',
        marginLeft: 'auto',
        width: theme.spacing(130),
        // maxHeight: '1%',
      },
    },
    button:{
      marginTop: theme.spacing(5),
      marginRight: 'auto',
      marginLeft: 'auto',
      width: theme.spacing(30),
    }
  }));

  export const TableTheme = createMuiTheme({
    palette: {
      customizeTable: {
        main: "#5c6ac4",
      },
    },
  });

  export const TestPageHeight=makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(5),
        marginRight: 'auto',
        marginLeft: 'auto',
        height: theme.spacing(60),
      },
    },
  }));