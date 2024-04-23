package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterCorrection(r *gin.RouterGroup) {
	r.POST("/updateScore", service.UpdateScore)                                                // 更新分数
	r.GET("/getStudentScore", service.GetStudentScore)                                         // 获取学生成绩
	r.POST("/correction", service.Correction1)                                                 // 自动批改
	r.POST("/getStudentExams", service.GetStudentExams)                                        // 获取学生考试列表
	r.GET("/getStudentScoreByStudentIDAndExamID", service.GetStudentScoreByStudentIDAndExamID) // 获根据学生ID和考试ID获取学生成绩
	r.GET("/getStudentScoreListByExamID", service.GetStudentScoreListByExamID)                 // 根据考试ID获取学生成绩
	r.GET("/getStudentScoreListByStudentID", service.GetStudentScoreListByStudentID)           // 根据学生ID获取学生成绩
}
