import React from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem } from "../../redux/slices/cartSlice";

const CartItem = ({ id, title, type, price, imageUrl, count }) => {
  const dispatch = useDispatch();
  const onClickMinus = () => {
    dispatch(addItem({ id }));
  };
  const onClickPluse = () => {
    dispatch(minusItem(id));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, 26 см.</p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        ></button>
        <b>{count}</b>
        <button
          onClick={onClickPluse}
          className="button button--outline button--circle cart__item-count-plus"
        ></button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button className="button button--outline button--circle"></button>
      </div>
    </div>
  );
};

export default CartItem;
