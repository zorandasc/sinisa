import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";

//JEDAN NACIN PROTEKCIJE ROUTE
const RequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;

/*
<Route path="users" element={<Users />}>
    <Route path="users" element={<RequireAuth />}>
        <Route path=":id" element={<UserForm />}/>
    </Route>
</Route>
*/
