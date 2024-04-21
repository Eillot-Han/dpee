import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message, Radio } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginResponse } from '../../model/userAPI'
import FormData from 'form-data';
import axios from 'axios'
import './index.scss'
import React, { FC } from 'react';
const CountDownButton = ({ email }: { email: string }) => {
  const [count, setCount] = useState(60)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    let interval: any = null
    if (isActive) {
      interval = setInterval(() => {
        setCount((count) => count - 1)
      }, 1000)
    } else if (!isActive && count !== 60) {
      setCount(60)
    }
    if (count === 0) {
      clearInterval(interval)
      setActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, count])

  const handleClick = () => {
    if (!isActive) {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      if (!isEmail) {
        message.error('邮箱格式错误！')
        return
      }
      // 发送验证码
    }
  }

  return (
    <a
      onClick={handleClick}
      type='text'
      style={isActive ? { cursor: 'no-drop', textDecoration: 'none', fontWeight: 400 } : {}}
    >
      {isActive ? `${count} 秒后可重发` : '获取验证码'}
    </a>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [type, setType] = useState('signIn')
  const [newEmail, setEmail] = useState('')

  return (
    <div className='login'>
      <div className='login-leftside'>
        <h1>数据库原理实验考试系统</h1>
        <p>本系统是一个集试题管理、在线考试、成绩统计、用户管理等功能于一体的在线考核系统。</p>
      </div>
      <div className='login-rightside'>
        {type === 'signIn' && (
          <div className='login-wrapper'>
            <p className='login-title'>欢迎登录</p>
            <Form
              form={form}
              layout='vertical'
              className='login-card-content'
              initialValues={{ 
                account: localStorage.getItem('username') || undefined, 
                password: localStorage.getItem('password') || undefined 
              }}
              onFinish={(values) => {
                axios.get('/user/login', {
                  params: {
                    account: values.account,
                    password: values.password,
                  }
                })
                  .then((response) => {
                    const apiResponse: LoginResponse = response.data
                    if (apiResponse.code === 200 && apiResponse.msg === 'success') {
                      const userData = apiResponse.data;
                      localStorage.setItem('userId', `${userData.user_id}`);
                      localStorage.setItem('userInfo', JSON.stringify(userData));
                      // localStorage.setItem('accessToken', response.data.login.token.accessToken)
                      // localStorage.setItem('refreshToken', response.data.login.token.refreshToken)
                      message.success('登录成功');
                      setTimeout(() => {
                        navigate('/')
                      }, 1000)
                    }
                  })
                  .catch((err) => {
                    message.error('登录失败');
                  })
              }}
              onFinishFailed={(errorInfo) => {
                console.log('Failed:', errorInfo)
              }}
            >
              <Form.Item
                label='账号'
                name='account'
                rules={[
                  {
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error('请输入账号!'))
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <Input placeholder='请输入账号' />
              </Form.Item>
              <Form.Item
                label='密码'
                name='password'
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password placeholder='请输入密码' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' block size='large'>
                  登录
                </Button>
              </Form.Item>
            </Form>
            <div className='login-card-bottom'>
              <a
                style={{ marginBottom: 16, display: 'block' }}
                onClick={() => {
                  setType('forget')
                }}
              >
                忘记密码
              </a>
              <p className='login-card-bottom-text'>
                没有账号？
                <a
                  onClick={() => {
                    setType('signUp')
                  }}
                >
                  立即注册
                </a>
              </p>
            </div>
          </div>
        )}
        {type === 'signUp' && (
          <div className='login-wrapper'>
            <p className='login-title'>欢迎注册</p>
            <Form
              form={form}
              layout='vertical'
              className='login-card-content'
              initialValues={{ sex: 'Male' }}
              onFinish={(values) => {
                const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  values.account,
                )
                const formData = new FormData();
                formData.append('account', values.account);
                formData.append('password', values.password);
                formData.append('sex', values.sex);
                formData.append('name', values.username);
                formData.append('email', values.email);
                formData.append('phone', values.phone);

                console.log('Selected gender:', values);

                axios.post('/user/enroll', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                  .then((response) => {
                    if (response.data.code === 200) {
                      localStorage.setItem('userId', `${values.username}`);
                      localStorage.setItem('password', `${values.password}`);
                      // localStorage.setItem('userInfo', JSON.stringify(formData));
                      message.success('注册成功');
                      setTimeout(() => {
                        setType('signIn')
                      }, 1000)
                    } else if(response.data.code === 500 && response.data.code === '账号已存在 (500)'){
                      message.error('账号已存在');
                    }
                  })
                  .catch((err) => {
                    message.error('注册失败');
                  })
              }}
              onFinishFailed={(errorInfo) => {
                console.log('Failed:', errorInfo)
              }}
            // onFieldsChange={(changedFields: any) => {
            //   if (changedFields[0] && changedFields[0].name[0] === 'email') {
            //     setEmail(changedFields[0].value)
            //   }
            // }}
            >
              <Form.Item
                label='学号（工号）'
                name='account'
                // rules={[
                //   {
                //     validator(_, value) {
                //       if (!value) {
                //         return Promise.reject(new Error('请输入学号（工号）!'))
                //       }
                //     },
                //   },
                // ]}
              >
                <Input placeholder='请输入学号（工号）' />
              </Form.Item>
              <Form.Item
                label='真实姓名'
                name='username'
                // rules={[
                //   {
                //     validator(_, value) {
                //       if (!value) {
                //         return Promise.reject(new Error('请输入真实姓名!'))
                //       }
                //     },
                //   },
                // ]}
              >
                <Input placeholder='请输入真实姓名' />
              </Form.Item>
              <Form.Item
                label='性别'
                name='sex'
                rules={[{ required: true, message: '请选择性别!' }]}
              >
                <Radio.Group>
                  <Radio value="Male"> 男 </Radio>
                  <Radio value="Female"> 女 </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label='邮箱'
                name='email'
                rules={[
                  { required: true, message: '请输入邮箱!' },
                  { type: 'email', message: '邮箱格式错误' },
                ]}
              >
                <Input placeholder='请输入邮箱' />
              </Form.Item>
              <Form.Item
                label='手机号'
                name='phone'
                rules={[
                  { required: true, message: '请输入手机号!' },
                ]}
              >
                <Input placeholder='请输入手机号' />
              </Form.Item>
              <Form.Item
                label='密码'
                name='password'
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password placeholder='请输入密码' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' block size='large'>
                  登录
                </Button>
              </Form.Item>
            </Form>
            <div className='login-card-bottom'>
              <p className='login-card-bottom-text'>
                已有账号？
                <a
                  onClick={() => {
                    setType('signIn')
                  }}
                >
                  立即登录
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
