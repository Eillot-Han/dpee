package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"strconv"
)

func CreateRoles() {
	db := global.DB
	var roles []model.Roles
	db.Find(&roles)
	if len(roles) == 0 {
		db.Create(&model.Roles{
			RoleName:    "admin",
			Description: "Administrator",
		})
		db.Create(&model.Roles{
			RoleName:    "teacher",
			Description: "Teacher",
		})
		db.Create(&model.Roles{
			RoleName: "student",
		})
	}
}

func UpdateOneRoles(c *gin.Context) {
	account := c.PostForm("account")
	role := c.PostForm("role")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	db.Model(&model.User{}).Where("user_id = ?", accountInt).Update("user_role", role)
	db.Model(&model.Roles{}).Where("role_id = ?", accountInt).Update("role_name", role)
	response.OkWithMessage("修改成功", c)
}

func UpdateRoles(c *gin.Context) {
	CreateRoles()
	db := global.DB
	var roles []model.Roles
	db.Find(&roles)
	response.OkWithData(roles, c)
}

func UpdateDescription(c *gin.Context) {
	role := c.PostForm("role")
	description := c.PostForm("description")
	db := global.DB
	db.Model(&model.Roles{}).Where("role_name = ?", role).Update("description", description)
	response.OkWithMessage("修改成功", c)
}

func ShowRoles(c *gin.Context) {
	CreateRoles()
	db := global.DB
	var roles []model.Roles
	db.Find(&roles)
	response.OkWithData(roles, c)
}

func ShowRolesByID(context *gin.Context) {
	account := context.Param("account")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	var roles model.Roles
	db.Where("role_id = ?", accountInt).First(&roles)
	response.OkWithData(roles, context)
}

func ShowRolesByName(context *gin.Context) {
	role := context.Param("role")
	db := global.DB
	var roles model.Roles
	db.Where("role_name = ?", role).First(&roles)
	response.OkWithData(roles, context)
}

func DeleteRoles(context *gin.Context) {
	account := context.Param("account")
	accountInt, _ := strconv.Atoi(account)
	db := global.DB
	db.Where("role_id = ?", accountInt).Delete(&model.Roles{})
	response.OkWithMessage("删除成功", context)
}

// IsAdmin 判断是否为管理员
func IsAdmin(account int) bool {
	db := global.DB
	var roles model.Roles
	db.Where("role_id = ?", account).First(&roles)
	if roles.RoleName == "Admin" {
		return true
	}
	return false
}

// IsTeacher 判断是否为老师
func IsTeacher(account int) bool {
	db := global.DB
	var roles model.Roles
	db.Where("role_id = ?", account).First(&roles)
	if roles.RoleName == "Teacher" {
		return true
	}
	return false
}

// IsStudent 判断是否为学生
func IsStudent(account int) bool {
	db := global.DB
	var roles model.Roles
	db.Where("role_id = ?", account).First(&roles)
	if roles.RoleName == "Student" {
		return true
	}
	return false
}

// CheckRoles 判断权限
func CheckRoles(c *gin.Context) {
	account := c.GetInt("account")
	if IsAdmin(account) {
		response.OkWithMessage("管理员", c)
		return
	}
	if IsTeacher(account) {
		response.OkWithMessage("老师", c)
		return
	}
	if IsStudent(account) {
		response.OkWithMessage("学生", c)
		return
	}
	response.FailWithMessage("权限不足", c)
	c.Abort()
}
