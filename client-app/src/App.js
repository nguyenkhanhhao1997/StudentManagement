import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuTop from "./components/MenuTop";
import Home from "./components/Home";
import Product from "./components/Product";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";

// import Category from "./components/Category";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <React.Fragment>
      <CssBaseline />
      <MenuTop />
      <Container maxWidth="md">
        <Route exact path="/" component={User} />
        <Route path="/home" component={Home} />
        <Route path="/products" component={Product} />
        <Route path="/edit/product/:id" component={EditProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* <Route path="/categories" component={Category} /> */}
      </Container>
    </React.Fragment>
  );
}

export default App;
