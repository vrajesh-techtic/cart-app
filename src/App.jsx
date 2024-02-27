import { Route, Routes } from "react-router";
import "./App.css";

import AllContextAPI from "./components/AllContextAPI";
import Profile from "./components/Profile";
import Home from "./components/Home";

function App() {
  const addProduct = {
    products: [{ quantity: null, prod: null }],
  };
  return (
    <AllContextAPI.Provider value={addProduct}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AllContextAPI.Provider>
  );
}

export default App;
