import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { GET_LIST_STUDENTS } from "../api/apiService";
import * as moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    width: "100%",
    margin: "auto",
  },
  removeLink: {
    textDecoration: "none",
  },
  textHeader: {
    fontWeight: "bold",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [listStudents, setListStudents] = useState({});

  useEffect(() => {
    /* get list students */
    GET_LIST_STUDENTS(`students/getliststudents`).then((item) =>
      setListStudents(item.data)
    );
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className={classes.textHeader}>
                      Teacher
                    </TableCell>
                    <TableCell align="left" className={classes.textHeader}>
                      Full Name
                    </TableCell>
                    <TableCell align="left" className={classes.textHeader}>
                      Date of birth
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listStudents.length > 0 &&
                    listStudents.map((row, idx) => {
                      if (
                        idx === 0 ||
                        row.teacher.teacherName !==
                          listStudents[idx - 1].teacher.teacherName
                      ) {
                        //The first student of teacher
                        return (
                          <TableRow key={row.studentId}>
                            <TableCell align="left">
                              {row.teacher.teacherName}
                            </TableCell>
                            <TableCell align="left">
                              {row.studentName}
                            </TableCell>
                            <TableCell align="left">
                              {moment(row.dateOfBirth).format("YYYY/MM/DD")}
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow key={row.studentId}>
                            <TableCell align="left">
                              {/* {row.teacher.teacherName} */}
                            </TableCell>
                            <TableCell align="left">
                              {row.studentName}
                            </TableCell>
                            <TableCell align="left">
                              {moment(row.dateOfBirth).format("YYYY/MM/DD")}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
