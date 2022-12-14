import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSortType, SortPropertyEnum } from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'

type SortListItem = {
  name: string
  sortProperty: SortPropertyEnum
}

export const list: SortListItem[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RAITING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RAITING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
]

export const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const currentSort = useSelector((store: RootState) => store.filter.sort)
  const [open, setOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  const onSelectSort = (obj: SortListItem) => {
    dispatch(setSortType(obj))
    setOpen(false)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const _event = event as MouseEvent & { path: Node[] }
      // if (sortRef.current && !_event.path.includes(sortRef.current)) {
      // вызывается при каждом монтировании компонента
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        // event.path мметод устаревший можно вместо этого использовать event.composedPath()
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      // вызывается при демонтировании компонента , аналог willUnmount()
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{currentSort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onSelectSort(obj)}
                  className={
                    currentSort.sortProperty === obj.sortProperty
                      ? 'active'
                      : ''
                  }
                >
                  {obj.name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
})
