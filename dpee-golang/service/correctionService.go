package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"strconv"
)

//初步设定提交的同时开始修改试卷，也就是状态一经改变就开始批改试卷

// Correction 自动批改试卷
func Correction(examID int) {
	//通过examid搜索studentAnswer,然后遍历进行批改答案
	studentAnswer := GetStudentAnswerByExamID(examID)
	for _, v := range studentAnswer {
		//通过questionid搜索question
		question := GetQuestionByID(v.QuestionID)
		CorrectionAnswer(v, question)
	}
	//更改状态为已批改
	UpdateStatus(examID)
	//更新分数
	UpdateStudentScore(examID)
}

// Correction1 自动批改试卷
func Correction1(c *gin.Context) {
	examID := c.Param("exam_id")
	examID1, _ := strconv.Atoi(examID)
	studentID := c.Param("student_id")
	studentID1, _ := strconv.Atoi(studentID)
	//根据examid和studentid搜索studentExamId
	var studentExams model.StudentExams
	db := global.DB
	db.Where("exam_id = ? and student_id = ?", examID1, studentID1).Find(studentExams)
	studentExamId1 := int(studentExams.StudentExamID)
	//通过examid搜索studentAnswer,然后遍历进行批改答案
	studentAnswer := GetStudentAnswerByExamID(studentExamId1)
	for _, v := range studentAnswer {
		//通过questionid搜索question
		question := GetQuestionByID(v.QuestionID)
		CorrectionAnswer(v, question)
	}
	//更改状态为已批改
	UpdateStatus(studentExamId1)
	//更新分数
	UpdateStudentScore(studentExamId1)
	response.OkWithMessage("批改成功", c)
}

// GetStudentAnswerByExamID 搜索studentAnswer
func GetStudentAnswerByExamID(studentExamID int) []model.StudentAnswers {
	var studentAnswer []model.StudentAnswers
	db := global.DB
	db.Where("student_exam_id = ?", studentExamID).Find(&studentAnswer)
	return studentAnswer
}

// GetQuestionByID 搜索question
func GetQuestionByID(questionID uint) model.Questions {
	var question model.Questions
	db := global.DB
	db.Where("question_id = ?", questionID).Find(&question)
	return question
}

// CorrectionAnswer 批改答案
func CorrectionAnswer(studentAnswer model.StudentAnswers, question model.Questions) {
	//通过question的type进行判断
	db2 := global.TestDB
	db := global.DB

	//通过createTable创建一个临时表，createTable中是完整的建表sql
	db2.Exec(question.CreateTable)
	Answer1 := db2.Exec(studentAnswer.Answer)
	db2.Exec(question.DeleteTable)
	//创建一个临时表，然后插入studentAnswer的答案，然后插入question的答案
	db2.Exec(question.CreateTable)
	Answer2 := db2.Exec(question.Answer)
	db2.Exec(question.DeleteTable)

	if Answer1.RowsAffected == Answer2.RowsAffected {
		//如果相等，则将pointsAwarded设置为points
		db.Model(&studentAnswer).Where("student_answer_id = ?", studentAnswer.StudentAnswerID).Update("points_awarded", question.Points)
	} else {
		//如果不相等，则将pointsAwarded设置为0
		db.Model(&studentAnswer).Where("student_answer_id = ?", studentAnswer.StudentAnswerID).Update("points_awarded", 0)
	}
}

// UpdateScore 教师更改成绩
func UpdateScore(c *gin.Context) {
	var studentAnswer model.StudentAnswers
	studentExamID := c.PostForm("student_exam_id")
	questionID := c.PostForm("question_id")
	pointsAwarded := c.PostForm("points_awarded")
	studentExamIDInt, _ := strconv.Atoi(studentExamID)
	questionIDInt, _ := strconv.Atoi(questionID)
	pointsAwardedInt, _ := strconv.Atoi(pointsAwarded)
	db := global.DB
	db.Model(&studentAnswer).Where("student_exam_id = ? and question_id = ?", studentExamIDInt, questionIDInt).Update("points_awarded", pointsAwardedInt)
	response.OkWithData("修改成功", c)
}

