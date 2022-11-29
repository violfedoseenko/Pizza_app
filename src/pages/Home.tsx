import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import Categories from '../comonents/Categories'
import Pagination from '../comonents/Pagination'
import PizzaBlock from '../comonents/PizzaBlock'
import Skeleton from '../comonents/PizzaBlock/skeleton'
import Sort from '../comonents/Sort'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isUrlSearch = useRef(false)
  const isMounted = useRef(false) // переменная хранит данные был ли совершен первый рендер
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    // @ts-ignore
    (state) => state.filter
  )
  // @ts-ignore
  const { items, status } = useSelector((state) => state.pizza)
  // @ts-ignore
  const currentSort = useSelector((store) => store.filter.sort)
  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const order = currentSort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = currentSort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `search=${searchValue}` : ''

    console.log('search', search)

    dispatch(
      // @ts-ignore
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    )
  }

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
      )
      navigate(`${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, currentPage, sort.sortProperty])

  // Если был первый рендер, парсим параметры поиска из url, если они есть, и передаем их в редакс, чтобы затем отобразить подходящие элементы
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) //убираем вопросительный знак в начале сроки
      dispatch(setFilters({ ...params }))
      isUrlSearch.current = true
    }
  }, [])

  // Если был первый рендер , о запрашиваем пиццы
  useEffect(() => {
    if (!isUrlSearch.current) {
      getPizzas()
    }
    isUrlSearch.current = false

    window.scrollTo(0, 0) //при переходе на новую страницу делать скролл вверх
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      {status === 'error' ? (
        <div className="content__notFound">
          <h2>Ничего не найдено =(</h2>
          <h3>Вернитесь на главную страницу</h3>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(4)].map((_, index) => {
                  return <Skeleton key={index} />
                })
              : items.map((pizza: any) => {
                  return (
                    <Link to={`/pizza/${pizza.id}`} key={pizza.id}>
                      <PizzaBlock {...pizza} />
                    </Link>
                  )
                })}
          </div>
        </>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home