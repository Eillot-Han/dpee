import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, Typography, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import Countdown from 'antd/es/statistic/Countdown'

type Question = {
  id: number;
  content: string;
}
const defaultQuestions: Question[] = [
  { id: 1, content: '这是第一题...' },
  { id: 2, content: '这是第二题...' },
  // 更多题目...
]

interface SQLAnswerProps {
  onChange: (sql: string) => void; // 提供一个处理SQL答案变化的回调函数
}

const SQLAnswerInput: React.FC<SQLAnswerProps> = ({ onChange }) => {
  return (
    <div className="answer-input">
      <label htmlFor="sql-answer"></label>
      <textarea
        id="sql-answer"
        name="sql-answer"
        rows={6}
        placeholder="请在这里写下你的SQL语句..."
        required
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default function Exam() {


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examInfo, setExamInfo] = useState({
    title: '期末考试',
    duration: 120, // 考试总时长（分钟）
  });

  const countdownRef = useRef<any>(null);

  const handleSQLChange = (sql: string) => {
    // 在这里处理SQL语句的变化，比如存储到状态或者验证等
  };
  // 倒计时结束时触发的回调函数
  const onCountdownEnd = () => {
    // 提示考试时间结束，或者自动提交试卷等操作
    message.warning('考试时间已结束，请尽快提交试卷');
  };

  // 开始倒计时
  useEffect(() => {
    if (examInfo.duration) {
      countdownRef.current = setInterval(() => {
        // 更新剩余时间或触发结束考试的操作
        // ...
      }, 60000); // 每分钟更新一次
    }

    // 清理定时器
    return () => clearInterval(countdownRef.current);
  }, [examInfo.duration]);

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < defaultQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const saveAnswer = () => {
    // 保存当前答案的逻辑
    // ...
  };

  return (
    <div className="exam">
      <div className="exam-info">
        <Typography.Title level={3}>{examInfo.title}</Typography.Title>
        {/* <Countdown
          title="剩余时间"
          value={examInfo.duration * 60}
          format="mm:ss"
          onFinish={onCountdownEnd}
        /> */}
      </div>
      <div className="question-section">
        <div className="question-content">
          <Typography.Text strong>{defaultQuestions[currentQuestionIndex].content}</Typography.Text>
        </div>
        <div className="answer-input">
          <div className="exam-section">
            <SQLAnswerInput onChange={handleSQLChange} />
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <Button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>上一题</Button>
        <Button onClick={nextQuestion} disabled={currentQuestionIndex === defaultQuestions.length - 1}>下一题</Button>
        <Button onClick={saveAnswer}>保存</Button>
      </div>
    </div>
  );
}
