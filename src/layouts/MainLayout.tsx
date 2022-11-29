import { Outlet } from 'react-router-dom'
import Header from '../comonents/Header'
const Mainlayout: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Mainlayout
