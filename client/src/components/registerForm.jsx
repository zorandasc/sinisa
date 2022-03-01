import React, { useState } from "react";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import http from "../services/httpService";
import Input from "./common/Input";

const RegisterForm = () => {
  let navigate = useNavigate();
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required().email(),
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
      await http.post("/api/users/register", account);
      navigate("/login", { replace: true });
      toast.success(`Create User: ${account.username}.  `, {
        theme: "colored",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
        name="email"
        label="Email"
        value={account.email}
        onChange={handleChange}
        error={errors.email}
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
