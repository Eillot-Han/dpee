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

const userInfo = {
  username: '王昱烨',
  email: 'user@example.com',
  phone: '12345678900',
};


const BasicInfo = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    // 设置表单的默认值
    form.setFieldsValue(userInfo);
  }, [form]);

  const onFinish = (values: any) => {
    // 这里处理提交表单的逻辑，比如保存到数据库
    console.log('Received values of form:', values);
    // 可以在此处模拟保存操作，例如使用API请求
    // message.success('信息已保存');
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: '请输入账号!' }]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        label="姓名"
        name={['name', 'firstName']}
        rules={[{ required: true, message: '请输入姓名!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="姓氏"
        name={['name', 'lastName']}
        rules={[{ required: true, message: '请输入姓氏!' }]}
      >
        <Input />
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

      <Form.Item
        label="性别"
        name="gender"
      >
        <Select>
          <Select.Option value="male">男</Select.Option>
          <Select.Option value="female">女</Select.Option>
        </Select>
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
    <Form layout="vertical" form={form} onFinish={onFinish}>
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
export default function Student_User() {
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