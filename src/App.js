import React, { useState } from 'react';
import Header from './comonents/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
// import pizzas from './assets/pizzas.json';
import './scss/app.scss';
import Cart from './pages/Cart';

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        {/* <div className="container"> */}
        <Routes>
          <Route
            path="/"
            element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
