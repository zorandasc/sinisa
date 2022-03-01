import React, { useState, useEffect, useContext } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/userContext";
import auth from "../services/authService";
import Input from "./common/Input";

const LoginForm = () => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    //AKO JE LKOGOVAN NEMOZE SE DOCI NA /login
    if(user){
      navigate("/users", { replace: true });
    }
  },[user,navigate])

  const schema = {
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  const validateOnChange = (name, value) => {
    const parcialObj = { [name]: value };
    const parcialSchema = { [name]: schema[name] };

    const result = Joi.validate(parcialObj, parcialSchema);

    return result.error ? result.error.details[0].message : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newErrors = { ...errors };
    const errorMessage = validateOnChange(name, value);
    if (errorMessage) newErrors[name] = errorMessage;
    else delete newErrors[name];

    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors(newErrors);
  };

  const validateOnSubmit = () => {
    const result = Joi.validate(account, schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateOnSubmit();

    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const doSubmit = async () => {
    try {
      await auth.login(account);

      toast.success(`Welcome User: ${account.username}.  `, {
        theme: "colored",
      });

      //TO HARD RELOAD PAGE
      setTimeout(() => {
        //window.location=state?state.from.pathname:"/users"
        window.location = "/users";
      }, 1200);
    } catch (ex) {
      if (ex.response) {
        toast.error(`Error ocured: ${ex.response.data}`, { theme: "colored" });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg p-3 mb-5 bg-body rounded"
    >
      <Input
        name="username"
        label="Username"
        value={account.username}
        onChange={handleChange}
        error={errors.username}
      ></Input>
      <Input
        name="password"
        label="Password"
        value={account.password}
        onChange={handleChange}
        error={errors.password}
      ></Input>

      <button
        disabled={validateOnSubmit()}
        type="submit"
        className="btn btn-warning"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
