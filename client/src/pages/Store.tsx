import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
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

const Store = (props: Props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
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
      <input
        type="search"
        value={filter}
        placeholder="search..."
        style={{ width: "400px", padding: "10px", marginTop: "10px" }}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="items">
        {items
          .filter((item: Item) => item.productName.includes(filter))
          .map((item: Item) => {
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
    </div>
  );
};

export default Store;
