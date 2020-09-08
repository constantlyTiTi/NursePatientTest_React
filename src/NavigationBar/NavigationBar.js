import React from "react";
import { withRouter } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

const NavigationBar = (props) => {
  function addLink() {
    console.log(props.click)
    //  return props.click===""?props.history.push(props.click):props.click;
    return props.history.push(props.click);
  }
  return (
    <>
      {/* <Link to={props.to}>
          {props.name}
        </Link> */}
      <span className={props.buttonClass}>
        <Button onClick={addLink}>
          <Typography variant="h6" className={props.typoClass}>
            {props.name}
          </Typography>
        </Button>
      </span>
    </>
  );
};

export default withRouter(NavigationBar);
