import React from "react";
import { Link } from "react-router-dom";
type Props = {
  isLogged: boolean;
};

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/store">Store</Link>
        <Link to="/login">Login</Link>
        {props.isLogged ? <Link to="/panel">Admin panel</Link> : ""}
      </div>
    </div>
  );
};

export default Navbar;
