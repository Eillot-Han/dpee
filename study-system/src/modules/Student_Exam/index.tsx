import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Card, Col, Form, Input, Row, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const examsData = [
  {
    id: 1,
    name: '2020-2021学年 第1学期 《数据库原理实践》期中考试',
    startTime: '2022-01-01 09:00',
    endTime: '2022-01-01 11:00',
    duration: '2小时',
    status: '已截止',
  },
  {
    id: 2,
    name: '2020-2021学年 第2学期 《操作系统》期末考试',
    startTime: '2022-05-01 09:00',
    endTime: '2022-05-01 11:00',
    duration: '2小时',
    status: '进行中',
  },
]

export default function Student_Exam() {
  const [exams, setExams] = useState(examsData);
  const navigate = useNavigate();
  const goToExam = (id: number) => {
    // 在实际项目中，此处应导航至相应的考试页面
    // navigate(`/exam/${id}`);
  }

  return (
    <div>
      {exams.map((exam) => (
        <Row gutter={16} key={exam.id}>
          <Col span={16}>
            <Card title={exam.name}>
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text>开始时间：{exam.startTime}</Typography.Text>
                  <Typography.Text>结束时间：{exam.endTime}</Typography.Text>
                  <Typography.Text>考试时长：{exam.duration}</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text strong>考试状态：</Typography.Text>
                  {exam.status === '进行中' ? (
                    <Button type="link" onClick={() => navigate(`/exam`)}>
                    进行中
                    </Button>
                  ) : (
                    <Typography.Text type={exam.status === '已结束' ? 'danger' : undefined}>{exam.status}</Typography.Text>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  )
}