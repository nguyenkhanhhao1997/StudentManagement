import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

/*Import api */
// import { GET_ALL_CATEGORIES, POST_ADD_PRODUCT } from "../api/apiService";

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
    { teacherName: "New Teacher" },
    { teacherName: "New Teacher" },
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
  const [teacherId, setTeacherId] = useState(0);

  // useEffect(() => {
  //   setNumberStudent(10);
  // }, []);
  /* BEFORE RUN */
  // useEffect(() => {
  //   /* GET API CATEGORIES */
  //   // GET_ALL_CATEGORIES("categories").then((item) => {
  //   //   setCategories(item.data);
  //   // });
  // }, []);

  /* EVENT CHANGE TEXTFIELD IN FORM */
  const handleAddNewTeacher = (event) => {
    let newTeacher = {
      teacherName: "New Teacher",
    };
    setListTeacher([...listTeacher, newTeacher]);
  };

  const handleChangNumberOfStudent = (event) => {
    let number = event.target.value;
    let newStudent = {
      studentName: "New Student",
      dateOfBirth: "2012-04-23T18:25:43.511",
      teacherId: 0,
    };
    let newList = [];
    for (var i = 0; i < number; i++) {
      newList.unshift(newStudent);
    }
    setNumberStudent(number);
    setListStudent(newList);
  };

  const handleChangeTeacherName = (event, idx) => {
    console.log(idx);
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
  const addProduct = (event) => {
    // event.preventDefault();
    // if (title !== "" && body !== "" && slug !== "" && category > 0) {
    //   let product = {
    //     Title: title,
    //     Body: body,
    //     Slug: slug,
    //     idCategory: category,
    //   };
    //   POST_ADD_PRODUCT(`products`, product).then((item) => {
    //     if (item.data === 1) {
    //       setCheckAdd(true);
    //     }
    //   });
    // } else {
    //   alert("Bạn chưa nhập đủ thông tin!");
    // }
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
              listStudent.map((row) => (
                <Grid item xs={12} sm container className={classes.studentGrid}>
                  <Grid item xs={4}>
                    <TextField
                      // onChange={handleChangeTitle}
                      label="Student Name"
                      variant="outlined"
                      className={classes.txtInput}
                      value={row.studentName}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      // onChange={handleChangeTitle}
                      type="date"
                      variant="outlined"
                      className={classes.txtInput}
                      value={row.dateOfBirth}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      select
                      value={teacherId}
                      // onChange={handleChangeCategory}
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
                // onClick={handleAddNewStudent}
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
