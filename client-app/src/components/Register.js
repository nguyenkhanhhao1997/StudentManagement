import React, { useState } from "react";
import callApi from "../api/apiService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 100,
    margin: "auto",
    display: "block",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  txtInput: {
    width: "98%",
    margin: "1%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  AlertError: {
    padding: "2px",
    marginBottom: 2,
    color: "#ec3237",
  },
}));
export default function Register() {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  /* set error alert submit form */
  const [error, setError] = useState(true);
  const [msgError, setMsgError] = useState(null);
  /*SET attribute in Form*/
  const ConfigData = Object.freeze({
    Name: "",
    Avatar: "",
    Age: 0,
    Password: "",
    Email: "",
    Address: "",
    BirthDay: "",
  });

  /*SET Valid attribute*/
  const ConfigDataValid = Object.freeze({
    NameValid: null,
    AvatarValid: null,
    AgeValid: null,
    PasswordValid: null,
    EmailValid: null,
    AddressValid: null,
    BirthDayValid: null,
  });
  const [infoData, updateInfoData] = React.useState(ConfigData);
  const [infoDataValid, updateInfoDataValid] = React.useState(ConfigDataValid);
  const handleChange = (e) => {
    checkDataValid(e);
  };
  const checkDataValid = (e) => {
    if (e.target.value.trim() === "") {
      updateInfoDataValid({
        ...infoDataValid,
        [e.target.name + "Valid"]: true,
      });
    } else {
      updateInfoDataValid({
        ...infoDataValid,
        [e.target.name + "Valid"]: false,
      });
      if (e.target.name !== "Avatar") {
        updateInfoData({
          ...infoData,
          [e.target.name]: e.target.value.trim(),
        });
      } else {
        updateInfoData({
          ...infoData,
          [e.target.name]: e.target.files[0],
        });
      }
    }
  };

  const btnRegister = (e) => {
    e.preventDefault();
    if (
      !infoDataValid.NameValid &&
      !infoDataValid.AgeValid &&
      !infoDataValid.BirthDayValid &&
      !infoDataValid.EmailValid &&
      !infoDataValid.PasswordValid &&
      !infoDataValid.AddressValid
    ) {
      const _formData = new FormData();
      _formData.append("Name", infoData.Name);
      _formData.append("BirthDay", infoData.BirthDay);
      _formData.append("Age", infoData.Age);
      _formData.append("Address", infoData.Address);
      _formData.append("Email", infoData.Email);
      _formData.append("Password", infoData.Password);
      _formData.append("Avatar", infoData.Avatar);

      callApi(`users/register`, "POST", _formData).then((item) => {
        console.log(item);
        if (item.data > 0) {
          setSuccess(true);
        } else if (item.data === -1) {
          setError(false);
          setMsgError("This email already exists");
        } else {
          setError(false);
          setMsgError("Error login");
        }
      });
    } else {
      setError(false);
    }
  };
  if (success) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src="logo-top-new.svg"
              />
            </ButtonBase>
            <Typography className={classes.title} variant="h4">
              Register Hoanguyen IT
            </Typography>

            <Grid item xs={12} sm container>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Name
                </Typography>
                <TextField
                  id="Name"
                  name="Name"
                  label="Name"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.NameValid != null && infoDataValid.NameValid && (
                  <div className={classes.AlertError}>Please enter name!</div>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Age
                </Typography>
                <TextField
                  id="Age"
                  name="Age"
                  label="Age"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.AgeValid != null && infoDataValid.AgeValid && (
                  <div className={classes.AlertError}>
                    Please enter age your!
                  </div>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Birth Day
                </Typography>
                <TextField
                  id="BirthDay"
                  type="date"
                  name="BirthDay"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.BirthDayValid != null &&
                  infoDataValid.BirthDayValid && (
                    <div className={classes.AlertError}>
                      Please enter BirthDay your!
                    </div>
                  )}
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Email
                </Typography>
                <TextField
                  id="Email"
                  type="email"
                  name="Email"
                  label="Email"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.EmailValid != null &&
                  infoDataValid.EmailValid && (
                    <div className={classes.AlertError}>
                      Please enter Email your!
                    </div>
                  )}
              </Grid>

              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Password
                </Typography>
                <TextField
                  id="Password"
                  type="password"
                  name="Password"
                  label="Password"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.PasswordValid != null &&
                  infoDataValid.PasswordValid && (
                    <div className={classes.AlertError}>
                      Please enter Password your!
                    </div>
                  )}
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Address
                </Typography>
                <TextField
                  id="Address"
                  name="Address"
                  label="Address"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.AddressValid != null &&
                  infoDataValid.AddressValid && (
                    <div className={classes.AlertError}>
                      Please enter Address your!
                    </div>
                  )}
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  Avatar
                </Typography>
                <input
                  color="primary"
                  accept="image/*"
                  type="file"
                  name="Avatar"
                  id="icon-button-file"
                  onChange={handleChange}
                />
                {infoDataValid.AvatarValid != null &&
                  infoDataValid.AvatarValid && (
                    <div className={classes.AlertError}>
                      Please enter Avatar your!
                    </div>
                  )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  onClick={btnRegister}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
            {!error && <Alert severity="error">{msgError}</Alert>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
