import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
  id: string;
  isLogged: boolean | undefined;
};

type Item = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  description: string;
  review: number;
};

const Bookmarks = (props: Props) => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();
  const handleBtn = (id: string) => {
    navigate(`/item/${id}`);
  };
  useEffect(() => {
    if (!props.isLogged) return;
    fetch("http://localhost:3001/fetch-bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setBookmarks(data));
  }, []);
  return (
    <div className="bookmarks-page">
      {props.isLogged && bookmarks.length > 0 ? (
        <div className="bookmarks-grid">
          {bookmarks.map((item: Item) => {
            return (
              <div className="item" key={item._id}>
                <div className="item-wrapper">
                  <div className="item-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="details">
                    <p className="item-name">{item.productName}</p>
                    <p className="item-price">{item.price}$</p>
                  </div>
                  <p className="review">{item.review}/5 ★ (500)</p>
                  <button
                    onClick={() => handleBtn(item._id)}
                    className="deliver"
                  >
                    Go to item!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : props.isLogged && bookmarks.length === 0 ? (
        <h1 className="text-center">
          No bookmarks added. Add some items to your bookmarks and come back!
        </h1>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Bookmarks;
