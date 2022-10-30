import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import Categories from "../comonents/Categories";
import Pagination from "../comonents/Pagination";
import PizzaBlock from "../comonents/PizzaBlock";
import Skeleton from "../comonents/PizzaBlock/skeleton";
import Sort from "../comonents/Sort";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, currentPage } = useSelector((state) => state.filter);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const currentSort = useSelector((store) => store.filter.sort);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    const order = currentSort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = currentSort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    setIsLoading(true);

    axios
      .get(
        `https://633de0927e19b17829176b54.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((res) => setItems(res.data), setIsLoading(false));

    window.scrollTo(0, 0); //при переходе на новую страницу делать скролл вверх
  }, [categoryId, currentSort, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
