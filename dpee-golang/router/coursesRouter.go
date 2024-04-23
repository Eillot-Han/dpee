package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterCourses(r *gin.RouterGroup) {
	r.POST("/createCourse", service.CreateCourse)                       // 创建课程
	r.GET("/showCourses", service.ShowCourses)                          // 显示课程
	r.GET("/showCoursesByID", service.ShowCoursesByID)                  // 根据ID显示课程
	r.GET("/showCoursesByName", service.ShowCoursesByName)              // 根据名称显示课程
	r.GET("/showCoursesByTeacher", service.ShowCoursesByTeacher)        // 根据教师显示课程
	r.PUT("/updateCourseName", service.UpdateCourseName)                // 更新课程
	r.DELETE("/deleteCourses", service.DeleteCourses)                   // 删除课程
	r.PUT("/updateCourseDescription", service.UpdateCourseDescription)  // 根据ID更新课程
	r.PUT("/updateCourseTeacher", service.UpdateCourseTeacher)          // 更新课程老师
	r.DELETE("/deleteStudentFromClass", service.DeleteStudentFromClass) // 删除学生
}
