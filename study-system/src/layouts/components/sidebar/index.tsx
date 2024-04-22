import routes from '@/routes'
import menu from './menu'
import { useNavigate, useRoutes } from 'react-router-dom'
import { Button, message } from 'antd'
import './index.scss'

export default function Sidebar() {
  const routerElement = useRoutes(routes)
  const navigate = useNavigate()

  const navi = (path: string) => {
    if (routerElement?.props.match.pathname !== path) {
      navigate(path)
    }
  }
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '')
    : null

  return (
    <div className='tsc-sidebar'>
      {userInfo ? (
        <>
          <Button
            className='tsc-sidebar-logout'
            icon={
              <img
                alt='icon'
                src={require('../../../assets/icon/logout.png')}
                className='tsl-icon'
              />
            }
            onClick={() => {
              localStorage.removeItem('userInfo')
              localStorage.removeItem('token')
              message.success('退出登陆成功')
              navi('/login')
            }}
          >
            退出登录
          </Button>
          <div className='tsc-sidebar-log'>
            {/* <img alt='avatar' src={userInfo.avatar} className='tsl-avatar' /> */}
            <p className='tsl-name'>{userInfo.username}</p>
          </div>
        </>
      ) : (
        <Button onClick={() => navi('/login')}>登陆</Button>
      )}
      <div className='tsc-sidebar-menu'>
        {menu
          .find((val) => val.type === (userInfo ? userInfo.user_role : 'Admin'))
          ?.contents.map((menuItem) => (
            <div
              key={'sidebar-' + menuItem.default}
              className={
                routerElement?.props.match.pathname === menuItem.path
                  ? 'tsm-wrapper tsm-wrapper_choosed'
                  : 'tsm-wrapper'
              }
              onClick={() => {
                navi(menuItem.path)
              }}
            >
              <img
                alt='icon'
                src={
                  routerElement?.props.match.pathname === menuItem.path
                    ? menuItem.choosed_icon
                    : menuItem.default_icon
                }
                className='tsm-icon'
              />
              <p className='tsm-font'>{menuItem.default}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
