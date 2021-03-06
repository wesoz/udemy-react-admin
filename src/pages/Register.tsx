import React, { SyntheticEvent, useState } from "react";
import "../Login.css";
import axios from "axios";
import { Redirect } from "react-router";

const Register = () => {
  let first_name = "";
  let last_name = "";
  let email = "";
  let password = "";
  let password_confirm = "";
  const [shouldRedirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      email,
      password,
      password_confirm,
    };

    await axios.post("register", data);

    setRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to={"/login"} />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <input
          className="form-control"
          placeholder="First Name"
          required
          onChange={(e) => (first_name = e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Last Name"
          required
          onChange={(e) => (last_name = e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => (email = e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => (password = e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password Confirm"
          required
          onChange={(e) => (password_confirm = e.target.value)}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
