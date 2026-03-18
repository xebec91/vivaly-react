import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminRoute from './components/admin/AdminRoute';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

import HistoirePage from './pages/HistoirePage';
import FaqPage from './pages/FaqPage';
import SuiviPage from './pages/SuiviPage';
import ContactPage from './pages/ContactPage';

import RetourPage from './pages/RetourPage';
import ConfidentialitePage from './pages/ConfidentialitePage';
import LivraisonPage from './pages/LivraisonPage';
import UtilisationPage from './pages/UtilisationPage';
import CgvPage from './pages/CgvPage';

import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';

import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminEditUserPage from './pages/AdminEditUserPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route path="/histoire" element={<HistoirePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/suivi" element={<SuiviPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/retour" element={<RetourPage />} />
          <Route path="/confidentialite" element={<ConfidentialitePage />} />
          <Route path="/livraison" element={<LivraisonPage />} />
          <Route path="/utilisation" element={<UtilisationPage />} />
          <Route path="/cgv" element={<CgvPage />} />

          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users/edit/:id"
            element={
              <AdminRoute>
                <AdminEditUserPage />
              </AdminRoute>
            }
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;