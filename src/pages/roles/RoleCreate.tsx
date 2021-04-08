import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/permission";

const RoleCreate = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [shouldRedirect, setRedirect] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("permissions");
      setPermissions(data);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("roles", {
      name,
      permissions: selected,
    });

    setRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to={"/roles"} />;
  }

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map((p: Permission) => {
              return (
                <div className="form-check form-check-inline col-3" key={p.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={p.id}
                    onChange={() => check(p.id)}
                  />
                  <label className="form-check-label">{p.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <button className="btn btn-sm btn-outline-secondary" type="submit">
          Save
        </button>
      </form>
    </Wrapper>
  );
};

export default RoleCreate;
