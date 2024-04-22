package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterQuestions(r *gin.RouterGroup) {
	r.POST("/createQuestions", service.CreateQuestions)
	r.GET("/getQuestions", service.GetQuestions)
	r.PUT("/updateQuestions", service.UpdateQuestions)
	r.DELETE("/deleteQuestions", service.DeleteQuestions)
	r.GET("/showQuestions", service.ShowQuestions)
	r.GET("/showQuestionsByType", service.ShowQuestionsByType)
	r.GET("/showQuestionsByDifficulty", service.ShowQuestionsByDifficulty)
	r.GET("/showQuestionsByContent", service.ShowQuestionsByContent)
	r.GET("/showQuestionsByPage", service.ShowQuestionsByPage)
}
