import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message, Popconfirm, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

// 假设这是从服务器获取班级和学生数据的模型
type Classroom = {
  id: string;
  name: string;
  students: Student[];
};

type Student = {
  id: string;
  name: string;
  studentNumber: string;
  studentScore:string;
  // 其他学生信息...
};

// 默认班级和学生数据
const defaultClassrooms: Classroom[] = [
  {
    id: 'class-1',
    name: '一年级一班',
    students: [
      { id: 'student-1', name: '张三', studentNumber: '001',studentScore:'11'},
      { id: 'student-2', name: '李四', studentNumber: '002' ,studentScore:'11'},
      // 更多学生...
    ],
  },
  // 更多班级...
];

export default function Teacher_Class_Room() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(defaultClassrooms);

  useEffect(() => {
    // 在这里应调用API获取班级和学生数据
    // const fetchedClassrooms = fetchClassroomsAndStudentsFromApi();
    // setClassrooms(fetchedClassrooms);
  }, []);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学号',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
    },{
      title: '成绩',
      dataIndex: 'studentScore',
      key: 'studentScore',
    },
    // 添加更多列如成绩、出勤情况等...

    // 如果需要操作列，例如编辑或删除学生
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: Student) => (
        <Space size="middle">
          <Button>Edit</Button>
          <Popconfirm
            title="确定要删除该学生吗?"
            // onConfirm={() => handleDeleteStudent(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="teacher-class-room">
      {classrooms.map(classroom => (
        <div key={classroom.id}>
          <h2>{classroom.name}</h2>
          <Table columns={columns} dataSource={classroom.students} rowKey="id" />
        </div>
      ))}
    </div>
  );
}