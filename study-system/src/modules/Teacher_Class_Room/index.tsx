import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, Input, Modal, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

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
};

// 班级数据结构
type Classroom = {
  id: string;
  name: string;
  students: User[];
};

const Teacher_Class_Room = () => {
  const navigate = useNavigate();
  const params = useParams<{ classId: string }>();
  const classId = params.classId!;
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addingStudentId, setAddingStudentId] = useState('');

  // 获取特定班级的学生列表
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<User[]>(`/class/showStudentsByClassID?class_id=${params.classId}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [params.classId]);

  // 获取特定学生的分数
  useEffect(() => {
    students.forEach(async (student) => {
      try {
        const scoreResponse = await axios.get(`/correction/getStudentScoreListByStudentID?student_id=${student.user_id}`);
        const score = scoreResponse.data; // 假设返回的是一个字符串形式的成绩
        setStudents((prevStudents) =>
          prevStudents.map((s) => (s.user_id === student.user_id ? { ...s, score: score } : s))
        );
      } catch (error) {
        console.error('Error fetching student score:', error);
      }
    });
  }, [students]);

  // 查看用户信息
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setFormVisible(true);
  };

  // 删除学生
  const handleDeleteStudent = async (classID: string, studentID: number) => {
    try {
      await axios.delete(`/class/deleteStudentFromClass?class_id=${classID}&student_id=${studentID}`);
      message.success('学生删除成功');
      setStudents((prevStudents) => prevStudents.filter((s) => s.user_id !== studentID));
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('删除学生时出错');
    }
  };

  // 添加学生
  const handleAddStudent = async () => {
    // 这里执行添加学生的操作
    try {
      await axios.put(`/class/addStudentToClass?class_id=${classId}&student_id=${addingStudentId}`);
      message.success('学生添加成功');
      // 刷新学生列表或关闭输入框等操作...
      setAddingStudentId(''); // 清空输入框
    } catch (error) {
      console.error('Error adding student:', error);
      message.error('添加学生时出错');
    }
  };

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
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: User) => (
        <Space size="middle">
          <Button onClick={() => handleViewUser(record)}>查看</Button>
          <Popconfirm
            title="确定要删除该学生吗?"
            onConfirm={() => handleDeleteStudent(params.classId!, record.user_id)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="teacher-class-room">
      <h1>班级学生列表</h1>
      {/* <Table columns={columns} dataSource={students} rowKey="user_id" /> */}
      <Table
        columns={columns}
        dataSource={students}
        rowKey="user_id"
        pagination={false}
      />

      <Space className="add-student-container" align="baseline">
        <Input.Search
          placeholder="输入学生ID"
          value={addingStudentId}
          onChange={(e) => setAddingStudentId(e.target.value)}
          // onSearch={(value) => handleSearchStudent(value)} // 注意这里的更改
          style={{ width: 200, marginBottom: 16 }}
        />
        <Button
          type="primary"
          onClick={handleAddStudent} // 确保这里调用的是添加学生的函数
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
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Teacher_Class_Room;