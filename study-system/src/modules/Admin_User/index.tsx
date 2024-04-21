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

const BasicInfo = () => {
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
};

// 安全设置组件
const SecuritySettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // 这里处理更改密码的逻辑，比如发送请求到服务器验证旧密码并更新新密码
    console.log('Received values of form:', values);
    // 模拟成功提示
    // message.success('密码已更改');
  };

  return (
    <Form 
    layout="vertical" 
    form={form} 
    onFinish={(values) => {
      const formData = new FormData();
      formData.append('account', values.userId);
      formData.append('password', values.password);
      axios.post('/user/updatePassword', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          const apiResponse: LoginResponse = response.data
          if (apiResponse.code === 200 && apiResponse.msg === '修改成功') {
            const userData = apiResponse.data;
            localStorage.setItem('userInfo', JSON.stringify(userData));

            console.log('Selected gender:', localStorage);
            // localStorage.setItem('accessToken', response.data.login.token.accessToken)
            // localStorage.setItem('refreshToken', response.data.login.token.refreshToken)
            message.success('修改成功');
            // setTimeout(() => {
            //   navigate('/')
            // }, 1000)
          }else if(apiResponse.code === 500 && apiResponse.msg === '密码不正确') {
            message.success('密码不正确');
          }
        })
        .catch((err) => {
          message.error('修改失败');
        })
    }}
    >
      <Form.Item
        label="当前密码"
        name="currentPassword"
        rules={[{ required: true, message: '请输入当前密码!' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="新密码"
        name="newPassword"
        rules={[{ required: true, message: '请输入新密码!' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="确认新密码"
        name="confirmNewPassword"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          { required: true, message: '请再次输入新密码!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的新密码不一致!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          更改密码
        </Button>
      </Form.Item>
    </Form>
  );
};

// 定义标签页标题和对应组件
const labels = ['基本资料', '安全设置'];
const components = [BasicInfo, SecuritySettings];

// 将标签页内容映射到数组中
const tabPanes = labels.map((label, index) => ({
  key: label,
  tab: label,
  component: components[index],
}));


// 主组件保持不变，只是将原来的基本信息和安全设置组件替换成带有表单的版本
export default function Admin_User() {
  return (
    <div style={{ padding: '0 24px' }}>
      <Tabs defaultActiveKey="基本资料">
        {tabPanes.map(({ key, tab, component }) => (
          <Tabs.TabPane key={key} tab={tab}>
            {component()}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}