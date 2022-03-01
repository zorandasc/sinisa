import React, { useEffect } from "react";
import { toast } from "react-toastify";

import auth from "../services/authService";

const LogOut = () => {
  useEffect(() => {
    auth.logout();

    //SHOW TOAST SUCCESS
    toast.success(`BUY BUY `, {
      theme: "colored",
    });

    //TO HARD RELOAD PAGE
    setTimeout(() => {
      window.location = "/users";
    }, 1200);
  }, []);

  return <div>BUY BUY</div>;
};

export default LogOut;
