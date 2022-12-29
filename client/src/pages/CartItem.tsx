import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

type Props = {
  item: Item;
  index: number;
  handleTrash: (item: string, money: number) => void;
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
};
type Item = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  description: string;
  review: number;
};
const CartItem = (props: Props) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div key={props.index} className="cart-item">
      <div className="cart-item-container">
        <div className="cart-img">
          <img src={props.item.img} alt="" />
        </div>
        <div className="cart-info">
          <div className="header-div">
            <h1>{props.item.productName}</h1>
            <FontAwesomeIcon
              onClick={() =>
                props.handleTrash(props.item._id, quantity * props.item.price)
              }
              icon={faTrash}
            />
          </div>
          <p>{props.item.review}/5 ★ (500)</p>
          <div className="cart-price">
            <h2>{quantity * props.item.price}$</h2>
            <div className="quantity">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    props.setMoney(props.money - props.item.price);
                  }
                }}
                className="dec"
              >
                -
              </button>
              <p className="qt">{quantity}</p>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                  props.setMoney(props.money + props.item.price);
                }}
                className="inc"
              >
                +
              </button>
            </div>
          </div>
          <p className="cart-description">{props.item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
