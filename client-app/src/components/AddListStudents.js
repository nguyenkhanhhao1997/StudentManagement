import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

/*Import api */
import { ADD_NEW_LIST_STUDENT } from "../api/apiService";

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
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  link: {
    padding: 10,
    display: "inline-block",
  },
  txtInput: {
    width: "98%",
    margin: "1%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  studentGrid: {
    paddingTop: "10px",
  },
}));

export default function AddListStudents() {
  const classes = useStyles();
  /* SET ATTRIBUTE FORM ADD PRODUCT */
  const [listTeacher, setListTeacher] = useState([
    { teacherName: "New Teacher 1" },
    { teacherName: "New Teacher 2" },
  ]);

  const [numberStudent, setNumberStudent] = useState(5);
  const [listStudent, setListStudent] = useState([
    {
      studentName: "New Student",
      dateOfBirth: "2012-04-23T18:25:43.511",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2012-04-23T18:25:43.511",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2012-04-23T18:25:43.511",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2012-04-23T18:25:43.511",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2012-04-23T18:25:43.511",
      teacherId: 0,
    },
  ]);
  const [checkAdd, setCheckAdd] = useState(false);

  /* EVENT CHANGE TEXTFIELD IN FORM */
  const handleAddNewTeacher = (event) => {
    let newTeacher = {
      teacherName: "New Teacher",
    };
    setListTeacher([...listTeacher, newTeacher]);
  };

  const handleChangNumberOfStudent = (event) => {
    let number = event.target.value;
    if (number <= 50) {
      if (listStudent.length > number) {
        //cut list
        let data = listStudent.slice(0, number);
        setListStudent(data);
      } else {
        //append list
        let newStudent = {
          studentName: "New Student",
          dateOfBirth: "2012-04-23T18:25:43.511",
          teacherId: 0,
        };
        let newList = [...listStudent];
        for (var i = 0; i < number - listStudent.length; i++) {
          newList.push(newStudent);
        }
        setListStudent(newList);
      }
      setNumberStudent(number);
    }
  };

  const handleChangeStudentName = (event, idx) => {
    let newList = listStudent.map((item, i) => {
      if (i === idx) {
        item.studentName = event.target.value;
        return item;
      } else {
        return item;
      }
    });
    setListStudent(newList);
  };

  const handleChangeTeacherID = (event, idx) => {
    console.log(idx);
    let newList = listStudent.map((item, i) => {
      if (i === idx) {
        console.log("change");
        item.teacherId = parseInt(event.target.value);
        return item;
      } else {
        return item;
      }
    });
    setListStudent(newList);
  };

  const handleChangeDob = (event, idx) => {
    let newList = listStudent.map((item, i) => {
      if (i === idx) {
        item.dateOfBirth = event.target.value;
        return item;
      } else {
        return item;
      }
    });
    setListStudent(newList);
  };

  const handleChangeTeacherName = (event, idx) => {
    let newList = listTeacher.map((item, i) => {
      if (i === idx) {
        item.teacherName = event.target.value;
        return item;
      } else {
        return item;
      }
    });
    setListTeacher(newList);
  };

  /* EVENT BUTTON SUBMIT FORM ADD PRODUCT */
  const submitListStudents = (event) => {
    // event.preventDefault();
    if (listTeacher.length < 2) {
      alert("Teachers should be more than or equal to 2 ");
      return;
    }
    if (listStudent.length < 5) {
      alert("Students should be more than or equal to 30 ");
      return;
    }

    let data = {
      students: listStudent,
      teachers: listTeacher,
    };

    ADD_NEW_LIST_STUDENT("students/addliststudents", data).then((item) => {
      console.log(item);
      if (item && item.data === "ok") {
        setCheckAdd(true);
      } else {
        alert("something went wrong");
      }
    });
  };

  /* CHECK setAdd, if true redirect to Home component */
  if (checkAdd) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Teacher section */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Add Teacher
            </Typography>
            <Grid item xs={12} sm container>
              {listTeacher.length > 0 &&
                listTeacher.map((row, idx) => (
                  <Grid item xs={12} key={idx}>
                    <TextField
                      required
                      onChange={(event) => handleChangeTeacherName(event, idx)}
                      label="Teacher Name"
                      value={row.teacherName}
                      variant="outlined"
                      className={classes.txtInput}
                      size="small"
                    />
                  </Grid>
                ))}
              <Grid item xs={4}>
                <Button
                  type="button"
                  onClick={handleAddNewTeacher}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Add Teacher
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Add Student
            </Typography>
            <TextField
              // onChange={handleChangeTitle}
              required
              type="number"
              label="Numer of Student"
              variant="outlined"
              value={numberStudent}
              className={classes.txtInput}
              onChange={handleChangNumberOfStudent}
              size="small"
              inputProps={{ max: 50 }}
            />
            {listStudent.length > 0 &&
              listStudent.map((row, idx) => (
                <Grid
                  item
                  xs={12}
                  sm
                  container
                  className={classes.studentGrid}
                  key={idx}
                >
                  <Grid item xs={4}>
                    <TextField
                      required
                      onChange={(event) => handleChangeStudentName(event, idx)}
                      label="Student Name"
                      variant="outlined"
                      className={classes.txtInput}
                      value={row.studentName}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    {/* <TextField
                      // onChange={(event) => handleChangeStudentName(event, idx)}
                      type="date"
                      variant="outlined"
                      className={classes.txtInput}
                      value={row.dateOfBirth}
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> */}
                    <TextField
                      required
                      onChange={(event) => handleChangeDob(event, idx)}
                      variant="outlined"
                      className={classes.txtInput}
                      value={row.dateOfBirth}
                      size="small"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      required
                      select
                      value={row.teacherId}
                      onChange={(event) => handleChangeTeacherID(event, idx)}
                      SelectProps={{
                        native: true,
                      }}
                      variant="outlined"
                      className={classes.txtInput}
                      size="small"
                    >
                      {listTeacher.length > 0 &&
                        listTeacher.map((option, idx) => (
                          <option key={idx} value={idx}>
                            {option.teacherName}
                          </option>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>
              ))}
            <Grid item xs={12}>
              <Button
                type="button"
                onClick={submitListStudents}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
