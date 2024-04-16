import { gql } from '@apollo/client'

/* 权限管理-获取所有用户信息 */
export const USERS = gql`
  query Users($limit: Int!, $offset: Int, $phone: String) {
    users(limit: $limit, offset: $offset, phone: $phone) {
      total
      users {
        avatar
        id
        gender
        member
        nickName
        phone
        role
        alipayUserId
        wechatOpenId
      }
    }
  }
`

/* 权限管理-获取用户详细信息 */
export const USER_DETAIL = gql`
  query User($userId: String!) {
    user(id: $userId) {
      wechatOpenId
      role
      phone
      nickName
      nameCard {
        identity
        phone
        job
        company
        industry
        bio
        workLocation
      }
      location
      gender
      email
      birthday
      avatar
      alipayUserId
    }
  }
`

/* 内容管理-获取所有资讯列表 */
export const GENERALCONTENTS = gql`
  query GeneralContents($data: GeneralContentListInput!) {
    generalContents(data: $data) {
      total
      generalContents {
        id
        createdAt
        updatedAt
        deletedAt
        publishAt
        banner
        title
        content
        status
        type
      }
    }
  }
`

/* 内容管理-获取资讯详情 */
export const GENERALCONTENT = gql`
  query GeneralContent($generalContentId: String!) {
    generalContent(id: $generalContentId) {
      banner
      content
      createdAt
      id
      isUrl
      pictures
      model
      title
      type
    }
  }
`

/* 活动管理-获取所有活动列表 */
export const ACTIVITIES = gql`
  query Activities(
    $limit: Int!
    $offset: Int
    $activityType: ActivityType
    $sort: String
    $searchName: String
  ) {
    activities(
      limit: $limit
      offset: $offset
      activityType: $activityType
      sort: $sort
      searchName: $searchName
    ) {
      total
      activities {
        banner
        id
        startTime
        title
        endTime
        activityType
        location
      }
    }
  }
`

/* 活动管理-活动详情 */
export const ACTIVITY = gql`
  query Activities($activityId: String!) {
    activity(id: $activityId) {
      content
      endTime
      startTime
      location
      title
      activityType
      banner
      id
    }
  }
`

/**活动表单管理-获取所有表单 */
export const ACTIVITIE_AUDITS = gql`
  query ActivityJoinAudits(
    $userId: String
    $activityId: String
    $limit: Int!
    $offset: Int
    $memberId: String
  ) {
    ActivityJoinAudits(
      userId: $userId
      activityId: $activityId
      limit: $limit
      offset: $offset
      memberId: $memberId
    ) {
      ActivityJoinAudits {
        joinWay
        user {
          id
          phone
          nickName
          avatar
        }
        rejectReason
        attrs
        activity {
          id
          banner
          title
        }
        member {
          id
          avatar
          institute {
            id
            name
            logo
            status
          }
          status
          real_name
          project {
            id
            name
            logo
            status
          }
        }
        status
        createdAt
        id
      }
      total
    }
  }
`

/* 办公空间-一级办公空间 */
export const WORKSPACES = gql`
  query WorkSpaces($limit: Int!, $offset: Int) {
    workSpaces(limit: $limit, offset: $offset) {
      workSpaces {
        id
        name
        SubWorkSpace {
          address
          attrs
          createdAt
          deletedAt
          description
          id
          location
          name
          resources
          totalStations
          updatedAt
          usedStations
        }
        resources
        description
      }
    }
  }
`

/* 办公空间-二级办公空间 */
export const SUBWORKSPACES = gql`
  query SubWorkSpaces($limit: Int!, $offset: Int, $name: String) {
    subWorkSpaces(limit: $limit, offset: $offset, name: $name) {
      total
      subWorkSpaces {
        address
        attrs
        createdAt
        deletedAt
        description
        id
        location
        name
        resources
        totalStations
        updatedAt
        usedStations
      }
    }
  }
`

/* 办公空间-办公空间详情 */
export const WORKSPACE = gql`
  query WorkSpace($workSpaceId: String!) {
    workSpace(id: $workSpaceId) {
      SubWorkSpace {
        id
        name
        address
        attrs
        createdAt
        deletedAt
        description
        resources
        location
        totalStations
        updatedAt
        usedStations
      }
      id
      name
      resources
      description
      createdAt
    }
  }
`

