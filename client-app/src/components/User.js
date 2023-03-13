import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    width: "100%",
    margin: "auto",
  },
  link: {
    padding: 10,
    display: "inline-block",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  var login = sessionStorage.getItem("login");
  if (login === "false" || login === null) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  useEffect(() => {
    var name = sessionStorage.getItem("name");
    var email = sessionStorage.getItem("email");
    setName(name);
    setEmail(email);
  });
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Alert severity="success">
              Hello {name}, Email:{email}
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
