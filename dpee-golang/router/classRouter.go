package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterClass(r *gin.RouterGroup) {
	r.GET("/showClasses", service.ShowClasses)
	r.GET("/showClassesByID", service.ShowClassesByID)
	r.GET("/showClassesByName", service.ShowClassesByName)
	r.POST("/createClasses", service.CreateClasses)
	r.PUT("/updateClass", service.UpdateClass)
	r.DELETE("/deleteClass", service.DeleteClass)
	r.PUT("/addStudentToClass", service.AddStudentToClass)
	r.GET("/showStudentsByClassID", service.ShowStudentsByClassID)
}
