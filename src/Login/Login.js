import React, { useContext, useState } from "react";
import { NurseContext } from "../PersonalPage/NurseContext";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Container,
  CssBaseline,
  Avatar,
  makeStyles,
  Typography,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export default function Login() {
  const appContext = useContext(NurseContext);
  let history = useHistory();
  const [loginState, setLoginState] = useState({
    nurseSharedId: "",
    password: "",
    idError: false,
    idErrorMessage:"",
    passwordError: false,
    passwordErrorMessage:"",

  });
  function nurseIdOnChangeHandler(e) {
    setLoginState({ ...loginState, nurseSharedId: e.target.value,idError: false,idErrorMessage:""  });
  }
  function passwordOnChangeHandler(e) {
    setLoginState({ ...loginState, password: e.target.value,passwordError: false,passwordErrorMessage:"" });
  }
  async function login(event) {
    const url = `http://localhost:8080/nurse/${loginState.nurseSharedId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data != null) {
      if (loginState.password === data.password) {
        appContext.setNurseContext("nurseSharedId", loginState.nurseSharedId);
        history.push("/NurseProfile");
      } else {
        setLoginState({ ...loginState, passwordError: true,passwordErrorMessage:"Password not match" });
      }
    } else {
      setLoginState({ ...loginState, idError: true,idErrorMessage:"ID not Exist" });
    }
    event.preventDefault();
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      //   marginTop: theme.spacing(0),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} >
            <TextField
              error={loginState.idError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nurseId"
              label="Nurse ID"
              name="nurseId"
              helperText={loginState.idErrorMessage}
              autoFocus
              value={loginState.nurseSharedId}
              onChange={nurseIdOnChangeHandler}
            />
            <TextField
              error={loginState.passwordError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={loginState.passwordErrorMessage}
              value={loginState.password}
              onChange={passwordOnChangeHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link to="/Register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
