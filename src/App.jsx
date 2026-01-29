import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./layout/Footer";

import DashboardLayout from "./layout/Dashboardlayout";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import AOffers from "./pages/admin/AOffersD";
import ACategories from "./pages/admin/ACategories";
import ASubCategories from "./pages/admin/ASubCategories";
import AProducts from "./pages/admin/AProducts";
import AStock from "./pages/admin/AStock";
import ARawMaterial from "./pages/admin/ARawMaterial";
import AProduction from "./pages/admin/AProduction";
import APurchases from "./pages/admin/APurchases";
import APurchaseReturn from "./pages/admin/APurchaseReturn";
import ACustomers from "./pages/admin/ACustomers";
import AVendors from "./pages/admin/AVendors";
import ADeliveryperson from "./pages/admin/ADeliveryperson";
import AOrder from "./pages/admin/AOrder";
import AOrderstatus from "./pages/admin/AOrderstatus";
import ADeliveryAssign from "./pages/admin/ADeliveryAssign";
import AReturn from "./pages/admin/AReturn";
import ACancellations from "./pages/admin/ACancellations";
import AQuotations from "./pages/admin/AQuotations";
import APayments from "./pages/admin/APayments";
import AReport from "./pages/admin/AReport";
import AFeedback from "./pages/admin/AFeedback";
import ANotifications from "./pages/admin/ANotifications";
import AInquiries from "./pages/admin/AInquiries";
import ACompanydetail from "./pages/admin/ACompanydetail";
import { BadgeTurkishLiraIcon } from "lucide-react";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/adminpage" element={<><Navbar /><AdminPage /></>} />

        {/* Admin Routes (NO NAVBAR) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Dashboard at /dashboard */}
          <Route index element={<Dashboard />} />
          {/* Product Management */}
          <Route path="aproducts" element={<AProducts />} />
          <Route path="acategories" element={<ACategories />} />
          <Route path="asub-categories" element={<ASubCategories />} />
          <Route path="aoffers" element={<AOffers />} />

          {/* Add other routes as needed */}
          {/* Inventory & Production Routes */}
          <Route path="astock" element={<AStock />} />
          <Route path="araw-materials" element={<ARawMaterial />} />
          <Route path="aproduction" element={<AProduction />} />
          <Route path="apurchases" element={<APurchases />} />
          <Route path="apurchase-returns" element={<APurchaseReturn />} />


          <Route path="acustomers" element={<ACustomers />} />
          <Route path="avendors" element={<AVendors />} />
          <Route path="adelivery-persons" element={<ADeliveryperson />} />


          <Route path="aorder" element={<AOrder />} />
          <Route path="aorderstatus" element={<AOrderstatus />} />
          <Route path="adeliveryassign" element={<ADeliveryAssign />} />
          <Route path="areturn" element={<AReturn />} />
          <Route path="acancellations" element={<ACancellations />} />


          <Route path="aquotations" element={<AQuotations />} />


          <Route path="apayments" element={<APayments />} />
          <Route path="areport" element={<AReport />} />


          <Route path="afeedback" element={<AFeedback />} />
          <Route path="anotifications" element={<ANotifications />} />
          <Route path="ainquiries" element={<AInquiries />} />


          <Route path="acompany-details" element={<ACompanydetail />} />
        </Route>
      </Routes>
    </Router>
  );
}



// config array ma 
// App.jsx ma 
// sidebar ma