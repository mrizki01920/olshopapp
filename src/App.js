import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Details from './Detail';
import Cart from './Cart';
import Checkout from './Checkout';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Details />} /> {/* Rute Dinamis */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;