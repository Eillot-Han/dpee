/*
 * menu 菜单字段及类型
 * default: 项名
 * default_icon: 项默认icon
 * choosed_icon: 项选中icon
 */
const menu = [
  {
    type: 'NOLOGIN',
    contents: [
      {
        default: '欢迎页',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/welcome',
      },
    ],
  },
  {
    type: 'STUDENT',
    contents: [
      {
        default: '个人中心',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/student/user',
      },
      {
        default: '我的考试',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/student/exam',
      },
      {
        default: '我的成绩',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/student/score',
      },
    ],
  },
  {
    type: 'TEACHER',
    contents: [
      {
        default: '个人中心',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/teacher/user',
      },
      {
        default: '试题管理',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/teacher/questions',
      },
      {
        default: '试卷管理',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/teacher/exams',
      },
      {
        default: '我的班级',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/teacher/class',
      },
    ],
  },
  {
    type: 'ADMIN',
    contents: [
      {
        default: '个人中心',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/admin/user',
      },
      {
        default: '用户管理',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/admin/users',
      },
      {
        default: '试题管理',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/admin/questions',
      },
      {
        default: '班级管理',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/admin/class',
      },
    ],
  },
]

export default menu
