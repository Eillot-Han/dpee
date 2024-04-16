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
    path: '/teacher',
    element: <Welcome />,
    title: '教师端',
  },
  {
    path: '/student',
    element: <Welcome />,
    title: '学生端',
  },
  {
    path: '/admin',
    element: <Welcome />,
    title: '服务端',
  },
  {
    path: '/exam',
    element: <Welcome />,
    title: '考试界面',
  },{
    path: '/welcome',
    element: <Welcome />,
    title: '欢迎页',
  },
  {
    path: '/welcome',
    element: <Welcome />,
    title: '欢迎页',
  },
]

export default routes
