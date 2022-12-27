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
          <>
            <div style={{ display: "flex", gap: "20px" }} className="end">
              <Link to="/bookmarks">Bookmarks</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
