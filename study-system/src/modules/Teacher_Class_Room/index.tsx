import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Input, Modal, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

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

// 初始模拟数据
const initialUsers: User[] = [
  {
    user_id: 1,
    username: '3211',
    sex: 'Male',
    email: '4324@example.com',
    phone: '446456422',
    first_name: '321',
    last_name: '32',
    user_role: 'Student',
    user_class: 'Class 1',
    create_at: '2021-05-01',
    score: '80',
  },
  {
    user_id: 2,
    username: '432',
    sex: 'Male',
    email: '321321@example.com',
    phone: '4362784',
    first_name: '32',
    last_name: '123',
    user_role: 'Student',
    user_class: 'Class 1',
    create_at: '2021-05-01',
    score: '60',
  },
  // 可以添加更多用户...
];

const Teacher_Class_Room = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');

  // 查看用户信息
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setFormVisible(true);
  };

  // 删除学生
  const handleDeleteStudent = (user_id: number) => {
    setUsers(users.filter(user => user.user_id !== user_id));
  };

  // 添加学生
  const handleAddStudent = () => {
    if (newStudentId && !users.some(user => user.user_id.toString() === newStudentId)) {
      const newUser: User = {
        user_id: parseInt(newStudentId, 10),
        username: '4325324',
        sex: 'FeMale',
        email: '32131@example.com',
        phone: '11133244666',
        first_name: '2332',
        last_name: '12323',
        user_role: 'Student',
        user_class: 'Class 1',
        create_at: '2021-05-01',
        score: undefined,
      };
      setUsers([...users, newUser]);
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