import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, InputNumber, Select, message } from 'antd'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import './index.scss'

type QuestionFormData = {
  id: string;
  content: string;
  answer: string;
  createTableSql: string;
  deleteTableSql: string;
  score: number;
  difficulty: string;
}

export default function Teacher_Question_CREATE() {
  const navigate = useNavigate();
  const [form] = Form.useForm<QuestionFormData>();
  let t : any;
  const [createQuestion, { loading }] = useMutation(t, {
    variables: {
      questionData: form.getFieldsValue(),
    },
    onCompleted: () => {
      message.success('题目创建成功！');
      navigate('/teacher/questions'); // 返回题目列表页面
    },
    onError: (error) => {
      message.error('题目创建失败：' + error.message);
    },
  });

  const handleFinish = (formData: QuestionFormData) => {
    form.validateFields()
      .then(() => {
        createQuestion();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div className="teacher-question-create">
      <h1>创建题目</h1>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ difficulty: '中等' }}
      >
        <Form.Item
          name="id"
          label="题目ID"
          rules={[
            { required: true, message: '请输入题目ID' },
            { pattern: /^[A-Za-z0-9]+$/, message: '题目ID只能包含字母和数字' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="题目内容"
          rules={[{ required: true, message: '请输入题目内容' }]}
        >
          <Input.TextArea />
        </Form.Item>
        {/* 答案、创建表语句、删除表语句等其他字段类似 */}
        <Form.Item
          name="score"
          label="分数"
          rules={[{ required: true, message: '请输入分数' }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item
          name="difficulty"
          label="难度"
          rules={[{ required: true, message: '请选择难度等级' }]}
        >
          <Select>
          <Select.Option value="简单">简单</Select.Option>
          <Select.Option value="普通">普通</Select.Option>
          <Select.Option value="困难">困难</Select.Option>
        </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            创建题目
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}