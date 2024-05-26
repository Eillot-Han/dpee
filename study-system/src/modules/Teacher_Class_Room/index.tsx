import { Table, Button, Space, Popconfirm, Input, Modal, Typography, message } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs'; // 正确导入 Dayjs 类型
import 'dayjs/locale/zh-cn'; // 导入所需的语言包，这里是中文
import { useNavigate } from 'react-router-dom';
import './index.scss';
// 学生数据结构
type User = {
  user_id: number;
  username: string;
  sex: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  user_role: string;
  user_class: string;
  create_at: string;
  score?: string;
};

const initialUsers: User[] = [];

const Teacher_Class_Room = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');

  const classId = localStorage.getItem('classId');

  useEffect(() => {
    if (classId) {
      axios.get(`/class/showStudentsByClassID?class_id=${classId}`).then((response) => {
        setUsers(response.data.data);
      }).catch((error) => {
        console.error('Error fetching exams:', error);
        message.error('获取学生列表失败');
      });
    }
  }, [classId]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setFormVisible(true);
  };

  const handleDeleteStudent = (user_id: number) => {
    setUsers(users.filter(user => user.user_id !== user_id));
    axios.delete(`/class/deleteStudentToClass?class_id=${classId}&user_id=${user_id}`);
  };


  const handleAddStudent = () => {
    if (newStudentId && !users.some(user => user.user_id.toString() === newStudentId)) {
      axios.get(`/class/addStudentToClass?class_id=${classId}&user_id=${newStudentId}`);
      setNewStudentId(''); // 清空输入框
    } else {
      alert('Student ID should be unique and not already in use.');
    }
  };

  // 列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
      render: (_: any, record: User) => <>{record.score || 'N/A'}</>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: User) => (
        <Space size="middle">
          <Button onClick={() => handleViewUser(record)}>查看</Button>
          <Popconfirm
            title="确定要删除该学生吗?"
            onConfirm={() => handleDeleteStudent(record.user_id)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger><MinusOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="teacher-class-room">
      <h1>班级学生列表</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="user_id"
        pagination={false}
      />

      <Space className="add-student-container" align="baseline">
        <Input.Search
          placeholder="输入学生ID"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
          onSearch={value => handleAddStudent()}
        />
        <Button
          type="primary"
          onClick={handleAddStudent}
          icon={<PlusOutlined />}
          block
        >
          添加学生
        </Button>
      </Space>

      <Modal
        title="用户信息"
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <Typography.Title level={4}>{selectedUser.username}</Typography.Title>
            <ul>
              <li>ID: {selectedUser.user_id}</li>
              <li>性别: {selectedUser.sex}</li>
              <li>邮箱: {selectedUser.email}</li>
              <li>电话: {selectedUser.phone}</li>
              <li>姓: {selectedUser.last_name}</li>
              <li>名: {selectedUser.first_name}</li>
              <li>权限: {selectedUser.user_role}</li>
              <li>班级: {selectedUser.user_class}</li>
              <li>创建时间: {selectedUser.create_at}</li>
              <li>成绩: {selectedUser.score || '暂无成绩'}</li>
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Teacher_Class_Room;