// UpdateStudentScore 更新学生成绩
func UpdateStudentScore(examID int) {
	//获取studentAnswer列表
	studentAnswer := GetStudentAnswerByExamID(examID)
	db := global.DB
	for _, v := range studentAnswer {
		//获取pointsAwarded
		var pointsAwarded int
		db.Model(&v).Where("student_answer_id = ?", v.StudentAnswerID).Select("points_awarded").Scan(&pointsAwarded)
		//更新studentExam的score score += pointsAwarded
		db.Model(&model.StudentExams{}).Where("student_exam_id = ?", v.StudentExamID).Update("score", gorm.Expr("score + ?", pointsAwarded))
	}
}

// GetStudentScore 返回学生成绩在表StudentExams
func GetStudentScore(c *gin.Context) {
	studentExamID := c.Query("student_exam_id")
	studentExamIDInt, _ := strconv.Atoi(studentExamID)
	response.OkWithData(GetStudentScoreByID(studentExamIDInt), c)
}

// GetStudentScoreByID 搜索学生成绩
func GetStudentScoreByID(studentExamID int) model.StudentExams {
	var studentExam model.StudentExams
	db := global.DB
	db.Where("student_exam_id = ?", studentExamID).Find(&studentExam)
	return studentExam
}

// GetStudentScoreByStudentIDAndExamID 搜索学生成绩
func GetStudentScoreByStudentIDAndExamID(c *gin.Context) {
	{
		studentID := c.Query("student_id")
		studentIDInt, _ := strconv.Atoi(studentID)
		examID := c.Query("exam_id")
		examIDInt, _ := strconv.Atoi(examID)
		db := global.DB
		var studentExam model.StudentExams
		db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).Find(&studentExam)
		response.OkWithData(studentExam.Score, c)
	}
}

// GetStudentExams studentExams成绩导出
func GetStudentExams(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	studentExamList := GetStudentExamListByExamID(examIDInt)
	response.OkWithData(studentExamList, c)
}

// CheckSQL 检查sql语法
func CheckSQL(sql string) bool {
	db := global.TestDB
	err := db.Exec(sql).Error
	if err != nil {
		return false
	}
	return true
}

//type SQLStatement struct {
//	// 包含SQL语句各个部分的信息
//	SQL       string
//	UsesIndex bool
//	AvoidsSubquery bool
//	UsesSubquery bool
//	UsesJoin bool
//	UsesWhere bool
//	UsesGroupBy bool
//	UsesOrderBy bool
//	UsesLimit bool
//	UsesHaving bool
//	UsesDistinct bool
//	UsesUnion bool
//	UsesOffset bool
//}
//
//func ParseSQL(sql string) (*SQLStatement, error) {
//	lexer := NewSQLLexer(sql)
//	parser := NewSQLParser(lexer)
//	stmt, err := parser.Parse()
//	if err != nil {
//		return nil, err
//	}
//	return stmt, nil
//}
//
//func CheckSQLSemantics(stmt *SQLStatement) error {
//	// 检查表和字段是否存在，JOIN条件是否合理等
//
//	return nil // 或者返回错误
//}
//
//func ScoreSQLPerformance(stmt *SQLStatement) int {
//	score := 0
//	// 根据SQL语句结构和特征给予评分
//	if stmt.UsesIndex {
//		score += 10
//	}
//	if stmt.AvoidsSubquery {
//		score += 5
//	}
//	// 更多评分规则...
//	return score
//}

//负载均衡

// GetStudentScoreListByExamID 根据examid返回学生成绩
func GetStudentScoreListByExamID(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	//用exam_id查询到student_exam表
	studentExamList := GetStudentExamListByExamID(examIDInt)
	response.OkWithData(studentExamList, c)
}

// GetStudentScoreListByStudentID 根据学生id返回学生成绩
func GetStudentScoreListByStudentID(c *gin.Context) {
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	//用student_id查询到student_exam表
	db := global.DB
	var studentExamList model.StudentExams
	db.Where("student_id = ?", studentIDInt).First(&studentExamList)
	response.OkWithData(studentExamList.Score, c)
}
