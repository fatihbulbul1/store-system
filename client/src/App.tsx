import Navbar from "./pages/Navbar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import Root from "./pages/Root";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="App">
      <Navbar isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/login"
          element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
        />
        <Route path="/store" element={<p>Store</p>} />
        <Route path="/panel" element={<Panel isLogged={isLogged} />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </div>
  );
}

export default App;
