import React, { useEffect, useState } from 'react';
import { Button, List, Input, Typography, Tag, Pagination } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';

// 题目数据结构
type Question = {
  question_id: number;
  question_content: string;
  type: string;
  difficulty: number;
  points: number;
  // 其他字段根据实际情况添加
};

const Teacher_Questions = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 使用 useLocation Hook 获取 location
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 创建题目
  const onCreateQuestion = () => {
    navigate('/createQuestion');
  };

  // 获取题目列表
  const fetchQuestions = async (page: number, type?: string, content?: string) => {
    setLoading(true);
    try {
      let url = `/questions/showQuestionsByPage?page=${page}&user_id=${localStorage.getItem('userId')}`;
      if (type) {
        url = `/questions/showQuestionsByType?page=${page}&question_type=${encodeURIComponent(type)}`;
      }
      if (content) {
        url = `/questions/showQuestionsByContent?page=${page}&question_content=${encodeURIComponent(content)}`;
      }
      const response = await axios.get<{ data: Question[], total: number }>(url);
      setQuestions(response.data.data);
      setTotalQuestions(response.data.total);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  // 页码改变事件
  const handlePageChange = (page: number, pageSize: number) => {
    navigate(`?page=${page}&size=${pageSize}`);
    fetchQuestions(page);
  };

  // 搜索题目类型
  const handleSearchType = (type: string) => {
    fetchQuestions(1, type);
  };

  // 搜索题目内容
  const handleSearchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    fetchQuestions(1, undefined, content);
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const page = search.get('page');
    const type = search.get('question_type');
    const content = search.get('question_content');

    // 使用类型断言确保 page 是 number 或 undefined
    const pageNumber = page ? parseInt(page as string, 10) : 1;

    // 使用逻辑与操作符确保 type 和 content 不是 null
    fetchQuestions(pageNumber, type ?? undefined, content ?? undefined);
  }, [location.key]); 

  // 题目列表项渲染
  const renderItem = (item: Question) => {
    return (
      <List.Item
        key={item.question_id}
        onClick={() => {
          localStorage.setItem('questionId', item.question_id.toString());
          // navigate('/createQuestion', { state: { from: location } });
        }}
      >
        <List.Item.Meta
          title={<Typography.Text ellipsis>{item.question_content}</Typography.Text>}
          description={
            <>
              <Tag color="blue">{item.type}</Tag>
              <Typography.Text type="secondary">{`难度: ${item.difficulty}`}</Typography.Text>
              <Typography.Text type="secondary">{`分值: ${item.points}`}</Typography.Text>
            </>
          }
        />
      </List.Item>
    );
  };

  return (
    <div className="teacher">
      <div className="header">
        <h1>所有题目</h1>
        <Button type="primary" onClick={onCreateQuestion}>创建题目</Button>
      </div>
      <div className="search-container">
        <Input.Search
          placeholder="输入题目类型"
          onSearch={handleSearchType}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Input.Search
          placeholder="输入题目内容"
          onChange={handleSearchContent}
          style={{ width: 200, marginBottom: 20 }}
        />
      </div>
      <div className="question-container">
        <List
          dataSource={questions}
          renderItem={renderItem}
          pagination={{
            current: currentPage,
            pageSize: 5,
            total: totalQuestions,
            onChange: handlePageChange,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Teacher_Questions;