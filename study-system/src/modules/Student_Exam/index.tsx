import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Card, Col, Form, Input, Row, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import dayjs, { Dayjs } from 'dayjs'; // 正确导入 Dayjs 类型
import 'dayjs/locale/zh-cn'; // 导入所需的语言包，这里是中文
import axios from 'axios'
import { ExamResponse, ExamData } from '@/model/userAPI'

interface ExamStatuses {
  [examId: number]: boolean;
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

async function exam_stats(exam_id: number): Promise<boolean> {
  try {
    console.log('Entering exam_stats with exam_id:', exam_id);
    // 创建一个用于存储 Promise 解决值的数组
    const [startTimePromise, endTimePromise] = await Promise.all([
      axios.get(`/exams/getStartTimeByExamID`, {
        params: {
          exam_id,
        },
      }),
      axios.get(`/exams/getEndTimeByExamID`, {
        params: {
          exam_id,
        },
      }),
    ]);

    // 获取当前时间
    const now = new Date();
    const startTime = new Date(startTimePromise.data.data);
    const endTime = new Date(endTimePromise.data.data);
    const nowUTC = new Date(now.toUTCString());
    const startTimeUTC = new Date(startTime.toUTCString());
    const endTimeUTC = new Date(endTime.toUTCString());
    console.log('nowUTC:' + nowUTC + 'startTimeUTC:' + startTimeUTC + 'nowUTC >= startTimeUTC ' + (nowUTC >= startTimeUTC));
    console.log('nowUTC:' + nowUTC + 'endTimeUTC:' + endTimeUTC + 'nowUTC < endTimeUTC:' + (nowUTC < endTimeUTC));
    console.log('nowUTC >= startTimeUTC && nowUTC < endTimeUTC:' + (nowUTC >= startTimeUTC && nowUTC < endTimeUTC));
    // 检查当前时间是否在考试的开始时间和结束时间之间
    return (nowUTC >= startTimeUTC) && (nowUTC < endTimeUTC);
  } catch (error) {
    console.error('Error in exam_stats:', error);
    throw error; // 重新抛出错误，以便调用者可以进一步处理
  }
}


export default function Student_Exam() {
  const navigate = useNavigate();
  let [examsData, setExamsData] = useState<ExamData[]>([]);
  let [examsStatus, setExamsStatus] = useState<ExamStatuses>({});

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
        // 检查每项考试是否正在进行
        const statusPromises = examsData.map(exam =>
          exam_stats(exam.exams_id)
        );
        const statuses = await Promise.all(statusPromises);


        // 构建考试状态对象，并更新状态
        const newStatuses = examsData.reduce((acc, exam, index) => {
          acc[exam.exams_id] = statuses[index];
          return acc;
        }, {} as ExamStatuses);

        setExamsStatus(newStatuses);
        examsStatus = newStatuses;
        console.log("examsStatus" + examsStatus)
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
                  <Typography.Text>开始时间：{dayjs(exam.start_time).format('YYYY-MM-DD HH:mm:ss')}</Typography.Text>
                  <Typography.Text>结束时间：{dayjs(exam.end_time).format('YYYY-MM-DD HH:mm:ss')}</Typography.Text>
                  <Typography.Text>考试时长：{exam.duration_minutes} 分钟</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text strong className="student-exam-card__status">考试状态：</Typography.Text>
                  {examsStatus[exam.exams_id] ? (
                    <Button
                      className="student-exam-card__status-link"
                      type="link"
                      onClick={() => {
                        console.log(exam);
                        localStorage.setItem('exams_id', `${exam.exams_id}`);
                        navigate(`/exam`);
                      }}
                    >
                      进行中
                    </Button>
                  ) : (
                    <Typography.Text type="secondary">
                      未开始或已结束
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