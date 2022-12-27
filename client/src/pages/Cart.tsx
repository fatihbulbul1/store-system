import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isLogged: boolean | undefined;
  id: string;
};

const Cart = (props: Props) => {
  return (
    <div className="cart">
      {props.isLogged ? <p>Cart</p> : <Navigate to="/login" />}
    </div>
  );
};

export default Cart;
