import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Card, Col, Form, Input, Row, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import axios from 'axios'
import { ExamResponse, ExamData } from '@/model/userAPI'

interface ExamScore {
  [examId: number]: number;
}

let examsData: ExamData[] = [
  {
    exams_id: 1,
    exams_name: '期中考试',
    description: '2024年春季学期期中考试',
    subject_id: 101,
    location: '第一教学楼501室',
    class_id: 2024,
    start_time: '2024-04-30T08:00:00Z',
    end_time: '2024-04-30T10:00:00Z',
    duration_minutes: 120,
    total_question: 50,
    create_by: 1001,
    create_at: '2024-04-20T09:00:00Z',
  },
  // 可以添加更多的考试数据对象
];

async function exam_score(exam_id: number): Promise<number> {
  try {
    console.log('Entering exam_stats with exam_id:', exam_id);
    // 创建一个用于存储 Promise 解决值的数组
    const [response] = await Promise.all([
      axios.get(`/correction/getStudentScoreByStudentIDAndExamID`, {
        params: {
          exam_id: exam_id,
          student_id: localStorage.getItem('userId'),
        },
      }),
    ]);

    const score = response.data.data.score;
    return score;
  } catch (error) {
    console.error('Error in exam_stats:', error);
    throw error; // 重新抛出错误，以便调用者可以进一步处理
  }
}


export default function Student_Score() {
  const navigate = useNavigate();
  let [examsData, setExamsData] = useState<ExamData[]>([]);
  let [examsScore, setExamsScore] = useState<ExamScore>({});

  useEffect(() => {
    console.log('Fetching exams data with user_id:', localStorage.getItem('userId'));
    const fetchExamsData = async () => {
      try {
        // 获取考试数据
        const response = await axios.get<ExamResponse>('/exams/showExamByUserID', {
          params: {
            user_id: localStorage.getItem('userId'),
          },
        });
        setExamsData(response.data.data);
        examsData = response.data.data;
        console.log(examsData)
        const scores: ExamScore = {};
        for (const exam of examsData) {
          scores[exam.exams_id] = await exam_score(exam.exams_id);
        }
        setExamsScore(scores);
        // 构建考试状态对象，并更新状态
      } catch (error) {
        console.error('Error fetching exams data or checking status:', error);
        // 处理错误，例如设置错误状态或显示错误消息
      }
    };

    fetchExamsData();
  }, []); // 空依赖数组确保此效果仅在组件挂载时运行

  return (
    <div className="student-exam-container">
      {examsData.map((exam) => (
        <Row key={exam.exams_id} gutter={16} className="student-exam-card" >
          <Col span={24}>
            <Card title={exam.exams_name}>
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text>开始时间：{exam.start_time}</Typography.Text>
                  <Typography.Text>结束时间：{exam.end_time}</Typography.Text>
                  <Typography.Text>考试时长：{exam.duration_minutes} 分钟</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text strong className="student-exam-card__status">考试成绩：{examsScore[exam.exams_id]}</Typography.Text>
                  {examsScore[exam.exams_id] ? (
                    <Button
                      className="student-exam-card__status-link"
                      type="link"
                      onClick={() => {
                        console.log(exam);
                        localStorage.setItem('exams_id', `${exam.exams_id}`);
                        // navigate(`/exam`);
                        message.error('暂不允许查看试卷');
                      }}
                    >   
                    </Button>
                  ) : (
                    <Typography.Text type="secondary">
                      暂无成绩
                    </Typography.Text>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
}