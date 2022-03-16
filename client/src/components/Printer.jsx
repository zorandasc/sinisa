import React, { Component } from "react";

class Printer extends Component {
  render() {
    const { items } = this.props;

    return (
      <div>
        <h1 style={{textAlign:"center"}}>Lista korisnika</h1>

        <table className="table table-md table-light table-hover p-3 mb-5 bg-body rounded">
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
            {items.map((val) => {
              return (
                <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>{val.isAdmin ? "Yes" : "No"}</td>
                
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Printer;
