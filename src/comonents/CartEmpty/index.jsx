import React from "react";
import { Link } from "react-router-dom";
import emptyCardImg from "../../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <div>
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCardImg} alt="Empty cart" />
        <Link className="button button--black" to="/">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
