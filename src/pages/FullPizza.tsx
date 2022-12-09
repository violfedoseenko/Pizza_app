import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  // используется для оповещения компонета о том, что  нужно сделать перерисовку
  // и вернуть в переменную динамически передаваемые параметры из адресной строки
  const { id } = useParams()
  const navigate = useNavigate() // типа useDispatch только для react-router

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://633de0927e19b17829176b54.mockapi.io/items/${id}`
        )
        setPizza(data)
        console.log(data)
      } catch {
        alert('Ошибка при получении пиццы!')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) return <div className="flex-wrapper"> Зaгрузка...</div>

  return (
    <div className="container">
      <div className="flex-wrapper">
        <img className="pizza-img" src={pizza.imageUrl} alt="img" />
        <h1>{pizza.title}</h1>
        <h2>{pizza.price} p</h2>
        <Link to="/gcjhlkj">
          <button className="button button--outline">Назад</button>
        </Link>
      </div>
    </div>
  )
}

export default FullPizza
