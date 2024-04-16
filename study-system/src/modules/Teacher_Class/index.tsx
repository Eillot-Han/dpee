import { LOGIN, SEND_SMS } from '@/services/mutationGQL'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, message, Table, Popconfirm, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

// 假设这是从服务器获取班级数据的hook
// 在实际项目中，请替换为实际的数据获取逻辑
function useFetchClassrooms() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  useEffect(() => {
    // 这里应该是调用API获取班级列表的逻辑
    // 示例代码仅作占位
    async function fetchClassrooms() {
      // const response = await fetchClassroomDataFromApi(); 
      setClassrooms(defaultClassrooms);
    }
    fetchClassrooms();
  }, []);

  return classrooms;
}

type Classroom = {
  id: string;
  name: string;
  studentCount: number;
  students: Student[];
};

type Student = {
  id: string;
  name: string;
};

const defaultClassrooms: Classroom[] = [
  {
    id: 'class-1',
    name: '一年级一班',
    studentCount: 30,
    students: [
      { id: 'student-1', name: '张三' },
      { id: 'student-2', name: '李四' },
      // 更多学生...
    ],
  },
  {
    id: 'class-2',
    name: '二年级二班',
    studentCount: 25,
    students: [
      { id: 'student-3', name: '王五' },
      { id: 'student-4', name: '赵六' },
      // 更多学生...
    ],
  },
];

export default function Teacher_Classm() {
  const navigate = useNavigate();
  const classrooms = useFetchClassrooms();

  // 在这里定义添加、删除班级以及对学生操作的mutation函数
  // 使用useMutation来自@apollo/client
  // const [deleteClassroom, { loading: deleting }] = useMutation(DELETE_CLASSROOM_MUTATION);
  // const [addStudentToClassroom, { loading: adding }] = useMutation(ADD_STUDENT_MUTATION);

  // 示例函数，处理删除班级的确认和错误
  const handleDeleteClassroom = (id: string) => {
    // deleteClassroom({ variables: { id } })
    //   .then(() => message.success('班级删除成功'))
    //   .catch((error) => message.error('删除班级时出错: ' + error.message));
  };

  // 示例函数，处理添加学生的逻辑
  // 在真实场景下，需要具体的班级ID作为参数，并且可能有更复杂的表单验证和提交逻辑
  const handleSubmitAddStudent = (values: any) => {
    // values应该包含学生ID和目标班级ID
    // addStudentToClassroom({ variables: values });
  };

  return (
    <div className="teacher-class-room">
      <Table dataSource={classrooms} rowKey="id">
        <Table.Column title="班级名称" dataIndex="name" key="name" />
        <Table.Column title="班级人数" dataIndex="studentCount" key="studentCount" />
        <Table.Column
          title="学生"
          key="students"
          render={(text, record: Classroom) => (
            <ul>
              {record.students.map(student => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          )}
        />
        <Table.Column
          title="操作"
          key="action"
          render={(text, record: Classroom) => (
            <>
              <Space size="middle">
                {/* 添加学生按钮，可能需要弹窗形式打开添加学生表单 */}
                <Button type="primary" /*disabled={}*/ onClick={() => { }}>
                  添加学生
                </Button>
                {/* 跳转到班级详情页 */}
                <Button type="link" onClick={() => navigate(`/classroom/${record.id}`)}>
                  查看学生
                </Button>
                {/* 删除班级按钮，使用Popconfirm进行二次确认 */}
                <Popconfirm
                  title="确定要删除这个班级吗？"
                  onConfirm={() => handleDeleteClassroom(record.id)}
                  okText="确定"
                  cancelText="取消"
                // disabled={}
                >
                  <Button danger>删除班级</Button>
                </Popconfirm>
              </Space>
            </>
          )}
        />
      </Table>
      {/* 在适当位置添加添加学生表单组件 */}
      {/* <AddStudentForm onSubmit={handleSubmitAddStudent} /> */}
    </div>
  );
}