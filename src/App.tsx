import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Auctions from "./pages/auctions/Auctions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auction from "./pages/auctions/Auction";
import Products from "./pages/products/Products";
import Product from "./pages/products/Product";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { CartProvider } from "./context/CartContext";
import Wishlist from "@/pages/Wishlist";
import ScrollToTop from "./components/ScrollToTop";
import ProfileDash from "./pages/dashboard/ProfileDash";

function App() {
  return (
    <CartProvider>
      <div dir="rtl" className="pt-[92px]">
        <ScrollToTop />
        {/* <Navbar hasAd adTitle="تخفيض 15% على قسم الاكسسوارات" /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="components" element={<Components />} />
            {/* Auction */}
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auction/:id" element={<Auction />} />
            {/* Product */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />

            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/product/:id" element={<Product />} /> */}

            <Route path="/dashboard" element={<ProfileDash />} />
            <Route path="/wishlist" element={<Wishlist />} />
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </CartProvider>
  );
}

export default App;
