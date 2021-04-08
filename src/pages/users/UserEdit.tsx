import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const UserEdit = (props: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [shouldRedirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("roles");
      setRoles(response.data);

      const { data } = await axios.get(`/users/${props.match.params.id}`);

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setRoleId(data.role.id);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`/users/${props.match.params.id}`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role_id: roleId,
    });

    setRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to={"/users"} />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>E-mail</label>
          <input
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-sm btn-outline-secondary" type="submit">
          Save
        </button>
      </form>
    </Wrapper>
  );
};

export default UserEdit;
