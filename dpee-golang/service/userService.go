package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"sort"
	"strconv"
)

//Login 账号登录检测
func Login(c *gin.Context) {
	account := c.Query("account")
	password := c.Query("password")
	accountInt, _ := strconv.Atoi(account)

	var user model.User
	db := global.DB
	db.Where("user_id = ?", accountInt).Where("password = ?", password).First(&user)
	if user.UserID > 0 {
		response.OkWithData(user, c)
	} else {
		response.FailWithCodeMessage(response.FORBIDDEN, "账号或密码错误", c)
	}
}

//Enroll 注册账号
func Enroll(c *gin.Context) {
	account := c.PostForm("account")
	name := c.PostForm("name")
	password := c.PostForm("password")
	email := c.PostForm("email")
	phone := c.PostForm("phone")
	sex := c.PostForm("sex")
	firstName := c.PostForm("first_name")
	lastName := c.PostForm("last_name")
	accountInt, _ := strconv.Atoi(account)

	if DuplicateQueryAccount(accountInt) {
		response.FailWithMessage("账号已存在", c)
		return
	}

	db := global.DB

	user := model.User{
		UserID:    uint(accountInt),
		Password:  password,
		Sex:       sex,
		Email:     email,
		UserRole:  "Student",
		Username:  name,
		Phone:     phone,
		FirstName: firstName,
		LastName:  lastName,
	}

	db.Create(&user)

	response.OkWithMessage("账号创建成功", c)
}

//Logout 登出账号
func Logout(c *gin.Context) {
	response.Ok(c)
}

//CancelAccount 注销账号
func CancelAccount(c *gin.Context) {
	account := c.PostForm("account")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	var userModel model.User
	db.Where("user_id = ?", accountInt).Find(&userModel)
	db.Delete(&userModel)
	response.OkWithData("账号注销成功", c)
}

// UpdateUserEmail 修改邮箱
func UpdateUserEmail(c *gin.Context) {
	account := c.PostForm("account")
	Email := c.PostForm("email")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	var user model.User
	if err := db.First(&user, accountInt).Error; err != nil {
		response.FailWithMessage("账号不存在", c)
	}
	user.Email = Email
	if err := db.Save(&user).Error; err != nil {
		response.FailWithMessage("修改失败", c)
	}
	response.OkWithData(user, c)
	//response.OkWithMessage("修改成功", c)
}

// UpdateUserPhone 修改电话
func UpdateUserPhone(c *gin.Context) {
	account := c.PostForm("account")
	Phone := c.PostForm("phone")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	db.Model(&model.User{}).Where("user_id = ?", accountInt).Update("phone", Phone)
	response.OkWithMessage("修改成功", c)
}

// DuplicateQueryAccount 检测账号是否重复
func DuplicateQueryAccount(account int) bool {
	var user model.User
	db := global.DB
	db = db.Where("user_id = ?", account)
	db.Find(&user)
	if user.UserID > 0 {
		return true
	} else {
		return false
	}
}

// DuplicateTruePassword 检测密码是否正确
func DuplicateTruePassword(account int, password string) bool {
	db := global.DB
	var user model.User
	db.Where("account = ?", account).Where("password", password).Find(&user)
	if user.UserID > 0 {
		return true
	} else {
		return false
	}
}

// UpdateUserPassword 修改密码
func UpdateUserPassword(c *gin.Context) {
	account := c.PostForm("account")
	password := c.PostForm("password")
	accountInt, _ := strconv.Atoi(account)
	if DuplicateTruePassword(accountInt, password) {
		response.FailWithMessage("密码不正确", c)
		return
	}
	db := global.DB
	db.Model(&model.User{}).Where("user_id = ?", accountInt).Update("password", password)
	response.OkWithMessage("修改成功", c)
}

// UpdateUser 更新数据
func UpdateUser(c *gin.Context) {
	account := c.PostForm("account")
	name := c.PostForm("name")
	email := c.PostForm("email")
	phone := c.PostForm("phone")
	sex := c.PostForm("sex")
	firstName := c.PostForm("first_name")
	lastName := c.PostForm("last_name")
	accountInt, _ := strconv.Atoi(account)

	db := global.DB
	var user model.User
	if err := db.First(&user, accountInt).Error; err != nil {
		response.FailWithMessage("账号不存在", c)
	}

	user.Email = email
	user.Phone = phone
	user.Sex = sex
	user.Username = name
	user.FirstName = firstName
	user.LastName = lastName

	if err := db.Save(&user).Error; err != nil {
		response.FailWithMessage("修改失败", c)
	}

	db.Model(&model.User{}).Where("user_id = ?", accountInt).Updates(user)
	response.OkWithMessage("修改成功", c)
}

// UpdateUserRole 修改用户角色权限
func UpdateUserRole(c *gin.Context) {
	account := c.PostForm("account")
	role := c.PostForm("role")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	db.Model(&model.User{}).Where("user_id = ?", accountInt).Update("user_role", role)
	response.OkWithMessage("修改成功", c)
}

// UpdateUserClass 更新用户班级
func UpdateUserClass(c *gin.Context) {
	account := c.PostForm("account")
	class := c.PostForm("class")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	db.Model(&model.User{}).Where("user_id = ?", accountInt).Update("user_class", class)
	response.OkWithMessage("修改成功", c)
}

// ShowUserByID 根据ID查询用户
func ShowUserByID(context *gin.Context) {
	account := context.Query("account")
	accountInt, _ := strconv.Atoi(account)
	response.OkWithData(ShowUser(accountInt), context)
}

// ShowUser 查询用户
func ShowUser(account int) model.User {
	var user model.User
	db := global.DB
	db.Where("user_id = ?", account).Find(&user)
	return user
}

// ShowUserByName 根据用户名查询用户
func ShowUserByName(context *gin.Context) {
	name := context.Query("name")
	response.OkWithData(showUserByName(name), context)
}

// showUserByName 根据用户名查询用户
func showUserByName(name string) model.User {
	var user model.User
	db := global.DB
	db.Where("username = ?", name).Find(&user)
	return user
}

// SortByName 按名字排序
func SortByName(users []model.User) {
	sort.Slice(users, func(i, j int) bool {
		return users[i].Username < users[j].Username
	})
}

// ShowAllUser 显示所有用户
func ShowAllUser(context *gin.Context) {
	var users []model.User
	db := global.DB
	db.Find(&users)
	SortByName(users)
	response.OkWithData(users, context)
}
