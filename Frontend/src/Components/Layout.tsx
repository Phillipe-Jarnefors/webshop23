import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <div>
            <Header />
        </div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}
