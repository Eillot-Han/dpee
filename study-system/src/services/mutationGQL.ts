import { gql } from '@apollo/client'

/* 发送短信接口 */
export const SEND_SMS = gql`
  mutation SendSms($data: SendSmsInput!) {
    SendSms(data: $data) {
      msg
    }
  }
`
/* 登录接口 */
export const LOGIN = gql`
  mutation LoginV2($input: LoginInputV3!) {
    loginV2(input: $input) {
      token
      user {
        id
        nickName
        avatar
        role
        member
        location
        gender
        birthday
        email
        phone
        did
        infoPercent
      }
    }
  }
`

/** 更改用户信息 */
export const UPDATE_USER = gql`
  mutation UpdateUserForAdmin($data: UpdateUserForAdminInput!) {
    updateUserForAdmin(data: $data) {
      id
    }
  }
`

/* 新增活动*/
export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($data: ActivityCreateInput!) {
    createActivity(data: $data) {
      createdAt
    }
  }
`

/**删除活动 */
export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($deleteActivityId: String!) {
    deleteActivity(id: $deleteActivityId) {
      updatedAt
    }
  }
`
/**更新活动 */
export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity($data: ActivityUpdateInput!) {
    updateActivity(data: $data) {
      updatedAt
    }
  }
`

/* 新增内容*/
export const Create_Content = gql`
  mutation Mutation($data: GeneralContentCreateInput!) {
    createGeneralContent(data: $data) {
      createdAt
    }
  }
`

/**删除内容 */
export const Delete_Content = gql`
  mutation Mutation($deleteGeneralContentId: String!) {
    deleteGeneralContent(id: $deleteGeneralContentId) {
      deletedAt
      updatedAt
    }
  }
`
/**更新内容 */
export const Update_Content = gql`
  mutation Mutation($data: GeneralContentUpdateInput!) {
    updateGeneralContent(data: $data) {
      updatedAt
    }
  }
`

// 审核表单
export const Audit_FORM = gql`
  mutation HandleAuditForm($data: AuditFormHandleInput!) {
    handleAuditForm(data: $data) {
      id
      status
    }
  }
`

// 删除表单
export const DELETE_FORM = gql`
  mutation DeleteAuditForm($deleteAuditFormId: String!) {
    deleteAuditForm(id: $deleteAuditFormId) {
      id
      updatedAt
    }
  }
`
/** 活动表单-审核表单*/
export const Activity_Audit_FORM = gql`
  mutation HandleActivityJoinAudit($data: ActivityJoinHandleInput!) {
    handleActivityJoinAudit(data: $data) {
      id
    }
  }
`
/** 活动表单-删除表单*/
export const Delete_Activity_Audit = gql`
  mutation DeleteActivityJoinAudit($deleteActivityJoinAuditId: String!) {
    deleteActivityJoinAudit(id: $deleteActivityJoinAuditId) {
      id
    }
  }
`
/** 项目库管理-更新项目基本信息 */
export const Update_Project = gql`
  mutation UpdateProject(
    $updateProjectId: String!
    $name: String
    $logo: String
    $brefIntro: String
    $info: String
    $url: String
    $industry: String
    $rejectReason: String
    $status: AuthenticationStatus
  ) {
    updateProject(
      id: $updateProjectId
      name: $name
      logo: $logo
      bref_intro: $brefIntro
      info: $info
      url: $url
      industry: $industry
      rejectReason: $rejectReason
      status: $status
    ) {
      id
    }
  }
`
/** 项目库管理-更新工商信息 */
export const Update_Business = gql`
  mutation UpdateBusiness(
    $updateBusinessId: String!
    $name: String
    $engName: String
    $corporate: String
    $foundedTime: String
    $registeredAddress: String
  ) {
    updateBusiness(
      id: $updateBusinessId
      name: $name
      eng_name: $engName
      corporate: $corporate
      founded_time: $foundedTime
      registered_address: $registeredAddress
    ) {
      id
    }
  }
`
/** 项目库管理-添加股东*/
export const Add_Shareholder = gql`
  mutation CreateShareholders($shareholders: [shareholderInput!]!) {
    createShareholders(shareholders: $shareholders) {
      id
    }
  }
`
/** 项目库管理-更新股东*/
export const Update_Shareholder = gql`
  mutation UpdateShareholder(
    $updateShareholderId: String!
    $name: String
    $ratio: String
    $quota: String
    $time: String
  ) {
    updateShareholder(
      id: $updateShareholderId
      name: $name
      ratio: $ratio
      quota: $quota
      time: $time
    ) {
      id
    }
  }
`
/** 项目库管理-删除股东*/
export const Delete_Shareholder = gql`
  mutation DeleteShareholder($deleteShareholderId: String!) {
    deleteShareholder(id: $deleteShareholderId) {
      id
    }
  }
