package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterCourses(r *gin.RouterGroup) {
	r.POST("/createCourse", service.CreateCourse)
	r.GET("/showCourses", service.ShowCourses)
	r.GET("/showCoursesByID", service.ShowCoursesByID)
	r.GET("/showCoursesByName", service.ShowCoursesByName)
	r.GET("/showCoursesByTeacher", service.ShowCoursesByTeacher)
	r.PUT("/updateCourseName", service.UpdateCourseName)
	r.DELETE("/deleteCourses", service.DeleteCourses)
	r.PUT("/updateCourseDescription", service.UpdateCourseDescription)
	r.PUT("/updateCourseTeacher", service.UpdateCourseTeacher)

}
