import React from "react";

const Nav = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        Company name
      </a>
      <ul className="navbar-nav px-3">
        <a className="nav-link" href="#">
          Sign out
        </a>
      </ul>
    </header>
  );
};

export default Nav;
