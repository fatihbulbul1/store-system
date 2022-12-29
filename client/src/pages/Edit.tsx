import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  item: Page;
  userType: string | undefined;
};
type Page = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  description: string;
  review: number;
};
const Edit = (props: Props) => {
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [desc, setDesc] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3001/edit-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.item._id,
        name: name,
        price: price,
        description: desc,
        img: src,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) alert("Item updated! Changes will be shown at store.");
      });
  };
  useEffect(() => {
    setSrc(props.item.img);
    setName(props.item.productName);
    setPrice(props.item.price);
    setDesc(props.item.description);
  }, []);
  return (
    <>
      {props.userType === "admin" ? (
        <div className="edit-page">
          <div className="edit-container">
            <div className="edit-img">
              <img src={props.item.img} alt="" />
              <p>
                <span className="bold">Img src:</span> {props.item.img}
              </p>
            </div>
            <div className="edit-name">
              <span className="bold">Product name: </span>
              {props.item.productName}
            </div>
            <div className="edit-price">
              <span className="bold">Product price:</span> {props.item.price}$
            </div>
            <div className="edit-description">
              <span className="bold">Product description:</span>
              {props.item.description}
            </div>
          </div>
          <form className="edit-container" onSubmit={(e) => handleSubmit(e)}>
            <div className="edit-img">
              <label htmlFor="id">Img src: </label>
              <input
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                type="text"
                id="edit-img-src"
              />
            </div>
            <div className="edit-name">
              <label htmlFor="edit-name-field">Product name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="edit-name-field"
                type="text"
              />
            </div>
            <div className="edit-price">
              <label htmlFor="edit-price-field">Product price:</label>
              <input
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                id="edit-price-field"
                type="text"
              />
            </div>
            <div className="edit-description-field">
              <label htmlFor="edit-desc-field">Product description: </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                name=""
                id="edit-desc-field"
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <Navigate to="/store" />
      )}
    </>
  );
};

export default Edit;
