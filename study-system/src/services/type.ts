import { ReactNode } from 'react'

export type TAB = {
  name: string
  number: number
  component: ReactNode
}

/* 会员类型 */
export type MEMBER = 'NORMAL' | 'ANNUAL' | 'LIFETIME'

/* 性别 */
export type GENDER = 'MALE' | 'FEMALE'

/* 用户权限
 * ADMIN: 总管理员
 * USER: 普通用户
 * COFFEESTAFF: 咖啡职员
 */
export type ROLE = 'ADMIN' | 'USER' | 'COFFEE_STAFF'

/* 权限管理-所有用户信息列表 */
export type Users = {
  avatar: string
  id: string
  gender: GENDER
  member: MEMBER
  nickName: string
  phone: string
  role: ROLE
  alipayUserId: string
  wechatOpenId: string
}

/*
 * 创业资讯类型
 * DEFAULT: 推荐资讯
 * BLOCKCHAINTECHNOLOGY: 区块链技术
 * LEARNINGPRODUCTS: 智能硬件
 * AIOTTECHNOLOGY: AIOT技术
 * NETWORKANDCOMPUTINGTECHNOLOGY: 网络及运算技术
 * OTHER: 其他
 */
export type ZIXUNTYPE =
  | 'DEFAULT'
  | 'BLOCKCHAINTECHNOLOGY'
  | 'LEARNINGPRODUCTS'
  | 'AIOTTECHNOLOGY'
  | 'NETWORKANDCOMPUTINGTECHNOLOGY'
  | 'OTHER'

/* 内容管理-创业资讯列表 */
export type ZIXUNContents = {
  id: string
  createdAt: string
  publishAt: string
  banner: string
  title: string
  status: string
  type: ZIXUNTYPE
}

/*
 * 36C智库类型
 * BLOCKCHAINTECHNOLOGY: 区块链技术
 * LEARNINGPRODUCTS: 智能硬件
 * AIOTTECHNOLOGY: AIOT技术
 * CLOUDCOMPUTING: 云计算
 * OUTSEASERVICE: 出海服务
 * OTHER: 其他
 */
export type ZHIKUTYPE =
  | 'BLOCKCHAINTECHNOLOGY'
  | 'LEARNINGPRODUCTS'
  | 'AIOTTECHNOLOGY'
  | 'CLOUDCOMPUTING'
  | 'OUTSEASERVICE'
  | 'OTHER'

/* 内容管理-36C智库列表 */
export type ZHIKUContents = {
  id: string
  createdAt: string
  publishAt: string
  banner: string
  title: string
  status: string
  type: ZHIKUTYPE
}

/* 内容管理-内容详情 */
export type GeneralContent = {
  id: string
  createdAt: string
  publishAt: string
  banner: string
  title: string
  status: string
  type: ZHIKUTYPE | ZIXUNTYPE
  isUrl: boolean
  content: string
  pictures: string[]
  model: 'ZHIKU' | 'ZIXUN'
}

/* 活动类型 */
export type ACTIVITYTYPE = 'ROADSHOW' | 'LARGEACTIVITY' | 'CLOUDROADSHOW' | 'BIGENTERPRISEECOLOGY'

/* 活动管理-所有活动列表 */
export type Activities = {
  banner: string
  id: string
  startTime: string
  title: string
  endTime: string
  activityType: ACTIVITYTYPE
  location: string
}

/* 活动管理-活动详情 */
export type Activity = {
  banner: string
  id: string
  startTime: string
  title: string
  endTime: string
  activityType: ACTIVITYTYPE
  location: string
  content: string
}

/** 活动表单管理-表单列表 */
export type ActivityAudit = {
  id: string
  joinWay: 'ROADSHOW' | 'LOOK' | 'INVESTOR'
  createdAt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ARRIVED'
  rejectReason?: string
  attrs: { data: any }
  user: {
    id: string
    phone: string
  }
  activity: {
    id: string
    banner: string
    title: string
  }
  member?: {
    id: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    real_name: string
    avatar: string
    institute?: {
      id: string
      status: 'PENDING' | 'APPROVED' | 'REJECTED'
      logo: string
      name: string
    }
    project?: {
      id: string
      status: 'PENDING' | 'APPROVED' | 'REJECTED'
      logo: string
      name: string
    }
  }
  [key: string]: any
}

/* 办公空间-二级办公空间列表 */
export type SubWrokspaceSubinfo = {
  id: string
  name: string
  location: string
  address: string
  description: string
  resources: string[]
  totalStations: number
  usedStations: number
}

/* 办公空间-一级办公空间列表 */
export type Workspace = {
  id: string
  name: string
  resources: string[]
  description: string
  SubWorkSpace: SubWrokspaceSubinfo[]
}

/* 办公空间-工位表单 */
export type StationAudit = {
  id: string
  title: string
  submitter: {
    id: string
    nickName: string
    avatar: string
  }
  status: string
  rejectReason: string
  content: {
    [key: string]: any
  }
  [key: string]: any
}

/* 项目库管理-项目列表 */
export type projectListItemType = {
  id: string
  logo: string
  name: string
  founder: {
    real_name: string
    avatar: string
  }
  status: string
  createdAt: string
  members: {
    status: string
  }[]
  content: string
}

/* 项目库管理-项目详情 */
export type projectType = {
  id: string
  createdAt: string
  name: string
  logo: string
  bref_intro: string
  info: string
  url: string
  status: string
  industry: string
  rejectReason: string
  business: businessType
  financings: financingType[]
  members: {
    id: string
    avatar: string
    real_name: string
    intro: string
    is_founder: boolean
    BPUrl: string
    status: string
    phone: string
    user: {
      id: string
    }
  }[]
}

/* 项目库管理-项目列表 */
export type instituteListItemType = {
  id: string
  logo: string
  name: string
  status: string
  joinInstitute: boolean
  type: string
  createdAt: string
  members: {
    status: string
  }[]
}

/* 项目库管理-项目详情 */
export type instituteType = {
  id: string
  name: string
  logo: string
  intro: string
  contact: string
  contactPhone: string
  email: string
  url: string
  type: string
  location: string
  investmentOrientation: string
  investmentStep: string
  status: string
  joinInstitute: boolean
  members: {
    id: string
    avatar: string
    real_name: string
    intro: string
    status: string
    phone: string
    user: {
      id: string
    }
  }[]
  investmentItems: {
    id: string
    step: string
    name: string
    logo: string
    intro: string
  }[]
}

export type financingType = {
  id: React.Key
  amount?: string
  investors?: string
  series?: string
  time?: string
}

export type shareholderType = {
  id: string
  name?: string
  ratio?: string
  quota?: string
  time?: string
}

export type businessType = {
  id: string
  name: string
  eng_name: string
  corporate: string
  registered_address: string
  founded_time: string
  shareholders: shareholderType[]
}
