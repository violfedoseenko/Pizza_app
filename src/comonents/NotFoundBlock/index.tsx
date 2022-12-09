import React from 'react'
import style from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.root}>
      <h1>
        <span>=(</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={style.description}>
        {' '}
        К сожалению данная страница отстствует в нашем интернет магазине
      </p>
    </div>
  )
}
