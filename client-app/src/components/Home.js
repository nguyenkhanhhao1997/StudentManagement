import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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
  // const [checkDeleteProduct, setCheckDeleteProduct] = useState(false);
  // const [close, setClose] = React.useState(false);

  useEffect(() => {
    /* get list students */
    GET_LIST_STUDENTS(`students/getliststudents`).then((item) =>
      setListStudents(item.data)
    );
  }, []);

  /* DELETE PRODUCT ID */
  // const deleteProductID = (id) => {
  //   DELETE_PRODUCT_ID(`listStudents/${id}`).then((item) => {
  //     console.log(item);
  //     if (item.data === 1) {
  //       setCheckDeleteProduct(true);
  //       /* UPDATE PRODUCTS */
  //       setListStudents(listStudents.filter((key) => key.idProduct !== id));
  //     }
  //   });
  // };

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
                    {/* <TableCell align="right">Delete</TableCell> */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listStudents.length > 0 &&
                    listStudents.map((row) => (
                      <TableRow key={row.studentId}>
                        <TableCell align="left">
                          {row.teacher.teacherName}
                        </TableCell>
                        <TableCell align="left">{row.studentName}</TableCell>
                        <TableCell align="left">
                          {moment(row.dateOfBirth).format("YYYY/MM/DD")}
                          {/* {new Date(row.dateOfBirth).toLocaleDateString()} */}
                        </TableCell>
                        {/* <TableCell align="right">
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            // onClick={() => deleteProductID(row.idProduct)}
                          >
                            Remove
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
