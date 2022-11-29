import React from 'react'

type CategoriesProps = {
  activeCategoryId: number
  onChangeCategory: any
}

const Categories: React.FC<CategoriesProps> = ({
  activeCategoryId,
  onChangeCategory,
}) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

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

export default Categories
