import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, Typography, Tooltip } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 班级数据结构
type Classes = {
  class_id: number;
  class_name: string;
  student_count: number;
  description?: string;
};

const Admin_Classm = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Classes[]>([]);

  // 获取班级列表
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get<{ data: Classes[] }>('/class/showClasses');
        setClasses(response.data.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // 跳转到班级界面并存储 ClassID
  const handleClassroomNavigate = (classID: number) => {
    localStorage.setItem('classID', classID.toString());
    navigate('/teacher/classroom');
  };

  const columns = [
    {
      title: 'Class ID',
      dataIndex: 'class_id',
      key: 'class_id',
    },
    {
      title: 'Class Name',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: 'Student Count',
      dataIndex: 'student_count',
      key: 'student_count',
    },
    // {
    //   title: 'Description',
    //   key: 'description',
    //   render: (description: string | undefined) => (
    //     <Tooltip title={description || 'No description'}>
    //       <Typography.Text ellipsis>
    //         {description || 'No description'}
    //       </Typography.Text>
    //     </Tooltip>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Classes) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleClassroomNavigate(record.class_id)}
          >
            Enter Classroom
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this class?"
            onConfirm={() => console.log('Delete', record.class_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="teacher-classm">
      <h1>Classes List</h1>
      <Table
        dataSource={classes}
        columns={columns}
        rowKey="class_id"
        pagination={false}
      />
    </div>
  );
};

export default Admin_Classm;