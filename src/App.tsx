import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/Homepage/HomePage.tsx";
import ProductListingPage from "./pages/ProductListingPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import ProfilePage from "./components/ecommerce/account/ProfilePage.tsx";
import OrdersPage from "./components/ecommerce/account/OrdersPage.tsx";
import AddressesPage from "./components/ecommerce/account/AddressesPage.tsx";
import InventoryPage from "./components/ecommerce/inventory/InventoryPage.tsx";
import ProductUploadPage from "./components/ecommerce/inventory/ProductUploadPage.tsx";
import BulkUploadPage from "./components/ecommerce/inventory/BulkUploadPage.tsx";
import ProductUpdatePage from "./components/ecommerce/inventory/ProductUpdatePage.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { RoleProvider } from "./contexts/RoleContext.tsx";
import "./App.css";

function App() {
  return (
    <RoleProvider>
      <CartProvider>
        <Routes>
          {/* Preserved Original Route */}
          <Route path="/" Component={HomePage} />

          {/* E-Commerce Product Catalog Routes */}
          <Route path="/products" Component={ProductListingPage} />
          <Route path="/products/:id" Component={ProductDetailPage} />

          {/* User Account Navigation Routes */}
          <Route path="/account/profile" Component={ProfilePage} />
          <Route path="/account/orders" Component={OrdersPage} />
          <Route path="/account/addresses" Component={AddressesPage} />
          <Route path="/account/wishlist" element={<Navigate to="/account/profile" replace />} />
          <Route path="/account/settings" element={<Navigate to="/account/profile" replace />} />

          {/* Sales & Admin Inventory Readiness Routes */}
          <Route path="/inventory" Component={InventoryPage} />
          <Route path="/inventory/upload-single" Component={ProductUploadPage} />
          <Route path="/inventory/upload-bulk" Component={BulkUploadPage} />
          <Route path="/inventory/update-single" Component={ProductUpdatePage} />
          <Route path="/inventory/update-bulk" Component={BulkUploadPage} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </CartProvider>
    </RoleProvider>
  );
}

export default App;
