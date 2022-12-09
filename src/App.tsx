import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'
import Mainlayout from './layouts/MainLayout'
import Home from './pages/Home'
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza"*/ './pages/FullPizza')
)
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ './pages/Cart')
)
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound')
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
