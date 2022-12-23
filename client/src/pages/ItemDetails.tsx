import React from "react";
type Props = {
  isLogged: boolean;
  item: Page;
};
type Page = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  review: number;
};
const ItemDetails = (props: Props) => {
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
          </div>
          {/* TODO: ADD BOOKMARKS
          TODO: ARAMA ÇUBUĞU EKLE */}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
