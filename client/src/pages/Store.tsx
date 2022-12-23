import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  isLogged: boolean;
};

type Item = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  review: number;
};

const Store = (props: Props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const handleBtn = (id: string) => {
    navigate(`/item/${id}`);
  };
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="store-container">
      <h1>Welcome to store!</h1>
      <div className="items">
        {items.map((item: Item) => {
          return (
            <div className="item">
              <div className="item-wrapper">
                <div className="item-img">
                  <img src={item.img} alt="" />
                </div>
                <div className="details">
                  <p className="item-name">{item.productName}</p>
                  <p className="item-price">{item.price}$</p>
                </div>
                <p className="review">{item.review}/5 ★ (500)</p>
                <button onClick={() => handleBtn(item._id)} className="deliver">
                  Go to item!
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
