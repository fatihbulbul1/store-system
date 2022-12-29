import React, { useState } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  userType: string | undefined;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNew = (props: Props) => {
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [desc, setDesc] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempSrc;
    let tempDesc;
    if (src === "") tempSrc = undefined;
    else tempSrc = src;
    if (desc === "") tempDesc = undefined;
    else tempDesc = desc;
    if (name !== "" && price !== undefined) {
      fetch("http://localhost:3001/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: tempSrc,
          productName: name,
          price: price,
          description: tempDesc,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          props.setIsChanged(!props.isChanged);
          alert(data);
        });
    }
  };
  return (
    <div className="add-new">
      {props.userType === "admin" ? (
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
            <label htmlFor="edit-name-field">Product name (required):</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="edit-name-field"
              type="text"
            />
          </div>
          <div className="edit-price">
            <label htmlFor="edit-price-field">Product price (required):</label>
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
      ) : (
        <Navigate to={"/store"} />
      )}
    </div>
  );
};

export default AddNew;
