import React from "react";
import { Link } from "react-router-dom";
type Props = {
  isLogged: boolean | undefined;
  userType: string | undefined;
};

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/store">Store</Link>

        {props.userType === "admin" ? (
          <Link to="/panel">Admin panel</Link>
        ) : props.userType === undefined ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/bookmarks">Bookmarks</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
