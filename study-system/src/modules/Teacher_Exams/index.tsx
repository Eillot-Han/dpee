import React, { useEffect, useState } from 'react';
import { List, Button, Input, InputNumber, Select, message, Typography, Space, DatePicker } from 'antd';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs'; // 正确导入 Dayjs 类型
import 'dayjs/locale/zh-cn'; // 导入所需的语言包，这里是中文
import { useNavigate } from 'react-router-dom';
import './index.scss';
// 考试数据结构
type Exam = {
  exams_id: number;
  exams_name: string;
  description: string;
  total_question: number;
  // 其他字段根据实际情况添加
};

// 待添加
// localStorage.setItem('userInfo', JSON.stringify(userData));

const Teacher_Exams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [teacherId, setTeacherId] = useState<number>(0);
  const [examId1, setExamId1] = useState<string>('');
  const [examId2, setExamId2] = useState<string>('');
  const [exportExamId, setExportExamId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(10);
  const [type, setType] = useState<string>('');
  const [num, setNumState] = useState<number>(0);
  const [startTime, setStartTime] = useState<Dayjs | null>(null); // 开始时间
  const [endTime, setEndTime] = useState<Dayjs | null>(null); // 结束时间
  const setNum = (value: number | null) => {
    if (value !== null && value !== undefined) {
      setNumState(value);
    }
  };
  // 获取存储在 localStorage 中的教师 ID
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setTeacherId(parseInt(userId, 10));
    }
  }, []);

  // 获取教师的试卷列表
  useEffect(() => {
    if (teacherId) {
      axios.get(`/exams/showExamByTeacherID?teacher_id=${teacherId}`).then((response) => {
        setExams(response.data.data);
      }).catch((error) => {
        console.error('Error fetching exams:', error);
        message.error('获取试卷列表失败');
      });
    }
  }, [teacherId]);

  // 导出试卷
  const handleExport = (examId: number) => {
    axios({
      url: `/exams/exportExam?exam_id=${examId}`,
      method: 'GET',
      responseType: 'blob', // 重要
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `exam_${examId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('导出成功');
    }).catch((error) => {
      console.error('Export error:', error);
      message.error('导出失败');
    });
  };

   // 处理开始时间选择
   const handleStartChange = (date: Dayjs | null, dateString: string) => {
    setStartTime(date);
  };

  // 处理结束时间选择
  const handleEndChange = (date: Dayjs | null, dateString: string) => {
    setEndTime(date);
  };

  // 更新考试的开始时间和结束时间
  const handleUpdateTime = () => {
    if (!exportExamId || !startTime || !endTime) {
      message.warning('请填写完整的信息');
      return;
    }
    axios({
      url: `/exams/updateStartTimeAndEndTime`,
      method: 'GET',
      params: {
        exams_id: exportExamId,
        start_time: startTime.toISOString().slice(0, 19), // 转换为 ISO 字符串，不含毫秒
        end_time: endTime.toISOString().slice(0, 19),
      },
    }).then((response) => {
      message.success('更新成功');
      // 可能需要的其他逻辑处理...
    }).catch((error) => {
      console.error('Update time error:', error);
      message.error('更新失败');
    });
  };

  // 导出成绩
  const handleScoreExport = () => {
    axios({
      url: `/exams/exportStudentExams?exam_id=${exportExamId}`,
      method: 'GET',
      responseType: 'blob', // 重要
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `score_${exportExamId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('导出成绩成功');
    }).catch((error) => {
      console.error('Export score error:', error);
      message.error('导出成绩失败');
    });
  };
  // 生成试卷
  const handlePaperGeneration = () => {
    axios.get(`/exams/extractQuestionsByType?user_id=${localStorage.getItem('userId')}&type=${type}&num=${num}`).then((response) => {
      // 处理返回结果
      message.success('试卷生成成功');
      // navigate('/generate-papers'); // 根据实际路由调整
    }).catch((error) => {
      console.error('Error generating paper:', error);
      message.error('试卷生成失败');
    });
  };

  // 合并试卷
  const handleMergeExams = () => {
    axios.get(`/exams/mergeExams?examID1=${examId1}&examID2=${examId2}`).then((response) => {
      // 处理返回结果
      message.success('试卷合并成功');
    }).catch((error) => {
      console.error('Error merging exams:', error);
      message.error('试卷合并失败');
    });
  };

  return (
    <div className="teacher">
      <h1>查询试卷</h1>
      <List
        header={<div>现有试卷列表</div>}
        bordered
        dataSource={exams}
        renderItem={(exam: Exam) => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => handleExport(exam.exams_id)}
              >
                导出
              </Button>,
              // 这里可以添加合并试卷的按钮等其他操作
            ]}
          >
            <List.Item.Meta
              title={<Typography.Text ellipsis>{exam.exams_name}</Typography.Text>}
              description={
                <Space>
                  <Typography.Text type="secondary">{exam.exams_id}</Typography.Text>
                  <Typography.Text type="secondary">{exam.description}</Typography.Text>
                  <Typography.Text type="secondary">{`题目总数: ${exam.total_question}`}</Typography.Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
       <div className="generate-paper-form">
        <Input.Search
          placeholder="输入题目类型"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: 200, marginBottom: 20 }}
        />
        <InputNumber
          min={1}
          value={num}
          onChange={setNum} // 确保 setNum 能够处理 number | null 类型的参数
          style={{ width: 200, marginBottom: 20 }}
        />
        <Button
          type="primary"
          onClick={handlePaperGeneration}
        >
          生成试卷
        </Button>
      </div>  

      <div className="merge-paper-form">
        <Input.Search
          placeholder="输入第一个试卷ID"
          value={examId1}
          onChange={(e) => setExamId1(e.target.value)}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Input.Search
          placeholder="输入第二个试卷ID"
          value={examId2}
          onChange={(e) => setExamId2(e.target.value)}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Button
          type="primary"
          onClick={handleMergeExams}
        >
          合并试卷
        </Button>
      </div>
      <div className="export-score-form">
        <Input.Search
          placeholder="输入考试ID"
          value={exportExamId}
          onChange={(e) => setExportExamId(e.target.value)}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Button
          type="primary"
          onClick={handleScoreExport}
        >
          导出成绩
        </Button>
      </div>
      <div className="update-time-form">
          <Space direction="vertical">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
              value={startTime}
              onChange={handleStartChange}
              style={{ width: 200, marginBottom: 20 }}
            />
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择结束时间"
              value={endTime}
              onChange={handleEndChange}
              style={{ width: 200, marginBottom: 20 }}
            />
            <Button
              type="primary"
              onClick={handleUpdateTime}
            >
              更新时间
            </Button>
          </Space>
        </div>
    </div>
  );
};

export default Teacher_Exams;