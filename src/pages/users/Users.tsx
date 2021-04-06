import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("users");
      console.log(data);
      setUsers(
        data.data.map(
          (u: any) => new User(u.id, u.first_name, u.last_name, u.email, u.role)
        )
      );
    })();
  }, []);

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Users;
