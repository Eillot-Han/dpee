package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterClass(r *gin.RouterGroup) {
	r.GET("/showClasses", service.ShowClasses)                     // 显示所有班级
	r.GET("/showClassesByID", service.ShowClassesByID)             // 根据id显示班级
	r.GET("/showClassesByName", service.ShowClassesByName)         // 根据名字显示班级
	r.POST("/createClasses", service.CreateClasses)                // 创建班级
	r.PUT("/updateClass", service.UpdateClass)                     // 更新班级
	r.DELETE("/deleteClass", service.DeleteClass)                  // 删除班级
	r.PUT("/addStudentToClass", service.AddStudentToClass)         // 添加学生到班级
	r.GET("/showStudentsByClassID", service.ShowStudentsByClassID) // 根据班级id显示学生
}
