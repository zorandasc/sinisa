import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Users from "./components/users";
import UserForm from "./components/userForm";
import NotFound from "./components/notFound";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />}>
          <Route path=":id" element={<UserForm />} />
        </Route>
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
