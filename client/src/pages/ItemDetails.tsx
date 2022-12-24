import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as reg,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solid } from "@fortawesome/free-solid-svg-icons";
type Props = {
  username: string;
  userType: string | undefined;
  item: Page;
};
type Page = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  description: string;
  review: number;
};
const ItemDetails = (props: Props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<IconDefinition | undefined>(
    undefined
  );
  useEffect(() => {
    if (props.username == "") return;
    fetch("http://localhost:3001/get-bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.username,
        bookmark: props.item._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) setBookmark(solid);
        else setBookmark(reg);
        setIsBookmarked(data);
      })
      .then(() => console.log("done"));
  }, []);
  const handleBookmark = async (itemId: string) => {
    if (bookmark === reg) {
      setBookmark(solid);
      setIsBookmarked(true);
    } else if (bookmark === solid) {
      setBookmark(reg);
      setIsBookmarked(false);
    }
    fetch("http://localhost:3001/add-bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.username,
        bookmark: itemId,
      }),
    });
  };
  return (
    <div className="detailed-item">
      <div className="detailed-wrapper">
        <img src={props.item.img} alt="" />
        <div className="details-section">
          <div className="row">
            <h1 className="detailed-name">{props.item.productName}</h1>
            <h1 className="detailed-review">{props.item.review}/5 ★ (500) </h1>
          </div>
          <div className="buy-section">
            <h1 className="detailed-price">{props.item.price}$</h1>
            <button className="deliver buy-btn">BUY NOW!</button>
            {props.userType === "user" ? (
              <FontAwesomeIcon
                onClick={() => handleBookmark(props.item._id)}
                icon={isBookmarked ? solid : reg}
              />
            ) : (
              ""
            )}
          </div>
          {/* TODO: ADD BOOKMARKS
          TODO: ARAMA ÇUBUĞU EKLE */}
        </div>
      </div>
      <div className="detailed-description">
        <h1>Item description</h1>
        <p>{props.item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
