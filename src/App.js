import React, { useEffect, useState } from 'react';
import Categories from './comonents/Categories';
import Header from './comonents/Header';
import PizzaBlock from './comonents/PizzaBlock';
import Skeleton from './comonents/PizzaBlock/skeleton';
import Sort from './comonents/Sort';
// import pizzas from './assets/pizzas.json';
import './scss/app.scss';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://633de0927e19b17829176b54.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => {
                  return <Skeleton key={index} />;
                })
              : items.map((pizza) => {
                  return <PizzaBlock key={pizza.id} {...pizza} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
