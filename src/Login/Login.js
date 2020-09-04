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
  });
  function nurseIdOnChangeHandler(e) {
    setLoginState({ ...loginState, nurseSharedId: e.target.value });
  }
  function passwordOnChangeHandler(e) {
    setLoginState({ ...loginState, password: e.target.value });
  }
  function submit(event) {
    appContext.setNurseContext("nurseSharedId", loginState.nurseSharedId);
    history.push("/NurseProfile");
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
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nurseId"
              label="Nurse ID"
              name="nurseId"
              autoFocus
              value={loginState.nurseSharedId}
              onChange={nurseIdOnChangeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginState.password}
              onChange={passwordOnChangeHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
