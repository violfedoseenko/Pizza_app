import React, { useEffect, useState, useContext, useRef } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import Categories from "../comonents/Categories";
import Pagination from "../comonents/Pagination";
import PizzaBlock from "../comonents/PizzaBlock";
import Skeleton from "../comonents/PizzaBlock/skeleton";
import Sort from "../comonents/Sort";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUrlSearch = useRef(false);
  const isMounted = useRef(false); // переменная хранит данные был ли совершен первый рендер
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      // тут берутся параметры из редакса и расшиваются для корректного отображения в адресной строке
      // и это происходит только при втором и последующих рендерах
      const queryString = qs.stringify(
        {
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true } // добавляет знак вопроса перед параметрами
      );
      navigate(`${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sort.sortProperty]);

  // Если был первый рендер, парсим параметры поиска из url, если они есть, и передаем их в редакс, чтобы затем отобразить подходящие элементы
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); //убираем вопросительный знак в начале сроки
      dispatch(setFilters({ ...params }));
      isUrlSearch.current = true;
    }
  }, []);

  const currentSort = useSelector((store) => store.filter.sort);

  const fetchPizzas = () => {
    const order = currentSort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = currentSort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    setIsLoading(true);

    axios
      .get(
        `https://633de0927e19b17829176b54.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  // Если был первый рендер , о запрашиваем пиццы
  useEffect(() => {
    if (!isUrlSearch.current) {
      fetchPizzas();
    }
    isUrlSearch.current = false;

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
