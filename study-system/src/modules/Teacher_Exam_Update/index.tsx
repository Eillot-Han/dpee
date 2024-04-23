import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Breadcrumb, Button, DatePicker, Empty, Form, Input, Layout, Menu, MenuProps, Select, Space, Tabs, TabsProps, message } from 'antd'
import { useEffect, useState, version } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import React from 'react';
import "@/styles/common.scss";
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import axios from 'axios'
import { LoginResponse } from '@/model/userAPI'



const storedUserInfo = localStorage.getItem('userInfo');
let userInfoObject;
if (storedUserInfo) {
  userInfoObject = JSON.parse(storedUserInfo);
}
const userInfo = {
  userId: localStorage.getItem('userId') || undefined,
  username: userInfoObject?.username || undefined,
  email: userInfoObject?.email || undefined,
  phone: userInfoObject?.phone || undefined,
  firstName: userInfoObject?.firstName || undefined,
  lastName: userInfoObject?.lastName || undefined,
};
// console.log('Selected gender:', localStorage);


// 主组件保持不变，只是将原来的基本信息和安全设置组件替换成带有表单的版本
export default function Teacher_Exam_Update() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // 设置表单的默认值
    form.setFieldsValue(userInfo);
  }, [form]);

  return (
    <Form
      layout="vertical"
      form={form}
      className='user-card-content'
      onFinish={(values) => {
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          values.account,
        )
        const formData = new FormData();
        formData.append('account', values.userId);
        formData.append('username', values.username);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        axios.post('/user/updateEmail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            const apiResponse: LoginResponse = response.data
            // if (apiResponse.code === 200 && apiResponse.msg === '修改成功') {
              const userData = apiResponse.data;
              localStorage.setItem('userInfo', JSON.stringify(userData));

              console.log('Selected gender:', localStorage);
              // localStorage.setItem('accessToken', response.data.login.token.accessToken)
              // localStorage.setItem('refreshToken', response.data.login.token.refreshToken)
              message.success('修改成功');
              // setTimeout(() => {
              //   navigate('/')
              // }, 1000)
            // }
          })
          .catch((err) => {
            message.error('修改失败');
          })
      }}
    >
      <Form.Item
        label="账号"
        name="userId"
        rules={[{ required: true, message: '请输入账号!' }]}
      >
        <Input placeholder='请输入账号' />
      </Form.Item>

      <Form.Item
        label="姓名"
        name="username"
        rules={[{ required: true, message: '请输入姓名!' }]}
      >
        <Input placeholder='请输入姓名' />
      </Form.Item>

      <Form.Item
        label="姓"
        name="firstName"
        rules={[{ required: true, message: '请输入姓!' }]}
      >
        <Input placeholder='请输入姓' />
      </Form.Item>

      <Form.Item
        label="名"
        name="lastName"
        rules={[{ required: true, message: '请输入名!' }]}
      >
        <Input placeholder='请输入名' />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, type: 'email', message: '请输入正确的邮箱地址!' }]}
      >
        <Input prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' }]}
      >
        <Input prefix={<PhoneOutlined />} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存修改
        </Button>
      </Form.Item>
    </Form>
  );
}