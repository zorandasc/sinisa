import React, { useEffect, useState, useContext } from "react";
import Joi from "joi-browser";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/userContext";
import http from "../services/httpService";
import Input from "./common/Input";
import Select from "./common/select";

const adminOptions = [
  { id: 1, value: false, name: "Ne" },
  { id: 2, value: true, name: "Da" },
];

const UserForm = () => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  let params = useParams(); //ZA DOBIJANJE _ID ILI NEW

  const [title, setTitle] = useState("");

  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required(),
  };

  useEffect(() => {
    //AKO NIJJE LKOGOVAN NEMOZE SE DOCI NA /new,/id
    if (!user) {
      navigate("/users", { replace: true });
      return
    }

    if (params.id === "new") {
      setTitle(`New User`);
      return; //AKO JE NOVI KORISNIK IZADJI
    }

    getUserById(params.id); //DOBAVI POSTOJECEG
  }, [navigate, user, params]);

  const getUserById = async (id) => {
    try {
      const { data } = await http.get(`/api/users/${id}`);

      setTitle(`User id: ${data.id}`);
      setAccount((prevState) => ({
        ...prevState,
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin,
      }));
    } catch (ex) {
      if (ex.response) {
        toast.error(`Error ocured: ${ex.response.data}`, { theme: "colored" });
      }
    }
  };

  const createNewUser = async (id, newUser) => {
    try {
      await http.post(`/api/users/${id}`, newUser);
      toast.success(`Created User: ${newUser.username}.  `, {
        theme: "colored",
      });
    } catch (ex) {
      if (ex.response) {
        toast.error(`Error ocured: ${ex.response.data}`, { theme: "colored" });
      }
    }
  };

  const updateUser = async (id, newUser) => {
    try {
      await http.put(`/api/users/${id}`, newUser);
      toast.success(`Changed User: ${newUser.username}.`, {
        theme: "colored",
      });
    } catch (ex) {
      if (ex.response) {
        toast.error(`Error ocured: ${ex.response.data}`, { theme: "colored" });
      }
    }
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
    if (params.id === "new") {
      createNewUser(params.id, account);
    } else {
      updateUser(params.id, account);
    }
    //TO HARD RELOAD PAGE
    setTimeout(() => {
      window.location = "/users";
    }, 1200);
  };

  return (
    <div className="modal-bg">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <Link
              to="/users"
              type="button"
              className="btn btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></Link>
          </div>
          <div className="modal-body">
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
            <Select
              name="isAdmin"
              label="Admin"
              options={adminOptions}
              value={account.isAdmin}
              onChange={handleChange}
              error={errors.isAdmin}
            ></Select>
            <Input
              name="password"
              label="Password"
              value={account.password}
              onChange={handleChange}
              error={errors.password}
            ></Input>
          </div>
          <div className="modal-footer">
            <Link
              to="/users"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </Link>
            <button
              disabled={validateOnSubmit()}
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
