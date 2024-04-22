import React from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 定义题目数据结构
type QuestionFormData = {
  question_id: any;
  content: any;
  type: any;
  answer: any;
  createTable: any;
  deleteTable: any;
  points: any;
  difficulty: any;
  createBy: any;
};

const Teacher_Question_CREATE = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<QuestionFormData>();

  // 处理表单提交
  const handleFinish = async (values: QuestionFormData) => {
    try {
      // 验证表单
      await form.validateFields();
      const formData = new FormData();
      formData.append('question_id', values.question_id);
      formData.append('question_content', values.content);
      formData.append('question_type', values.type);
      formData.append('answer', values.answer);
      formData.append('create_table', values.createTable);
      formData.append('delete_table', values.deleteTable);
      formData.append('points', values.points);
      formData.append('difficulty', values.difficulty);
      formData.append('create_by', values.createBy);
      console.log(formData);
      // 发送 POST 请求到服务器
      const response = await axios.post<QuestionFormData>('/questions/createQuestions',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        // 如果创建成功，显示成功消息并重定向到题目列表页面
        message.success('题目创建成功！');
        navigate('/teacher/questions');
      } else {
        // 如果创建失败，显示错误消息
        message.error('题目创建失败');
      }
    } catch (error) {
      // 如果请求失败，显示错误消息
      // message.error('题目创建失败：' + error.message);
    }
  };

  return (
    <div className="teacher-question-create">
      <h1>创建题目</h1>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="question_id"
          label="题目ID"
          rules={[{ required: true, message: '请输入题目ID!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="content"
          label="题目内容"
          rules={[{ required: true, message: '请输入题目内容!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="type"
          label="题目类型"
          rules={[{ required: true, message: '请选择题目类型!' }]}
        >
          <Select>
            {/* 这里添加具体的选项 */}
            <Select.Option value="查询">类型1</Select.Option>
            <Select.Option value="CRUD">CRUD</Select.Option>
            {/* ...更多类型... */}
          </Select>
        </Form.Item>
        <Form.Item
          name="answer"
          label="答案"
          rules={[{ required: true, message: '请输入答案!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="createTable"
          label="创建表SQL"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="deleteTable"
          label="删除表SQL"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="points"
          label="分值"
          rules={[{ required: true, message: '请输入分值!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="difficulty"
          label="难度"
          rules={[{ required: true, message: '请选择难度!' }]}
        >
          <Select>
            <Select.Option value={1}>简单</Select.Option>
            <Select.Option value={2}>中等</Select.Option>
            <Select.Option value={3}>困难</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="createBy"
          label="创建者"
          rules={[{ required: true, message: '请输入创建者ID!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建题目
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Teacher_Question_CREATE;