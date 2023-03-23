import React, { useState } from "react";
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
  rowGrid: {
    paddingTop: "10px",
  },
  btnDelete: {
    marginTop: "3px",
    color: "red",
  },
}));

export default function AddListStudents() {
  const classes = useStyles();
  /* SET ATTRIBUTE FORM ADD PRODUCT */
  const [listTeacher, setListTeacher] = useState([
    { teacherName: "Teacher 1" },
    { teacherName: "Teacher 2" },
  ]);

  const [listStudent, setListStudent] = useState([
    {
      studentName: "New Student",
      dateOfBirth: "2000-01-01",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2000-01-01",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2000-01-01",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2000-01-01",
      teacherId: 0,
    },
    {
      studentName: "New Student",
      dateOfBirth: "2000-01-01",
      teacherId: 0,
    },
  ]);
  const [numberStudent, setNumberStudent] = useState(5);
  const [checkAdd, setCheckAdd] = useState(false);

  /* EVENT DELETE*/
  const handleDeleteStudent = (idx) => {
    let newList = listStudent;
    newList = newList.filter((element, index) => index !== idx);
    setListStudent(newList);
    setNumberStudent(newList.length);
  };

  const handleDeleteTeacher = (idx) => {
    // delete teacher
    let newList = listTeacher;
    newList = newList.filter((element, index) => index !== idx);
    setListTeacher(newList);

    //update teacherid of student
    let newStudent = listStudent.map((item) => {
      if (item.teacherId === idx) {
        var newIdx = idx + 1;
        if (newIdx > newList.length) newIdx = 0; //teacherid = 0 if item has been removed is the last
        item.teacherId = newIdx;
      }
      return item;
    });
    setListStudent(newStudent);
  };

  /* EVENT CHANGE TEXTFIELD IN FORM */
  const handleAddNewTeacher = (event) => {
    let newTeacher = {
      teacherName: "New Teacher",
    };
    setListTeacher([...listTeacher, newTeacher]);
  };

  const handleChangNumberOfStudent = (event) => {
    let number = event.target.value;
    if (number <= 60) {
      if (listStudent.length > number) {
        //slice list
        let data = listStudent.slice(0, number);
        setListStudent(data);
      } else {
        //append list
        let newList = [...listStudent];
        for (var i = 0; i < number - listStudent.length; i++) {
          let newStudent = {
            studentName: "New Student",
            dateOfBirth: "2000-01-01",
            teacherId: 0,
          };
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
    let newList = listStudent.map((item, i) => {
      if (i === idx) {
        item.teacherId = parseInt(event.target.value);
      }
      return item;
    });
    setListStudent(newList);
  };

  const handleChangeDob = (event, idx) => {
    let newList = listStudent.map((item, i) => {
      if (i === idx) {
        item.dateOfBirth = event.target.value;
      }
      return item;
    });
    setListStudent(newList);
  };

  const handleChangeTeacherName = (event, idx) => {
    let newList = listTeacher.map((item, i) => {
      if (i === idx) {
        item.teacherName = event.target.value;
      }
      return item;
    });
    setListTeacher(newList);
  };

  /* EVENT BUTTON SUBMIT FORM ADD PRODUCT */
  const validateInput = () => {
    //validate teacher
    if (listTeacher.length < 2) {
      return "Teachers should be more than or equal to 2";
    }

    for (let i = 0; i < listTeacher.length; i++) {
      if (
        listTeacher[i].teacherName === null ||
        listTeacher[i].teacherName === ""
      ) {
        return "Teacher name is required";
      }
    }

    //validate student
    if (listStudent.length < 5 || listStudent.length > 60) {
      return "Students should be less than 60 and more than 30";
    }
    console.log("list student");
    for (let j = 0; j < listStudent.length; j++) {
      if (
        listStudent[j].studentName === null ||
        listStudent[j].studentName === ""
      ) {
        return "Student name is required";
      }
    }

    return null;
  };

  const submitListStudents = (event) => {
    let validate = validateInput();
    if (validate) {
      alert(validate);
      return;
    }
    let data = {
      students: listStudent,
      teachers: listTeacher,
    };

    ADD_NEW_LIST_STUDENT("students/addliststudents", data).then((item) => {
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
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Teachers
            </Typography>
            {listTeacher.length > 0 &&
              listTeacher.map((row, idx) => (
                <Grid
                  item
                  xs={12}
                  sm
                  container
                  className={classes.rowGrid}
                  key={idx}
                >
                  <Grid item xs={10}>
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

                  <Grid item xs={2}>
                    <Button
                      type="button"
                      onClick={() => handleDeleteTeacher(idx)}
                      color="default"
                      className={classes.btnDelete}
                    >
                      X
                    </Button>
                  </Grid>
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
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Students
            </Typography>
            <TextField
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
                  className={classes.rowGrid}
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

                  <Grid item xs={3}>
                    <TextField
                      onChange={(event) => handleChangeDob(event, idx)}
                      type="date"
                      variant="outlined"
                      className={classes.txtInput}
                      value={row.dateOfBirth}
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
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

                  <Grid item xs={1}>
                    <Button
                      type="button"
                      onClick={() => handleDeleteStudent(idx)}
                      color="default"
                      className={classes.btnDelete}
                    >
                      X
                    </Button>
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
