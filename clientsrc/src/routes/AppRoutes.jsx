import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CardPage from "../pages/CardPage";
import LoginPage from "../pages/LoginPage";
import Navbar from "../components/common/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/common/Footer";
import ViewDetails from "../components/ViewDetails/ViewDetails";
import BuyNow from "../components/BuyNow/BuyNow";
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import ProductCreation from "../pages/ProductCreation";
import ProductBulkUpload from "../pages/ProductBulkUpload";
import OrderList from "../pages/OrderList";
import UserList from "../pages/UserList";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname === "/" && <SearchBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/product/:id" element={<ViewDetails />} />
        <Route
          path="/cardpage"
          element={
            <ProtectedRoute>
              <CardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/productcreation" element={<ProductCreation />} />
        <Route path="/productbulkupload" element={<ProductBulkUpload />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default AppRoutes;