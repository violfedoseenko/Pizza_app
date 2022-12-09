import React from 'react'

type CategoriesProps = {
  activeCategoryId: number
  onChangeCategory: (i: number) => void // функция ничего не возвращает
}

const categories = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeCategoryId, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                className={index === activeCategoryId ? 'active' : ''}
              >
                {categoryName}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
)
