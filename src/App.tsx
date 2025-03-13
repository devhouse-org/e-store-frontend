import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import ProtectedRoute from "@/components/ProtectedRoute";
import BannerDetails from "@/pages/BannerDetails";
import Wishlist from "@/pages/Wishlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Auction from "./pages/auctions/Auction";
import Auctions from "./pages/auctions/Auctions";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Signup from "./pages/auth/Signup";
import Blog from "./pages/blog/Blog";
import Blogs from "./pages/blog/Blogs";
import Brands from "./pages/brands/Brands";
import Cart from "./pages/cart/Cart";
import Comparison from "./pages/comparison/Comparison";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardComparisons from "./pages/dashboard/DashboardComparisons";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardWishlist from "./pages/dashboard/DashboardWishlist";
import Notifications from "./pages/dashboard/Notifications";
import OrderDetails from "./pages/dashboard/OrderDetails";
import Profile from "./pages/dashboard/Profile";
import PurchaseHistory from "./pages/dashboard/PurchaseHistory";
import Product from "./pages/products/Product";
import Products from "./pages/products/Products";
import RefundPolicy from "./pages/refund-policy/refund-policy";
import SecurityPolicy from "./pages/security-policy/security-policy";
import SupportPolicy from "./pages/support-policy/support-policy";
import TermsConditions from "./pages/terms-conditions/TermsConditions";
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

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
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
                <Route path="notifications" element={<Notifications />} />
              </Route>
              <Route path="/wishlist" element={<Wishlist />} />
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
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
