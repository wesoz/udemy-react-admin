import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, last_page: 1 });

  useEffect(() => {
    (async () => {
      const { data: result } = await axios.get(`users?page=${page}`);
      setUsers(
        result.data.map(
          (u: any) => new User(u.id, u.first_name, u.last_name, u.email, u.role)
        )
      );
      setMeta(result.meta);
    })();
  }, [page]);

  const previous = () => {
    setPage((previous) => (previous === 1 ? previous : --previous));
  };

  const next = () => {
    setPage((previous) =>
      previous === meta.last_page ? previous : ++previous
    );
  };

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
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={previous}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link" onClick={next}>
              Next
            </a>
          </li>
          <li className="page-item">
            <div style={{ paddingTop: "7px", paddingLeft: "7px" }}>
              Page {page} of {meta.last_page}
            </div>
          </li>
        </ul>
      </nav>
      <span></span>
    </Wrapper>
  );
};

export default Users;
