package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterUser(r *gin.RouterGroup) {
	r.GET("/login", service.Login)                        // 登录
	r.POST("/enroll", service.Enroll)                     // 注册
	r.GET("/logout", service.Logout)                      // 退出
	r.POST("/cancelAccount", service.CancelAccount)       // 注销
	r.POST("/updateEmail", service.UpdateUserEmail)       // 修改邮箱
	r.POST("/updatePhone", service.UpdateUserPhone)       // 修改手机
	r.POST("/updatePassword", service.UpdateUserPassword) // 修改密码
	r.POST("/updateUser", service.UpdateUser)             // 修改用户信息
	r.POST("/updateUserRole", service.UpdateUserRole)     // 修改用户角色
	r.POST("/updateUserClass", service.UpdateUserClass)   // 修改用户班级
	r.GET("/showUserByID", service.ShowUserByID)          // 通过ID查询用户
	r.GET("/showUserByName", service.ShowUserByName)      // 通过姓名查询用户
	r.GET("/showUser", service.ShowAllUser)               // 查询所有用户
}
