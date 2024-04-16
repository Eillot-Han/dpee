import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export default function Welcome() {
  return (
    <div className='login'>
      <div className='login-leftside'>
        <h1>欢迎您！</h1>
        <h1>数据库原理实验考试系统</h1>
        <p>本系统是一个集试题管理、在线考试、成绩统计、用户管理等功能于一体的在线考核系统。</p>
      </div>
    </div>
  )
}
