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
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { CartProvider } from "./context/CartContext";
import Wishlist from "@/pages/Wishlist";
import ScrollToTop from "./components/ScrollToTop";
import ProfileDash from "./pages/dashboard/ProfileDash";
import Comparison from "./pages/comparison/Comparison";
import NotFound from "./components/NotFound";
import Blogs from "./pages/blog/Blogs";
import Blog from "./pages/blog/Blog";
import Brands from "./pages/brands/Brands";
import ProtectedRoute from "@/components/ProtectedRoute";
import PurchaseHistory from "./pages/dashboard/PurchaseHistory";
import DashboardComparisons from "./pages/dashboard/DashboardComparisons";
import Profile from "./pages/dashboard/Profile";
import DashboardWishlist from "./pages/dashboard/DashboardWishlist";
import OrderDetails from "./pages/dashboard/OrderDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BannerDetails from "@/pages/BannerDetails";
import TermsConditions from "./pages/terms-conditions/TermsConditions";
import SecurityPolicy from "./pages/security-policy/security-policy"; 
import RefundPolicy from "./pages/refund-policy/refund-policy";
import SupportPolicy from "./pages/support-policy/support-policy";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div dir="rtl" className="pt-[92px] bg-blue-100/10">
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

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route index element={<Dashboard />} />
                <Route path="history" element={<PurchaseHistory />} />
                <Route path="wishlist" element={<DashboardWishlist />} />
                <Route path="comparisons" element={<DashboardComparisons />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="/wishlist" element={<Wishlist />} />
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Comparison Route */}
              <Route path="/comparison" element={<Comparison />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:id" element={<Blog />} />

              {/* Brands Route */}
              <Route path="/brands" element={<Brands />} />

              {/* Banner Route */}
              <Route path="/banner/:id" element={<BannerDetails />} />

              {/* Terms and Conditions Route */}
              <Route path="/terms-conditions" element={<TermsConditions />} />

              {/* Policy and Security Route */}
              <Route path="/security-policy" element={<SecurityPolicy />} />

              {/* Refund Policy Route */}
              <Route path="/refund-policy" element={<RefundPolicy />} />
              
              {/* Support Policy Route */}
              <Route path="/support-policy" element={<SupportPolicy />} />

              {/* 404 Route - Add this at the end */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