/* 办公空间-二级空间详情 */
export const SUBWORKSPACE = gql`
  query SubWorkSpace($subWorkSpaceId: String!) {
    subWorkSpace(id: $subWorkSpaceId) {
      id
      attrs
      resources
      name
      location
      description
      workSpace {
        id
      }
    }
  }
`

/**办公空间-获取工位表单
 * @param auditType 工位 -> WORKSTATIONREQ 空间 -> WORKPLACEREQ
 */
export const WORKSPACE_AUDITS = gql`
query AuditForms($limit: Int!, $offset: Int, $auditType: AuditType) {
  auditForms(limit: $limit, offset: $offset, auditType: $auditType) {
    total
    auditForms {
      id
      title
      submitter {
        id
        nickName
        avatar
      }
      status
      rejectReason
      content
    }
  }
}
`

/* 获取oss签名 */
export const GET_OSS_HELPER = gql`
  query GetOssHelper {
    getOssHelper {
      OSSAccessKeyId
      policy
      signature
    }
  }
`
/** 项目库-数量查询 */
export const GET_NUM_PROJECTS = gql`
  query Projects($limit: Int!, $offset: Int, $status: AuthenticationStatus) {
    projects(limit: $limit, offset: $offset, status: $status) {
      total
    }
  }
`

/** 项目库-表格查询 */
export const GET_PROJECTS = gql`
  query Projects($limit: Int!, $offset: Int, $status: AuthenticationStatus, $name: String) {
    projects(limit: $limit, offset: $offset, status: $status, name: $name) {
      total
      projects {
        id
        logo
        name
        status
        members {
          status
        }
        founder {
          real_name
          avatar
        }
        createdAt
      }
    }
  }
`

/** 项目库-待审核数量查询 */
export const GET_PENDING_PROJECTS = gql`
  query PendingProjects($limit: Int!, $offset: Int) {
    PendingProjects(limit: $limit, offset: $offset) {
      total
      projects {
        id
        logo
        name
        status
        members {
          status
        }
        founder {
          real_name
          avatar
        }
        createdAt
      }
    }
  }
`
/** 项目库-待审核数量查询 */
export const GET_NUM_PENDING_PROJECTS = gql`
  query PendingProjects($limit: Int!, $offset: Int) {
    PendingProjects(limit: $limit, offset: $offset) {
      total
    }
  }
`

/** 项目库管理-项目详情 */
export const GET_PROJECT = gql`
  query Project($projectId: String!) {
    project(id: $projectId) {
      id
      name
      logo
      bref_intro
      info
      url
      industry
      status
      rejectReason
      business {
        id
        name
        eng_name
        corporate
        registered_address
        founded_time
        shareholders {
          id
          name
          ratio
          quota
          time
        }
      }
      financings {
        id
        amount
        investors
        series
        time
      }
      members {
        id
        avatar
        real_name
        intro
        is_founder
        BPUrl
        status
        phone
        user {
          id
        }
      }
    }
  }
`

/** 服务方管理-数量查询 */
export const GET_NUM_INSTITUTES = gql`
  query NewInstitutes($limit: Int!) {
    NewInstitutes(limit: $limit) {
      total
    }
  }
`

/** 服务方管理-表格查询 */
export const GET_INSTITUTES = gql`
  query NewInstitutes(
    $limit: Int!
    $offset: Int
    $type: InstituteType
    $status: AuthenticationStatus
    $name: String
  ) {
    NewInstitutes(limit: $limit, offset: $offset, type: $type, status: $status, name: $name) {
      total
      institutes {
        status
        name
        logo
        joinInstitute
        createdAt
        members {
          status
        }
        id
        type
      }
    }
  }
`
/** 服务方管理-服务方详情 */
export const GET_INSTITUTE = gql`
  query NewInstitute($newInstituteId: String!) {
    newInstitute(id: $newInstituteId) {
      id
      name
      logo
      intro
      contact
      contactPhone
      email
      url
      type
      location
      investmentOrientation
      investmentStep
      joinInstitute
      members {
        id
        avatar
        real_name
        intro
        status
        phone
        user {
          id
        }
        certifyingMaterial
      }
      status
      investmentItems {
        id
        intro
        logo
        name
        step
      }
    }
  }
`

/** 项目库-待审核数量查询 */
export const GET_PENDING_INSTITUTES = gql`
  query PendingInstitutes($limit: Int!, $offset: Int) {
    PendingInstitutes(limit: $limit, offset: $offset) {
      total
      institutes {
        status
        name
        logo
        joinInstitute
        createdAt
        members {
          status
        }
        id
        type
      }
    }
  }
`
