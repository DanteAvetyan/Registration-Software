import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import SignIn from './SignIn';
import SignUp from './SignUp';
import Checkout from "./Checkout";
import { UserProvider } from './components/UserContext'; // for user data context
import { PayProvider } from './components/PayContext'; // for payment data context

const App = () => {
    return (
        <PayProvider>
            <UserProvider>
                <Router>
                    <CartProvider>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                    </CartProvider>
                </Router>
            </UserProvider>
        </PayProvider>
    );
};

export default App;
