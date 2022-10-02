import React from 'react';
import Categories from './comonents/Categories';
import Header from './comonents/Header';
import PizzaBlock from './comonents/PizzaBlock';
import Sort from './comonents/Sort';
import pizzas from './assets/pizzas.json';
import './scss/app.scss';

function App() {
  console.log(pizzas);
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
            {pizzas.map((pizza) => {
              return (
                <PizzaBlock
                  key={pizza.id}
                  title={pizza.title}
                  price={pizza.price}
                  img={pizza.imageUrl}
                  sizes={pizza.sizes}
                  types={pizza.types}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
