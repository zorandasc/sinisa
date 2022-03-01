import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "../services/authService";
import Navbar from "./navBar";
import UserContext from "../context/userContext";

import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  //CONTEXT
  const [user, setUser] = useState("");

  useEffect(() => {
    //DOBAVI USER IZ DEKODOVANOG TOKENA
    const currentUser = auth.getCurrentUser();
    //AND SET THE CONTEXT
    setUser(currentUser);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer autoClose={1000} position="top-center" />
      <UserContext.Provider value={{ user }}>
        <main className="container">
          <Navbar />
          <Outlet />
        </main>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default Layout;
