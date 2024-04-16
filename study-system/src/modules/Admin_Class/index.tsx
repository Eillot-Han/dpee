import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message, Table, Space, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

type Classroom = {
  id: string;
  name: string;
}

const defaultClassrooms: Classroom[] = [
  { id: 'class-1', name: '一年级一班' },
  { id: 'class-2', name: '二年级二班' },
];

export default function Admin_Class() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(defaultClassrooms);
const [isAddingClassroom, setIsAddingClassroom] = useState(false);
const [newClassroomName, setNewClassroomName] = useState('');

// 假设这是从服务器获取班级数据的Hook
// 在实际项目中，请替换为实际的数据获取逻辑
useEffect(() => {
  // const fetchedClassrooms = fetchClassroomsFromApi();
  setClassrooms(defaultClassrooms);
}, []);

// 添加新班级的模拟函数
const handleAddClassroom = () => {
  // 在这里发起添加班级的API请求
  // ...
  // 请求成功后，将新班级添加到state中
  const newClassroom = { id: Date.now().toString(), name: newClassroomName };
  setClassrooms([...classrooms, newClassroom]);
  setNewClassroomName('');
  setIsAddingClassroom(false);
};

// 删除班级的模拟函数
const handleDeleteClassroom = (id: string) => {
  // 在这里发起删除班级的API请求
  // ...
  // 请求成功后，从state中移除班级
  setClassrooms(classrooms.filter(classroom => classroom.id !== id));
};
  const navigate = useNavigate();
  return (
    <div className="admin-class">
      <div className="admin-class-actions">
        <Button type="primary" onClick={() => setIsAddingClassroom(true)}>添加班级</Button>
      </div>
      <Table
        dataSource={classrooms}
        rowKey="id"
      >
        <Table.Column title="班级名称" dataIndex="name" key="name" />
        <Table.Column
          title="操作"
          key="action"
          render={(text, record: Classroom) => (
            <Space size="middle">
              <Button type="link" onClick={() => navigate(`/classroom/${record.id}`)}>查看</Button>
              <Button
                danger
                onClick={() => handleDeleteClassroom(record.id)}
              >删除</Button>
            </Space>
          )}
        />
      </Table>
  
      {/* 添加班级模态框 */}
      <Modal
        title="添加班级"
        visible={isAddingClassroom}
        onOk={handleAddClassroom}
        onCancel={() => setIsAddingClassroom(false)}
      >
        <Form layout="inline">
          <Form.Item
            label="班级名称"
            name="name"
            rules={[{ required: true, message: '请输入班级名称！' }]}
          >
            <Input value={newClassroomName} onChange={e => setNewClassroomName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
