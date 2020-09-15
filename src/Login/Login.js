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
import { SERVER_URL, LOGIN_ID_PASSWORD_EMPTY_ERROR, LOGIN_MATCH} from "../Constant";

export default function Login(props) {
  const appContext = useContext(NurseContext);
  let history = useHistory();
  const [loginNurseState, setLoginState] = useState({
    nurseId: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    idError: false,
    passwordError: false,
    loginMessage: "",
  });
  function nurseIdOnChangeHandler(e) {
    setLoginState({ ...loginNurseState, nurseId: e.target.value });
    setLoginError({ ...loginError, idError: false });
  }
  function passwordOnChangeHandler(e) {
    setLoginState({ ...loginNurseState, password: e.target.value });
    setLoginError({ ...loginError, passwordError: false });
  }
  function login(event) {
    const loginUrl = `${SERVER_URL}login`;
//set error for not enter id or password
    loginNurseState.nurseId === "" &&
      setLoginError({ ...loginError, idError: true });
    loginNurseState.password === "" &&
      setLoginError({ ...loginError, passwordError: true });
    if (loginError.idError || loginError.passwordError) {
      setLoginError({
        ...loginError,
        loginErrorMessage: LOGIN_ID_PASSWORD_EMPTY_ERROR,
      });
    } 
    //validate user from backend and go to next page if success
    else {
      fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginNurseState),
      })
        .then((response) => response.json())
        .then((data) => {
          const loginMessage= data.message;
          // setLoginError({ ...loginError,passwordError:true,loginMessage: data.message});

          if (loginMessage === LOGIN_MATCH) {
            appContext.setNurseContext(
              "nurseSharedId",
              loginNurseState.nurseId
            );
            history.push(`nurseprofile`);
          }else{
            setLoginError({ ...loginError, passwordError: true,loginMessage });
          }
        }
        );
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
          <form className={classes.form}>
            <TextField
              error={loginError.idError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nurseId"
              label="Nurse ID"
              name="nurseId"
              helperText={loginError.loginMessage}
              autoFocus
              value={loginNurseState.nurseId}
              onChange={nurseIdOnChangeHandler}
            />

            <TextField
              error={loginError.passwordError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={loginError.loginMessage}
              value={loginNurseState.password}
              onChange={passwordOnChangeHandler}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
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
