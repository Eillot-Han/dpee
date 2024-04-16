import routes from '@/routes'
import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import Content from './components/content'
import Sidebar from './components/sidebar'
import Fullwidth from './components/fullwidth-content'
import './index.scss'
import { message } from 'antd'

export default function LayoutItem() {
  const routerElement = useRoutes(routes)
  const path = routerElement?.props.match.pathname
  const navigate = useNavigate()
  useEffect(() => {
    // if (!localStorage.getItem('userInfo') && path !== '/login') {
    //   navigate('/login')
    //   message.info('请登录!')
    // }
  }, [navigate, path])
  return (
    <div className='tsc'>
      {routerElement?.props.match.pathname !== '/login' &&
      !routerElement?.props.match.pathname.includes('/publish') ? (
        <>
          <Sidebar />
          <Content>{routerElement}</Content>
        </>
      ) : (
        <Fullwidth>{routerElement}</Fullwidth>
      )}
    </div>
  )
}
