import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import http from "../services/httpService";
import UserContext from "../context/userContext";
import Printer from "./Printer";

const Users = () => {
  //ref fror printing
  const componentRef = useRef();
  const [users, setUsers] = useState([]);

  const { user } = useContext(UserContext);
  let loggedUser = user ? user.username : "";

  const getUsers = async () => {
    const { data } = await http.get("/api/users/list");
    console.log(data);

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (user) => {
    const originalUsers = users;
    const updatedUsers = originalUsers.filter((u) => u._id !== user._id);

    setUsers(updatedUsers);

    try {
      await http.delete(`/api/users/${user._id}`);
      toast.success(`User: ${user.username}.  Deleted.`, { theme: "colored" });
    } catch (ex) {
      if (ex.response) {
        toast.error(`Error ocured: ${ex.response.data}`, { theme: "colored" });
      }
      setUsers(originalUsers);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="col">
      <div style={{ display: "none" }}>
        <Printer items={users} ref={componentRef} />
      </div>
      {loggedUser && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/users/new"
            type="button"
            className="btn btn-success"
            style={{ marginBottom: 20 }}
          >
            New User
          </Link>

          <button onClick={handlePrint} className="btn btn-primary">
            <i className="fa fa-print fa-lg" aria-hidden="true"></i>{" "}
            <span>Print</span>
          </button>
        </div>
      )}
      <Outlet />
      <table className="table table-md table-light  table-hover shadow p-3 mb-5 bg-body rounded ">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Admin</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((val) => {
            return (
              <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.username}</td>
                <td>{val.email}</td>
                <td>{val.isAdmin ? "Yes" : "No"}</td>
                <th>
                  {loggedUser && (
                    <Link
                      to={`/users/${val._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )}
                </th>
                <th>
                  <button
                    disabled={loggedUser ? false : true}
                    onClick={() => handleDelete(val)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
