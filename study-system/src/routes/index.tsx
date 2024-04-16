import Admin_Class from '@/modules/Admin_Class'
import Admin_Questions from '@/modules/Admin_Questions'
import Admin_User from '@/modules/Admin_User'
import Admin_Users from '@/modules/Admin_Users'
import Exam from '@/modules/Exam'
import Student from '@/modules/Student'
import Student_Exam from '@/modules/Student_Exam'
import Student_Score from '@/modules/Student_Score'
import Student_User from '@/modules/Student_User'
import Teacher from '@/modules/Teacher'
import Teacher_Class from '@/modules/Teacher_Class'
import Teacher_Class_Room from '@/modules/Teacher_Class_Room'
import Teacher_Exams from '@/modules/Teacher_Exams'
import Teacher_Questions from '@/modules/Teacher_Questions'
import Teacher_User from '@/modules/Teacher_User'
import Login from '@/modules/login'
import Welcome from '@/modules/welcome'

const routes = [
  {
    path: '/',
    element: <Welcome />,
    title: '首页',
  },
  {
    path: '/login',
    element: <Login />,
    title: '登录',
  },
  {
    path: '/teacher',
    element: <Teacher />,
    title: '教师端',
  },
  {
    path: '/teacher/user',
    element: <Teacher_User />,
    title: '教师-个人中心',
  },
  {
    path: '/teacher/class',
    element: <Teacher_Class />,
    title: '教师-我的班级',
  },
  {
    path: '/teacher/questions',
    element: <Teacher_Questions />,
    title: '教师-试题管理',
  },
  {
    path: '/teacher/exams',
    element: <Teacher_Exams />,
    title: '教师-试卷管理',
  },
  {
    path: '/student',
    element: <Student />,
    title: '学生端',
  },
  {
    path: '/student/user',
    element: <Student_User />,
    title: '学生-个人中心',
  },
  {
    path: '/student/exam',
    element: <Student_Exam />,
    title: '学生-我的考试',
  },
  {
    path: '/student/score',
    element: <Student_Score />,
    title: '学生-我的成绩',
  },
  {
    path: '/admin',
    element: <Welcome />,
    title: '服务端',
  },
  {
    path: '/admin/user',
    element: <Admin_User />,
    title: '服务-个人中心',
  },
  {
    path: '/admin/users',
    element: <Admin_Users />,
    title: '服务-用户管理',
  },
  {
    path: '/admin/questions',
    element: <Admin_Questions />,
    title: '服务-试题管理',
  },
  {
    path: '/admin/class',
    element: <Admin_Class />,
    title: '服务-班级管理',
  },
  {
    path: '/exam',
    element: <Exam />,
    title: '考试界面',
  },
  {
    path: '/teacher/classroom',
    element: <Teacher_Class_Room />,
    title: '班级界面',
  },
]

export default routes
