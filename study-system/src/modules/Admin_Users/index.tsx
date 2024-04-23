import React, { useEffect, useState } from 'react';
import { Button, List, Input, Typography, Tag, Pagination, message } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './index.scss';
// 题目数据结构
type Question = {
  question_id: number;
  question_content: string;
  type: string;
  difficulty: number;
  points: number;
  // 其他字段根据实际情况添加
};
type Users = {
  user_id: number;
  user_name: string;
  phone: string;
  email: string;
  user_role: string;
}

const Admin_Users = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 使用 useLocation Hook 获取 location
  const [users, setUsers] = useState<Users[]>([])
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(''); // 用户角色状态
  const [targetUserId, setTargetUserId] = useState('');// 目标用户 ID 状态

  // 获取用户列表
  const fetchUsers = async (page: number, user_id?: string, user_name?: string) => {
    setLoading(true);
    try {
      let url = `/user/showUser`;
      if (user_id) {
        url = `/user/showUserByID?account=${encodeURIComponent(user_id)}`;
      }
      if (user_name) {
        url = `/user/showUserByName?name=${encodeURIComponent(user_name)}`;
      }
      const response = await axios.get<{ data: Users[], total: number }>(url);
      setUsers(response.data.data);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // 页码改变事件
  const handlePageChange = (page: number, pageSize: number) => {
    navigate(`?page=${page}&size=${pageSize}`);
    fetchUsers(page);
  };

  // 搜索用户id
  const handleSearchUserId = (user_id: string) => {
    fetchUsers(1, user_id);
  };

  // 搜索用户名字
  const handleSearchUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const user_name = e.target.value;
    fetchUsers(1, undefined, user_name);
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('role', role);
      await axios.post('/roles/updateRoles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      message.success('角色更新成功');
      // 更新完角色后，可能需要刷新用户列表
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Error updating user role:', error);
      message.error('角色更新失败');
    }
  };

  // 处理输入的用户 ID
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetUserId(e.target.value);
  };

  // 设置角色为 Teacher
  const handleSetTeacherRole = () => {
    if (targetUserId) {
      updateUserRole(targetUserId, 'Teacher');
    }
  };

  // 设置角色为 Student
  const handleSetStudentRole = () => {
    if (targetUserId) {
      updateUserRole(targetUserId, 'Student');
    }
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const page = search.get('page');
    const user_id = search.get('user_id');
    const user_name = search.get('user_name');

    // 使用类型断言确保 page 是 number 或 undefined
    const pageNumber = page ? parseInt(page as string, 10) : 1;

    // 使用逻辑与操作符确保 type 和 content 不是 null
    fetchUsers(pageNumber, user_id ?? undefined, user_name ?? undefined);
  }, [location.key]);

  const renderUserItem = (item: Users) => {
    return (
      <List.Item
        key={item.user_id}
        onClick={() => {
          localStorage.setItem('user_id', item.user_id.toString());
          // navigate('/createQuestion', { state: { from: location } });
        }}
      >
        <List.Item.Meta
          title={<Typography.Text ellipsis>{item.user_name}</Typography.Text>}
          description={
            <>
              <Tag color="blue">{item.user_role}</Tag>
              <Typography.Text type="secondary">{`手机号: ${item.phone}`}</Typography.Text>
              <Typography.Text type="secondary">{`邮箱: ${item.email}`}</Typography.Text>
            </>
          }
        />
      </List.Item>
    );
  };

  return (
    <div className="teacher">
      <div className="header">
        <h1>所有用户</h1>
      </div>

      <div className="search-container">
        <Input.Search
          placeholder="输入用户ID"
          onSearch={handleSearchUserId}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Input.Search
          placeholder="输入用户姓名"
          onChange={handleSearchUserName}
          style={{ width: 200, marginBottom: 20 }}
        />
      </div>
      <div className="question-container">
        <List
          dataSource={users}
          renderItem={renderUserItem}
          pagination={{
            current: currentPage,
            pageSize: 5,
            total: totalUsers,
            onChange: handlePageChange,
          }}
          loading={loading}
        />
      </div>
      <div className="add-role-container">
        <Input
          placeholder="输入用户ID"
          value={targetUserId}
          onChange={handleUserIdChange}
          style={{ margin: '0 10px 0 0' }}
        />
        <Button
          type="primary"
          onClick={handleSetTeacherRole}
          disabled={!targetUserId}
          icon={<EditOutlined />} // 使用 EditOutlined 图标
        >
          设为教师
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleSetStudentRole}
          disabled={!targetUserId}
          icon={<DeleteOutlined />} // 使用 DeleteOutlined 图标
        >
          设为学生
        </Button>
      </div>
    </div>
  );
};

export default Admin_Users;