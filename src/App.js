import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Home from './components/Home';


function App() {
  return (
    <div >

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/Products' element={<Products/>}/>
    <Route path="/product/:id" element={<ProductDetail/>} />
    <Route path="/cart" element={<CartPage/>} />











    </Routes>
    </div>
  );
}

export default App;
