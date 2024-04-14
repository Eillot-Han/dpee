package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterExams(r *gin.RouterGroup) {
	r.POST("/exam", service.CreateExam)
	r.GET("/exam", service.ShowExam)
	r.GET("/extractQuestionsByType", service.ExtractQuestionsByType)
	r.GET("/showExamByName", service.ShowExamByName)
	r.GET("/showExamQuestionByID", service.ShowExamQuestionByID)
	r.GET("/showExamByClassID", service.ShowExamByClassID)
	r.GET("/showExamByUserID", service.ShowExamByUserID)
	r.GET("/showExamByTeacherID", service.ShowExamByTeacherID)
	r.GET("/updateExam", service.UpdateExam)
	r.GET("/getDurationByExamID", service.GetDurationByExamID)
	r.GET("/getStartTimeByExamID", service.GetStartTimeByExamID)
	r.GET("/getEndTimeByExamID", service.GetEndTimeByExamID)
	r.GET("/submitAnswer", service.SubmitAnswer)
	r.GET("/submitExam", service.SubmitExam)
	r.GET("/checkSubmitted", service.CheckSubmitted)
	r.GET("/timeToSubmit", service.TimeToSubmit)
	r.GET("/createStudentExam", service.CreateStudentExam)
	r.GET("/showQuestionByPage", service.ShowQuestionByPage)
	r.GET("/getExamStartTime", service.GetExamStartTime)
	r.GET("/getExamEndTime", service.GetExamEndTime)
	r.POST("/getStatus", service.GetStatus)
	r.GET("/exportExam", service.ExportExam)
}

//选定试卷所属班级等于发布试卷
