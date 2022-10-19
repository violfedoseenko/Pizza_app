import React, { useState } from 'react';
import Header from './comonents/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
// import pizzas from './assets/pizzas.json';
import './scss/app.scss';
import Cart from './pages/Cart';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          {/* <div className="container"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* </div> */}
      </div>
    </SearchContext.Provider>
  );
}

export default App;
