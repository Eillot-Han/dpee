package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
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
	if user.UserID == 0 {
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
	accountInt, _ := strconv.Atoi(account)

	if DuplicateQueryAccount(accountInt) {
		response.FailWithMessage("账号已存在", c)
		return
	}

	db := global.DB

	user := model.User{
		UserID:   uint(accountInt),
		Password: password,
		Email:    email,
		Username: name,
		Phone:    phone,
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
	db.Model(&model.User{}).Where("user_id = ?", accountInt).Update("email", Email)
	response.OkWithMessage("修改成功", c)
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