`

/** 项目库管理-添加融资*/
export const Add_Financing = gql`
  mutation CreateFinancing($financings: [financingInput!]!) {
    createFinancing(financings: $financings) {
      id
    }
  }
`
/** 项目库管理-更新融资*/
export const Update_Financing = gql`
  mutation UpdateFinancing(
    $updateFinancingId: String!
    $amount: String
    $investors: String
    $series: String
    $time: String
  ) {
    updateFinancing(
      id: $updateFinancingId
      amount: $amount
      investors: $investors
      series: $series
      time: $time
    ) {
      id
    }
  }
`
/** 项目库管理-删除融资*/
export const Delete_Financing = gql`
  mutation DeleteFinancing($deleteFinancingId: String!) {
    deleteFinancing(id: $deleteFinancingId) {
      id
    }
  }
`
/** 项目库管理-添加成员*/
export const Add_Member = gql`
  mutation CreateShareholders($shareholders: [shareholderInput!]!) {
    createShareholders(shareholders: $shareholders) {
      id
    }
  }
`
/** 项目库管理-更新成员*/
export const Update_Member = gql`
  mutation UpdateMember(
    $updateMemberId: String!
    $realName: String
    $avatar: String
    $intro: String
    $rejectReason: String
    $bpUrl: String
    $certifyingMaterial: String
    $status: AuthenticationStatus
  ) {
    updateMember(
      id: $updateMemberId
      real_name: $realName
      avatar: $avatar
      intro: $intro
      rejectReason: $rejectReason
      BPUrl: $bpUrl
      certifyingMaterial: $certifyingMaterial
      status: $status
    ) {
      id
    }
  }
`
/** 项目库管理-删除成员*/
export const Delete_Member = gql`
  mutation Mutation($deleteMemberId: String!) {
    deleteMember(id: $deleteMemberId) {
      id
    }
  }
`

/* 发送邮件*/
export const SEND_EMAIL = gql`
  mutation SendEmail($data: SendEmailInput!) {
    SendEmail(data: $data) {
      msg
    }
  }
`

/** 服务方库管理-更新服务方基本信息 */
export const Update_Institute = gql`
  mutation Mutation($data: UpdateNewInstituteInput!) {
    updateNewInstitute(data: $data) {
      id
    }
  }
`

/** 项目库管理-添加融资
 * @param data
 * :{
 * "step": null,
 * "name": null,
 * "logo": null,
 * "intro": null,
 * "instituteId": null
 * }
 */
export const Add_InvestmentItem = gql`
  mutation CreateInvestmentItem($data: CreateInvestmentItemInput!) {
    createInvestmentItem(data: $data) {
      id
    }
  }
`
/** 项目库管理-更新融资
 * 
  @param data: {
    "step": null,
    "name": null,
    "logo": null,
    "intro": null,
    "id": null
  }
*/
export const Update_InvestmentItem = gql`
  mutation UpdateInvestmentItem($data: UpdateInvestmentItemInput!) {
    updateInvestmentItem(data: $data) {
      id
    }
  }
`
/** 项目库管理-删除融资
 * @param deleteInvestmentItemId
 */
export const Delete_InvestmentItem = gql`
  mutation DeleteInvestmentItem($deleteInvestmentItemId: String!) {
    deleteInvestmentItem(id: $deleteInvestmentItemId) {
      id
    }
  }
`

/** 办公空间管理-新增一级空间
 * @param name
 * @param resources
 * @param description
 */
export const Create_WorkSpace = gql`
  mutation CreateWorkSpace($name: String!, $resources: String!, $description: String) {
    createWorkSpace(name: $name, resources: $resources, description: $description) {
      id
    }
  }
`
/** 办公空间管理-更新一级空间
 * @param updateWorkSpaceId
 * @param name
 * @param resources
 * @param description
 */
export const Update_WorkSpace = gql`
  mutation UpdateWorkSpace(
    $updateWorkSpaceId: String!
    $resources: String!
    $name: String!
    $description: String
  ) {
    updateWorkSpace(
      id: $updateWorkSpaceId
      resources: $resources
      name: $name
      description: $description
    ) {
      id
    }
  }
`
/** 办公空间管理-新增二级空间
 * @param data :
 *  {
 * @param workSpaceId
 * @param resources
 * @param name
 * @param location
 * @param description
 * @param attrs
 * }
 */
export const Create_SubWorkSpace = gql`
  mutation CreateSubWorkSpace($data: CreateSubWorkSpaceInput!) {
    createSubWorkSpace(data: $data) {
      id
    }
  }
`
/** 办公空间管理-更新二级空间
 * @param data :
 *  {
 * @param id
 * @param workSpaceId
 * @param resources
 * @param name
 * @param location
 * @param description
 * @param attrs
 * }
 */
export const Update_SubWorkSpace = gql`
  mutation UpdateSubWorkSpace($data: UpdateSubWorkSpaceInput!) {
    updateSubWorkSpace(data: $data) {
      id
    }
  }
`
