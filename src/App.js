import React from 'react';
import Header from './comonents/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import pizzas from './assets/pizzas.json';
import './scss/app.scss';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* <NotFound /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
