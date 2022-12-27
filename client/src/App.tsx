import Navbar from "./pages/Navbar";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import Root from "./pages/Root";
import Store from "./pages/Store";
import ItemDetails from "./pages/ItemDetails";
import Bookmarks from "./pages/Bookmarks";
import Cart from "./pages/Cart";
type Page = {
  _id: string;
  img: string;
  productName: string;
  price: number;
  description: string;
  review: number;
};
function App() {
  const [isLogged, setIsLogged] = useState<undefined | boolean>(undefined);
  const [pages, setPages] = useState([]);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [id, setId] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);
  return (
    <div className="App">
      <Navbar userType={userType} isLogged={isLogged} />
      <Routes>
        {pages.map((page: Page) => {
          return (
            <Route
              path={`/item/${page._id}`}
              key={page._id}
              element={
                <ItemDetails username={id} item={page} userType={userType} />
              }
            />
          );
        })}
        <Route path="/" element={<Root />} />
        {/* <Route path="item/:id" element={<ItemDetails isLogged={isLogged} />} /> */}
        <Route
          path="/login"
          element={
            <Login
              id={id}
              setId={setId}
              setUserType={setUserType}
              isLogged={isLogged}
              setIsLogged={setIsLogged}
            />
          }
        />
        <Route path="/store" element={<Store isLogged={isLogged} />} />
        <Route path="/panel" element={<Panel isLogged={isLogged} />} />
        <Route
          path="/bookmarks"
          element={<Bookmarks isLogged={isLogged} id={id} />}
        />
        <Route path="/cart" element={<Cart isLogged={isLogged} id={id} />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </div>
  );
}

export default App;
