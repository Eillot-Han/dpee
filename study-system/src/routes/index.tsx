import Login from '@/modules/login'
import Welcome from '@/modules/welcome'

const routes = [
  {
    path: '/',
    element: <Welcome />,
    title: '首页',
  },
  {
    path: '/login',
    element: <Login />,
    title: '登录',
  },
  {
    path: '/welcome',
    element: <Welcome />,
    title: '欢迎页',
  },
]

export default routes
