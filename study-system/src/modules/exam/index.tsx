import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Alert, message } from 'antd';
import './index.scss'; // 引入CSS文件

const now = new Date();
let page = 1;

interface Question {
  id: number;
  content: string;
  question: string; // 确保这里有 question 属性
}

// 定义考试信息的接口
interface ExamInfo {
  title: string;
  duration: number; // 考试时长，单位分钟
  endTime: number; // 考试结束时间的时间戳
}

const Exam = () => {
  const navigate = useNavigate();
  let [questions, setQuestions] = useState<Question[]>([
    // 假设从服务器获取的题目数据结构如下
    { id: 0, content: '这是默认题目内容', question: '这是默认题目' },
    // ... 可以添加更多默认题目
  ]);
  let [answers, setAnswers] = useState<Record<number, string>>({});
  let [examInfo, setExamInfo] = useState<ExamInfo>({
    title: '未指定',
    duration: 0,
    endTime: 0,
  });
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let countdownRef = useRef<NodeJS.Timeout | null>(null);

  // 定义倒计时结束时的函数
  const onCountdownEnd = () => {
    // 弹出提示信息并提交答案
    message.warning('考试已结束，正在提交答案');
    submitExamAnswers();
  };

  // 提交考试答案
  const submitExamAnswers = () => {
    //  实现将答案对象提交到服务器的逻辑
    // 假设 exam_id 和 student_id 是从某个地方获取的
    const examID = localStorage.getItem('exams_id');
    const studentID = localStorage.getItem('userId');
    axios.get(`/exams/submitExam`, {
      params: { exam_id: examID, student_id: studentID},
    })
      .then(response => {
        console.log(2);
        if (response.data.code == 200) {
          console.log(3);
          message.success('答案提交成功');
        } else {
          console.log(4);
          message.error('答案提交失败');
        }
      })
      .catch(error => {
        console.log(1);
        console.error('提交答案失败:', error);
        message.error('答案提交失败');
      });
  };
  const submitAnswers = () => {
    //  实现将答案对象提交到服务器的逻辑
    // 假设 exam_id 和 student_id 是从某个地方获取的
    const examID = localStorage.getItem('exams_id');
    const studentID = localStorage.getItem('userId');
    const questionID = localStorage.getItem('question_id');
    console.log(examID, studentID, questionID);
    axios.get(`/exams/submitAnswer`, {
      params: { exam_id: examID, student_id: studentID, question_id: questionID,answer: answers[questions[currentQuestionIndex].id]},
    })
      .then(response => {
        if (response.data.code == 200) {
          message.success('答案保存成功');
        } else {
          message.error('答案保存失败');
        }
      })
      .catch(error => {
        console.error('保存答案失败:', error);
        message.error('答案保存失败');
      });
  };
  useEffect(() => {
    // 假设 exam_id 存储在 localStorage 中
    const examID = localStorage.getItem('exams_id');
    const student_id = localStorage.getItem('userId');

    const studentExamResponse = axios.get(`/exams/createStudentExam`, {
      params: { exam_id: examID, student_id: student_id },
    });

    const fetchExamInfo = async () => {
      try {
        const endTimeResponse = await axios.get(`/exams/getEndTimeByExamID?exam_id=${examID}`);
        const questionsResponse = await axios.get(`/exams/showQuestionByPage`, {
          params: { exam_id: examID, student_id: student_id, page: page },
        });
        setExamInfo({
          title: questionsResponse.data.data.examTitle,
          duration: questionsResponse.data.data.question_content,
          endTime: endTimeResponse.data.data,
        });
        //调用Question数据结构创建一个变量
        const question: Question[] = [{
          id: questionsResponse.data.data.question.question_id,
          content: questionsResponse.data.data.question.question_content,
          question: '这是题目',
        }]
        localStorage.setItem('question_id',questionsResponse.data.data.question.question_id);
        setQuestions(question);
        // questions = questionsResponse.data.questions;
        console.log(question);
      } catch (error) {
        console.error('Failed to fetch exam info:', error);
      }
    };

    console.log(questions);
    // console.log(questions.length);
    fetchExamInfo();
    // 页面卸载时清除定时器
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [page]); // 仅在考试结束时间变化时重新执行

  useEffect(() => {
    const setupCountdown = () => {
      if (!examInfo.endTime) return; // 如果 endTime 未定义，则不设置倒计时

      const endTime = new Date(examInfo.endTime).getTime();
      const countdown = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = Math.floor((endTime - currentTime) / 1000);
        if (remainingTime <= 0) {
          clearInterval(countdown);
          onCountdownEnd();
        } else {
          setExamInfo((prevInfo) => ({
            ...prevInfo,
            duration: Math.floor(remainingTime / 60),
          }));
        }
      }, 1000);

      countdownRef.current = countdown;
    };
    if (examInfo.endTime) {
      // 设置倒计时
      setupCountdown();
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [examInfo.endTime]);

  // 保存答案
  const handleSaveAnswer = (questionID: any, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionID]: answer,
    }));
  };

  // 题目切换
  const handleQuestionChange = (direction: string) => {
    const newQuestionIndex = direction === 'prev' ? currentQuestionIndex - 1 : currentQuestionIndex + 1;
    if (newQuestionIndex >= 0 && newQuestionIndex < questions.length) {
      setCurrentQuestionIndex(newQuestionIndex);
    }
  };

  return (
    <div className="exam">
      <div className="exam-info">
        <Typography.Title level={3}>{examInfo.title}</Typography.Title>
        <p>剩余时间：{examInfo.duration}分钟</p>
      </div>
      <div className="question-section">
        {questions.length > 0 ? ( // 重点：只有当 questions 长度大于 0 时才渲染题目内容
          <div className="question-content">
            {questions[currentQuestionIndex].content}
          </div>
        ) : (
          <div className="question-content">加载中...</div> // 重点：当 questions 未定义或为空时显示“加载中...”
        )}
        <textarea
          className="answer-input"
          placeholder="在此输入你的答案"
          // 重点：只有在 questions 长度大于 0 时才添加事件监听器
          onChange={(e) => questions.length > 0 && handleSaveAnswer(questions[currentQuestionIndex].id, e.target.value)}
        />
      </div>
      <div className="navigation-buttons">
        <Button
          onClick={() => {
            if (page > 1)
              page = page - 1;
            const examID = localStorage.getItem('exams_id');
            const student_id = localStorage.getItem('userId');
            const questionsResponse = axios.get(`/exams/showQuestionByPage`, {
              params: { exam_id: examID, student_id: student_id, page: page },
            }).then(questionsResponse => {
              const question: Question[] = [{
                id: questionsResponse.data.data.question.question_id,
                content: questionsResponse.data.data.question.question_content,
                question: '这是题目',
              }]
              localStorage.setItem('question_id',questionsResponse.data.data.question.question_id);
              setQuestions(question);
            });
            console.log(page);
          }}
        >上一题</Button>
        <Button
          onClick={() => {
            // if (page < questions.length)
            page = page + 1;
            const examID = localStorage.getItem('exams_id');
            const student_id = localStorage.getItem('userId');
            const questionsResponse = axios.get(`/exams/showQuestionByPage`, {
              params: { exam_id: examID, student_id: student_id, page: page },
            }).then(questionsResponse => {
              const question: Question[] = [{
                id: questionsResponse.data.data.question.question_id,
                content: questionsResponse.data.data.question.question_content,
                question: '这是题目',
              }]
              setQuestions(question);
            });
            console.log(page);
          }}
        >下一题</Button>
        <Button type="primary" onClick={submitAnswers}>
          保存答案
        </Button>
        <Button type="primary"
          onClick={() => {
            submitExamAnswers();
            navigate(`/student/exam`);
          }}
        >
          提交试卷
        </Button>
      </div>
    </div>
  );
};

export default Exam;