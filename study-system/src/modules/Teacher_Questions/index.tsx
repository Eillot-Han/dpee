import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message, Typography, Tag, List } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

type Question = {
  id: string;
  content: string;
  tags: string[];
  difficulty: string;
}

const defaultQuestions: Question[] = [
  {
    id: 'Q1',
    content: '这是一个示例题目...',
    tags: ['聚合', '查询'],
    difficulty: '中等',
  },
  {
    id: 'Q1',
    content: '这是一个示例题目...',
    tags: ['聚合', '查询'],
    difficulty: '中等',
  },
  {
    id: 'Q1',
    content: '这是一个示例题目...',
    tags: ['聚合', '查询'],
    difficulty: '中等',
  },
  {
    id: 'Q1',
    content: '这是一个示例题目...',
    tags: ['聚合', '查询'],
    difficulty: '中等',
  },
  {
    id: 'Q1',
    content: '这是一个示例题目...',
    tags: ['聚合', '查询'],
    difficulty: '中等',
  },
  // 更多默认题目...
]

export default function Teacher_Questions() {
  const navigate = useNavigate();

  // 示例用途，实际项目中应从API获取题目数据
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);

  // 创建题目的模拟函数
  const onCreateQuestion = () => {
    // 在这里发起创建题目的API请求
    // ...
  };

  return (
    <div className="teacher">
      <div className="header">
        <h1>所有题目</h1>
        <Button type="primary" onClick={onCreateQuestion}>创建题目</Button>
      </div>
      <div className="question-container">
        <List
          dataSource={questions}
          renderItem={(item: Question) => (
            <div className="question-item">
              <div className="question-id">ID: {item.id}</div>
              <div className="question-detail">
                <Typography.Paragraph>{item.content}</Typography.Paragraph>
                <div className="tags">
                  {item.tags.map(tag => (
                    <Tag color="blue" key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="difficulty">难度：{item.difficulty}</div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}