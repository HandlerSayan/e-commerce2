import "./App.css";
import "./AppComponents/NavigationBar/NavigationBar.css";
import { NavigationBar } from "./AppComponents/NavigationBar/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Store } from "./AppPopups/Store";
import { StoreCategory } from "./AppPopups/StoreCategory";
import { Products } from "./AppPopups/Products";
import { AddCart } from "./AppPopups/AddCart";
import { Login } from "./AppPopups/Login";
import { Footer } from "./AppComponents/AppFooter/Footer";
import men_banner from "./AppComponents/Images/banner_mens.png";
import women_banner from "./AppComponents/Images/banner_women.png";
import kid_banner from "./AppComponents/Images/banner_kids.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route
            path="/mens"
            element={<StoreCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<StoreCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<StoreCategory banner={kid_banner} category="kid" />}
          />
          <Route path="/product" element={<Products />}>
            <Route path=":productId" element={<Products />} />
          </Route>

          <Route path="/cart" element={<AddCart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
