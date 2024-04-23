package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterExams(r *gin.RouterGroup) {
	r.POST("/exam", service.CreateExam)                                    // 创建考试
	r.GET("/exam", service.ShowExam)                                       // 显示考试
	r.GET("/extractQuestionsByType", service.ExtractQuestionsByType)       // 根据类型提取题目
	r.GET("/showExamByName", service.ShowExamByName)                       // 根据名称显示考试
	r.GET("/showExamQuestionByID", service.ShowExamQuestionByID)           // 根据ID显示考试
	r.GET("/showExamByClassID", service.ShowExamByClassID)                 // 根据班级ID显示考试
	r.GET("/showExamByUserID", service.ShowExamByUserID)                   // 根据用户ID显示考试
	r.GET("/showExamByTeacherID", service.ShowExamByTeacherID)             // 根据教师ID显示考试
	r.GET("/updateExam", service.UpdateExam)                               // 更新考试
	r.GET("/getDurationByExamID", service.GetDurationByExamID)             // 获取考试时长
	r.GET("/getStartTimeByExamID", service.GetStartTimeByExamID)           // 获取考试开始时间
	r.GET("/getEndTimeByExamID", service.GetEndTimeByExamID)               // 获取考试结束时间
	r.GET("/submitAnswer", service.SubmitAnswer)                           // 提交答案
	r.GET("/submitExam", service.SubmitExam)                               // 提交考试
	r.GET("/checkSubmitted", service.CheckSubmitted)                       // 检查是否提交
	r.GET("/timeToSubmit", service.TimeToSubmit)                           // 剩余时间
	r.GET("/createStudentExam", service.CreateStudentExam)                 // 创建学生考试
	r.GET("/showQuestionByPage", service.ShowQuestionByPage)               // 分页显示题目
	r.GET("/getExamStartTime", service.GetExamStartTime)                   // 获取考试开始时间
	r.GET("/getExamEndTime", service.GetExamEndTime)                       // 获取考试结束时间
	r.POST("/getStatus", service.GetStatus)                                // 获取考试状态
	r.GET("/exportExam", service.ExportExam)                               // 导出考试
	r.GET("/mergeExams", service.MergeExams)                               // 合并考试
	r.GET("/backStudentAnswerByExamID", service.BackStudentAnswerByExamID) // 获取学生答案
	r.GET("/showExam", service.ShowExamStartTime)                          // 显示考试开始时间
	r.GET("/updateStartTimeAndEndTime", service.UpdateStartTimeAndEndTime) // 更新考试开始时间和结束时间
	r.GET("/exportStudentExams", service.ExportStudentExams)               // 导出学生考试
}

//选定试卷所属班级等于发布试卷
