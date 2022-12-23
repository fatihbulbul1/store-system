import Navbar from "./pages/Navbar";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import Root from "./pages/Root";
import Store from "./pages/Store";
import ItemDetails from "./pages/ItemDetails";
type Page = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  review: number;
};
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);
  return (
    <div className="App">
      <Navbar isLogged={isLogged} />
      <Routes>
        {pages.map((page: Page) => {
          return (
            <Route
              path={`/item/${page._id}`}
              element={<ItemDetails item={page} isLogged={isLogged} />}
            />
          );
        })}
        <Route path="/" element={<Root />} />
        {/* <Route path="item/:id" element={<ItemDetails isLogged={isLogged} />} /> */}
        <Route
          path="/login"
          element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
        />
        <Route path="/store" element={<Store isLogged={isLogged} />} />
        <Route path="/panel" element={<Panel isLogged={isLogged} />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </div>
  );
}

export default App;
