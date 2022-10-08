import React, { useEffect, useState } from 'react';
import Categories from '../comonents/Categories';
import PizzaBlock from '../comonents/PizzaBlock';
import Skeleton from '../comonents/PizzaBlock/skeleton';
import Sort from '../comonents/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://633de0927e19b17829176b54.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
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
  );
};

export default Home;
