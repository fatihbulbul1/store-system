import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CartItem from "./CartItem";

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
  const [money, setMoney] = useState(0);
  const [block, setBlock] = useState(false);
  let mn = 0;
  const getCart = () => {
    fetch("http://localhost:3001/get-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: props.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        if (block) return;
        data.map((item: Item) => {
          mn += item.price;
        });
        setMoney(mn);
        setBlock(true);
      });
  };
  const handleTrash = (item: string, moneyMinus: number) => {
    fetch("http://localhost:3001/remove-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: props.id, item: item }),
    }).then(() => {
      getCart();
      setMoney(money - moneyMinus);
    });
  };
  const handleBuy = () => {
    fetch("http://localhost:3001/buy-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: props.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Successfully completed!");
          getCart();
        }
      });
  };
  useEffect(() => {
    if (!props.isLogged) return;
    getCart();
  }, []);
  return (
    <>
      {props.isLogged && cart.length > 0 ? (
        <div className="cart">
          {cart.map((item: Item, index) => {
            mn += item.price;
            return (
              <CartItem
                key={index}
                money={money}
                setMoney={setMoney}
                handleTrash={handleTrash}
                item={item}
                index={index}
              />
            );
          })}
          <div className="money-div">
            <div className="cash">
              <h2>Total cash:</h2>
              <h2>{money}$</h2>
            </div>
            <button
              onClick={handleBuy}
              style={{ width: "fit-content" }}
              className="deliver buy-btn"
            >
              BUY NOW!
            </button>
          </div>
        </div>
      ) : props.isLogged && cart.length === 0 ? (
        <h1 className="text-center">Cart is empty!</h1>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Cart;
