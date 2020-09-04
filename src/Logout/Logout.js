import React, { useContext, useState } from "react";
import { NurseContext } from "../PersonalPage/NurseContext";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

export default function Logout(props) {
  let history = useHistory();
  const sharedContext = useContext(NurseContext);

  function onclick() {
    sharedContext.setNurseContext("nurseSharedId","")
    history.push(props.to);

  }
  return (
    <>
      <span className={props.buttonClass}>
        <Button onClick={onclick}>
          <Typography variant="h6" className={props.typoClass}>
            {props.name}
          </Typography>
        </Button>
      </span>
    </>
  );
}
