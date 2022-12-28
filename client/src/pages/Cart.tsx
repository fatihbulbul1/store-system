import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isLogged: boolean | undefined;
  id: string;
};
type Item = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  description: string;
  review: number;
};
const Cart = (props: Props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (!props.isLogged) return;
    fetch("http://localhost:3001/get-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: props.id }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  return (
    <div className="cart">
      {props.isLogged ? (
        <div>
          {cart.map((item: Item) => {
            return <p>{item.productName}</p>;
          })}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Cart;
