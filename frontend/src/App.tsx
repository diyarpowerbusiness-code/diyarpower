import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetail } from './pages/ProductDetail';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { pingApi } from './api';

import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminMedia } from './admin/AdminMedia';
import { AdminSettings } from './admin/AdminSettings';
import { AdminHomePage } from './admin/AdminHomePage';
import { AdminAboutPage } from './admin/AdminAboutPage';
import { AdminContactPage } from './admin/AdminContactPage';
import { AdminProductsPage } from './admin/AdminProductsPage';
import { AdminServicesPage } from './admin/AdminServicesPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function App() {
  useEffect(() => {
    pingApi();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="homepage" element={<AdminHomePage />} />
          <Route path="about-page" element={<AdminAboutPage />} />
          <Route path="products-page" element={<AdminProductsPage />} />
          <Route path="contact-page" element={<AdminContactPage />} />
          <Route path="services-page" element={<AdminServicesPage />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/category/:categorySlug" element={<CategoryPage />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
