import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Auth from './pages/Auth';
import { useSelector } from 'react-redux';
import DashBoard from './pages/dashBoard/DashBoard';
import HomeAdmin from './pages/home/HomeAdmin';
import UserList from './pages/userList/UserList';
import UserAdmin from './pages/user/UserAdmin';
import NewUserAdmin from './pages/newUser/NewUserAdmin';
import ProductAdmin from './pages/product/ProductAdmin';
import ProductListAdmin from './pages/productList/ProductListAmin';
import OrderList from './pages/orderList/OrderList';
import OrderDetailAdmin from './pages/orderDetail/OrderDetailAdmin';
import Approved from './pages/orderList/Approved';
import NewProductAdmin from './pages/newProduct/NewProductAdmin';
import Category from './pages/category/Category';
import NewCategory from './pages/newCategory/NewCategory';
import Brand from './pages/brand/Brand';
import NewBrand from './pages/newBrand/NewBrand';
import ProductAttribute from './pages/productAttribute/ProductAttribute';
import NewProductAttribute from './pages/newProductAttribute/NewProductAttribute';
import ProductReviewAdmin from './pages/productReview/ProductReviewAdmin';

function App() {
  const user = useSelector((state) => state.userAdmin?.currentUser?.user);

  return (
    <BrowserRouter>
      <Routes>
        {user && (
          <Route path="admin" element={<DashBoard />}>
            <Route path="home" element={<HomeAdmin />} />
            <Route path="users" element={<UserList />} />
            <Route path="user/:userId" element={<UserAdmin />} />
            <Route path="newUser" element={<NewUserAdmin />} />
            <Route path="products" element={<ProductListAdmin />} />
            <Route path="category" element={<Category />} />
            <Route path="newCategory" element={<NewCategory />} />

            <Route path="brand" element={<Brand />} />
            <Route path="newBrand" element={<NewBrand />} />

            <Route path="productAttribute" element={<ProductAttribute />} />
            <Route path="newProductAttribute" element={<NewProductAttribute />} />

            <Route path="products/:code" element={<ProductAdmin />} />
            <Route path="newproduct" element={<NewProductAdmin />} />
            <Route path="order/:code" element={<OrderDetailAdmin />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="delivery" element={<Approved />} />
            <Route path="reviewProduct" element={<ProductReviewAdmin />} />
          </Route>
        )}

        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={user ? <Navigate to="/admin/home" /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
