import React, { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../comonents/Categories';
import Pagination from '../comonents/Pagination';
import PizzaBlock from '../comonents/PizzaBlock';
import Skeleton from '../comonents/PizzaBlock/skeleton';
import Sort from '../comonents/Sort';

const Home = () => {
  const dispatch = useDispatch();
  const activeCategoryIndex = useSelector((state) => state.filter.categoryId);
  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  console.log('redux stste', activeCategoryIndex);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [currentSort, setCurrentSort] = useState({ name: 'популярности', sortProperty: 'raiting' });
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    const order = currentSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = currentSort.sortProperty.replace('-', '');
    const category = activeCategoryIndex > 0 ? `category=${activeCategoryIndex}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    setIsLoading(true);
    fetch(
      `https://633de0927e19b17829176b54.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0); //при переходе на новую страницу делать скролл вверх
  }, [activeCategoryIndex, currentSort, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategoryId={activeCategoryIndex} onChangeCategory={onChangeCategory} />
        <Sort currentSort={currentSort} onChangeSort={(index) => setCurrentSort(index)} />
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
