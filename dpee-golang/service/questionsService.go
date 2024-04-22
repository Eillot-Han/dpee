package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

// CreateQuestions 创建题目
func CreateQuestions(c *gin.Context) {
	questionId := c.PostForm("question_id")
	questionIdInt, _ := strconv.Atoi(questionId)
	questionContent := c.PostForm("question_content")
	questionType := c.PostForm("question_type")
	answer := c.PostForm("answer")
	createTable := c.PostForm("create_table")
	DeleteTable := c.PostForm("delete_table")
	points := c.PostForm("points")
	Difficulty := c.PostForm("difficulty")
	DifficultyInt, _ := strconv.Atoi(Difficulty)
	createBy := c.PostForm("create_by")
	createByInt, _ := strconv.Atoi(createBy)
	pointsInt, _ := strconv.Atoi(points)

	//将数据插入数据库
	question := model.Questions{
		QuestionID:      uint(questionIdInt),
		QuestionContent: questionContent,
		Answer:          answer,
		Type:            questionType,
		CreateTable:     createTable,
		DeleteTable:     DeleteTable,
		Points:          pointsInt,
		CreateBy:        uint(createByInt),
		Difficulty:      DifficultyInt,
		CreateAt:        time.Now(),
	}
	db := global.DB
	db.Create(&question)
	response.OkWithMessage("题目创建成功", c)
}

// GetQuestions 查询题目
func GetQuestions(c *gin.Context) {
	questionId := c.Query("question_id")
	if questionId == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	if questionId == "0" {
		//查询所有题目
		var questions []model.Questions
		db := global.DB
		db.Find(&questions)
		response.OkWithData(questions, c)
	} else {
		//查询单个题目
		var question model.Questions
		db := global.DB
		db.Where("question_id = ?", questionId).First(&question)
		response.OkWithData(question, c)
		response.OkWithMessage("查询成功", c)
	}
}

// UpdateQuestions 修改题目
func UpdateQuestions(c *gin.Context) {
	questionId := c.PostForm("question_id")
	questionIdInt, _ := strconv.Atoi(questionId)
	questionContent := c.PostForm("question_content")
	answer := c.PostForm("answer")
	questionType := c.PostForm("question_type")
	createTable := c.PostForm("create_table")
	DeleteTable := c.PostForm("delete_table")
	Difficulty := c.PostForm("difficulty")
	DifficultyInt, _ := strconv.Atoi(Difficulty)
	points := c.PostForm("points")
	pointsInt, _ := strconv.Atoi(points)
	updateAt := time.Now()

	db := global.DB
	db.Model(&model.Questions{}).Where("question_id = ?", questionIdInt).Updates(model.Questions{
		QuestionContent: questionContent,
		Answer:          answer,
		Type:            questionType,
		CreateTable:     createTable,
		DeleteTable:     DeleteTable,
		Points:          pointsInt,
		UpdateAt:        updateAt,
		Difficulty:      DifficultyInt,
	})

	response.OkWithMessage("修改成功", c)
}

// DeleteQuestions 删除题目
func DeleteQuestions(c *gin.Context) {
	questionId := c.Query("question_id")
	if questionId == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	db := global.DB
	db.Where("question_id = ?", questionId).Delete(&model.Questions{})
	response.OkWithMessage("删除成功", c)
}

// ShowQuestions 显示所有题目
func ShowQuestions(c *gin.Context) {
	var questions []model.Questions
	db := global.DB
	db.Find(&questions)
	response.OkWithData(questions, c)
}

// ShowQuestionsByType 根据Type显示题目
func ShowQuestionsByType(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	pageInt, _ := strconv.Atoi(page)
	questionType := c.Query("question_type")
	if questionType == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	var questions []model.Questions
	db := global.DB
	db.Where("type = ?", questionType).Limit(5).Offset((pageInt - 1) * 5).Find(&questions)
	response.OkWithData(questions, c)
}

// ShowQuestionsByContent 根据题目内容模糊搜索题目
func ShowQuestionsByContent(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	pageInt, _ := strconv.Atoi(page)
	questionContent := c.Query("question_content")
	if questionContent == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	var questions []model.Questions
	db := global.DB
	db.Where("question_content like ?", "%"+questionContent+"%").Limit(5).Offset((pageInt - 1) * 5).Find(&questions)
	response.OkWithData(questions, c)
}

// ShowQuestionsByDifficulty 根据题目难度显示题目
func ShowQuestionsByDifficulty(c *gin.Context) {
	difficulty := c.Query("difficulty")
	if difficulty == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	var questions []model.Questions
	db := global.DB
	db.Where("difficulty = ?", difficulty).Find(&questions)
	response.OkWithData(questions, c)
}

// ShowQuestionsByPage 分页显示题目
func ShowQuestionsByPage(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		response.FailWithMessage("page参数错误", c)
		return
	}
	pageInt, _ := strconv.Atoi(page)
	user_id := c.Query("user_id")
	if user_id == "" {
		response.FailWithMessage("user_id参数错误", c)
		return
	}
	user_idInt, _ := strconv.Atoi(user_id)
	//根据user_id查询题目，分页显示题目，每页5题
	var questions []model.Questions
	db := global.DB
	db.Where("create_by = ?", user_idInt).Limit(5).Offset((pageInt - 1) * 5).Find(&questions)
	response.OkWithData(questions, c)
}
