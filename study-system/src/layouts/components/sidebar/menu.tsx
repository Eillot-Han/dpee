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
        default: '欢迎页',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/welcome',
      },
    ],
  },
  {
    type: 'TEACHER',
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
    type: 'ADMIN',
    contents: [
      {
        default: '欢迎页',
        default_icon: require('../../../assets/icon/permission.png'),
        choosed_icon: require('../../../assets/icon/permission-choosed.png'),
        path: '/welcome',
      },
    ],
  },
]

export default menu
