package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterCorrection(r *gin.RouterGroup) {
	r.POST("/updateScore", service.UpdateScore)
	r.POST("/getStudentScore", service.GetStudentScore)
	r.POST("/correction", service.Correction1)
	r.POST("/getStudentExams", service.GetStudentExams)
}
