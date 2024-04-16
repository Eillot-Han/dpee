import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export default function Admin() {
  return (
    <div className='login'>
      <div className='login-leftside'>
        <h1>管理端</h1>
      </div>
    </div>
  )
}
