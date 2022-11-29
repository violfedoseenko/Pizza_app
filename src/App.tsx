import FullPizza from './pages/FullPizza'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'
import Cart from './pages/Cart'
import Mainlayout from './layouts/MainLayout'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
