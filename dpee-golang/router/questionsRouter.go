package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterQuestions(r *gin.RouterGroup) {
	r.POST("/createQuestions", service.CreateQuestions)                    //创建题目
	r.GET("/getQuestions", service.GetQuestions)                           //查询题目
	r.PUT("/updateQuestions", service.UpdateQuestions)                     //更新题目
	r.DELETE("/deleteQuestions", service.DeleteQuestions)                  //删除题目
	r.GET("/showQuestions", service.ShowQuestions)                         //查询所有题目
	r.GET("/showQuestionsByType", service.ShowQuestionsByType)             //根据题目类型查询题目
	r.GET("/showQuestionsByDifficulty", service.ShowQuestionsByDifficulty) //根据题目难度查询题目
	r.GET("/showQuestionsByContent", service.ShowQuestionsByContent)       //根据题目内容查询题目
	r.GET("/showQuestionsByPage", service.ShowQuestionsByPage)             //根据页码查询题目
}
