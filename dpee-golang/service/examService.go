package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

// ExtractQuestionsByType 根据标签Type，抽取数量为num的题目
func ExtractQuestionsByType(c *gin.Context) {
	questionType := c.Query("type")
	num := c.Query("num")
	numInt, _ := strconv.Atoi(num)
	questions := extractQuestionsByType(questionType, numInt)
	//随机生成试卷ID并判断是否已存在，并将试卷和题目的关系写入examQuestion表中
	examID := createExam(numInt)
	createExamQuestion(examID, questions)
	questions = getQuestionsByExamID(examID)
	response.OkWithData(questions, c)
}

// MergeExams 合并两份试卷 将试卷2的题目写入试卷1
func MergeExams(c *gin.Context) {
	examID1 := c.Query("examID1")
	examID2 := c.Query("examID2")
	examID1Int, _ := strconv.Atoi(examID1)
	examID2Int, _ := strconv.Atoi(examID2)
	questions := getQuestionsByExamID(uint(examID2Int))
	createExamQuestion(uint(examID1Int), questions)
	deleteExamQuestion(uint(examID2Int))
	//删除试卷2
	deleteExam(uint(examID2Int))
	response.OkWithData(questions, c)
}

// 根据标签抽取题目
func extractQuestionsByType(questionType string, num int) []response.QuestionsResponse {
	var questions []response.QuestionsResponse
	var questionList []model.Questions
	db := global.DB
	if questionType == "all" {
		db.Find(&questionList)
	} else {
		db.Where("type = ?", questionType).Find(&questionList)
	}
	//随机抽取num个题目
	if len(questionList) == 0 {
		return questions
	}
	if len(questionList) < num {
		num = len(questionList)
	} else {
		questionList = RandomSelect(questionList, num)
	}

	for _, question := range questionList {
		var questionResponse response.QuestionsResponse
		questionResponse.Difficulty = question.Difficulty
		questionResponse.Points = question.Points
		questionResponse.CreateBy = question.CreateBy
		questionResponse.QuestionID = question.QuestionID
		questionResponse.QuestionContent = question.QuestionContent
		questionResponse.Type = question.Type
		questions = append(questions, questionResponse)
	}
	return questions
}

// RandomSelect 随机抽取num个题目
func RandomSelect(questionList []model.Questions, num int) []model.Questions {
	var result []model.Questions
	for i := 0; i < num; i++ {
		index := global.Rand.Intn(len(questionList))
		result = append(result, questionList[index])
		questionList = append(questionList[:index], questionList[index+1:]...)
	}
	return result
}

// 随机生成试卷ID并判断是否已存在
func createExam(num int) uint {
	var exam model.Exams
	db := global.DB
	for {
		examID := global.Rand.Intn(1000000000)
		db.Where("exams_id = ?", examID).First(&exam)
		if exam.ExamsID == 0 {
			exam.ExamsID = uint(examID)
			exam.TotalQuestion = num
			db.Create(&exam)
			break
		}
	}
	return exam.ExamsID
}

// 将试卷和题目的关系写入examQuestion表中
func createExamQuestion(examID uint, questions []response.QuestionsResponse) {
	var examQuestion model.ExamQuestionList
	db := global.DB
	for _, question := range questions {
		examQuestion.ExamID = examID
		examQuestion.QuestionID = question.QuestionID
		db.Create(&examQuestion)
	}
}

// 解除试卷和题目的关系
func deleteExamQuestion(examID uint) {
	var examQuestionList []model.ExamQuestionList
	db := global.DB
	db.Where("exam_id = ?", examID).Delete(&examQuestionList)
}

// 删除试卷
func deleteExam(examID uint) {
	var exam model.Exams
	db := global.DB
	db.Where("exams_id = ?", examID).Delete(&exam)
}

// 根据试卷ID获取题目
func getQuestionsByExamID(examID uint) []response.QuestionsResponse {
	var examQuestionList []model.ExamQuestionList
	var questions []response.QuestionsResponse
	db := global.DB
	db.Where("exam_id = ?", examID).Find(&examQuestionList)
	for _, examQuestion := range examQuestionList {
		var question model.Questions
		db.Where("question_id = ?", examQuestion.QuestionID).First(&question)
		var questionResponse response.QuestionsResponse
		questionResponse.Difficulty = question.Difficulty
		questionResponse.Points = question.Points
		questionResponse.CreateBy = question.CreateBy
		questionResponse.QuestionID = question.QuestionID
		questionResponse.QuestionContent = question.QuestionContent
		questionResponse.Type = question.Type
		questions = append(questions, questionResponse)
	}
	return questions
}

// ShowExamQuestionByID 根据试卷ID获取题目
func ShowExamQuestionByID(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	response.OkWithData(getQuestionsByExamID(uint(examIDInt)), c)
}

// ShowExamByName 根据试卷名称获取试卷
func ShowExamByName(c *gin.Context) {
	examName := c.Query("exam_name")
	var exam model.Exams
	db := global.DB
	db.Where("exams_name = ?", examName).First(&exam)
	var examResponse response.ExamsResponse
	examResponse.CreateAt = exam.CreateAt
	examResponse.CreateBy = exam.CreateBy
	examResponse.ClassID = exam.ClassID
	examResponse.Description = exam.Description
	examResponse.DurationMinutes = exam.DurationMinutes
	examResponse.EndTime = exam.EndTime
	examResponse.ExamsID = exam.ExamsID
	examResponse.ExamsName = exam.ExamsName
	examResponse.Location = exam.Location
	examResponse.StartTime = exam.StartTime
	examResponse.SubjectID = exam.SubjectID
	examResponse.TotalQuestion = exam.TotalQuestion
	response.OkWithData(examResponse, c)
}

// ShowExamByClassID 根据班级ID获取试卷
func ShowExamByClassID(c *gin.Context) {
	classID := c.Query("class_id")
	classIDInt, _ := strconv.Atoi(classID)
	var examList []model.Exams
	db := global.DB
	db.Where("class_id = ?", classIDInt).Find(&examList)
	var examResponseList []response.ExamsResponse
	for _, exam := range examList {
		var examResponse response.ExamsResponse
		examResponse.CreateAt = exam.CreateAt
		examResponse.CreateBy = exam.CreateBy
		examResponse.ClassID = exam.ClassID
		examResponse.Description = exam.Description
		examResponse.DurationMinutes = exam.DurationMinutes
		examResponse.EndTime = exam.EndTime
		examResponse.ExamsID = exam.ExamsID
		examResponse.ExamsName = exam.ExamsName
		examResponse.Location = exam.Location
		examResponse.StartTime = exam.StartTime
		examResponse.SubjectID = exam.SubjectID
		examResponse.TotalQuestion = exam.TotalQuestion
		examResponseList = append(examResponseList, examResponse)
	}
	response.OkWithData(examResponseList, c)
}

// ShowExamByUserID 根据用户ID获取试卷
func ShowExamByUserID(c *gin.Context) {
	userID := c.Query("user_id")
	userIDInt, _ := strconv.Atoi(userID)
	if userIDInt == 0 {
		response.FailWithMessage("用户ID不能为空", c)
		return
	}
	//搜索用户ID
	var user model.User
	db := global.DB
	db.Where("user_id = ?", userIDInt).First(&user)
	if user.UserID == 0 {
		response.FailWithMessage("用户不存在", c)
		return
	}
	//根据用户ID获取班级ID
	var userClasses model.UserClasses
	db.Where("user_id = ?", userIDInt).First(&userClasses)
	if userClasses.ClassID == 0 {
		response.FailWithMessage("用户未加入班级", c)
		return
	}
	//根据班级ID获取试卷
	var examList []model.Exams
	db.Where("class_id = ?", userClasses.ClassID).Find(&examList)
	if len(examList) == 0 {
		response.FailWithMessage("该班级没有试卷", c)
		return
	}
	var examResponseList []response.ExamsResponse
	for _, exam := range examList {
		var examResponse response.ExamsResponse
		examResponse.CreateAt = exam.CreateAt
		examResponse.CreateBy = exam.CreateBy
		examResponse.ClassID = exam.ClassID
		examResponse.Description = exam.Description
		examResponse.DurationMinutes = exam.DurationMinutes
		examResponse.EndTime = exam.EndTime
		examResponse.ExamsID = exam.ExamsID
		examResponse.ExamsName = exam.ExamsName
		examResponse.Location = exam.Location
		examResponse.StartTime = exam.StartTime
		examResponse.SubjectID = exam.SubjectID
		examResponseList = append(examResponseList, examResponse)
	}
	response.OkWithData(examResponseList, c)
}

// ShowExamStartTime 根据学生id显示存在开始时间和结束时间的试卷
func ShowExamStartTime(c *gin.Context) {
	userID := c.Query("user_id")
	userIDInt, _ := strconv.Atoi(userID)
	if userIDInt == 0 {
		response.FailWithMessage("用户ID不能为空", c)
		return
	}
	//搜索用户ID
	var user model.User
	db := global.DB
	db.Where("user_id = ?", userIDInt).First(&user)
	if user.UserID == 0 {
		response.FailWithMessage("用户不存在", c)
		return
	}
	//根据用户ID获取班级ID
	var userClasses model.UserClasses
	db.Where("user_id = ?", userIDInt).First(&userClasses)
	if userClasses.ClassID == 0 {
		response.FailWithMessage("用户未加入班级", c)
		return
	}
	//根据班级ID获取试卷
	var examList []model.Exams
	db.Where("class_id = ?", userClasses.ClassID).Find(&examList)
	if len(examList) == 0 {
		response.FailWithMessage("该班级没有试卷", c)
		return
	}
	var examResponseList []response.ExamsResponse
	for _, exam := range examList {
		var examResponse response.ExamsResponse
		examResponse.CreateAt = exam.CreateAt
		examResponse.CreateBy = exam.CreateBy
		examResponse.ClassID = exam.ClassID
		examResponse.Description = exam.Description
		examResponse.DurationMinutes = exam.DurationMinutes
		examResponse.EndTime = exam.EndTime
		examResponse.ExamsID = exam.ExamsID
		examResponse.ExamsName = exam.ExamsName
		examResponse.Location = exam.Location
		examResponse.StartTime = exam.StartTime
		examResponse.SubjectID = exam.SubjectID
		//判断开始时间和结束时间不为空
		if !examResponse.StartTime.IsZero() && !examResponse.EndTime.IsZero() {
			examResponseList = append(examResponseList, examResponse)
		}
	}
	response.OkWithData(examResponseList, c)
}

// ShowExamByTeacherID 根据老师ID获取试卷
func ShowExamByTeacherID(c *gin.Context) {
	teacherID := c.Query("teacher_id")
	teacherIDInt, _ := strconv.Atoi(teacherID)
	if teacherIDInt == 0 {
		response.FailWithMessage("老师ID不能为空", c)
		return
	}
	var examList []model.Exams
	db := global.DB
	db.Where("create_by = ?", teacherIDInt).Find(&examList)
	if len(examList) == 0 {
		response.FailWithMessage("该老师没有试卷", c)
		return
	}
	var examResponseList []response.ExamsResponse
	for _, exam := range examList {
		var examResponse response.ExamsResponse
		examResponse.CreateAt = exam.CreateAt
		examResponse.CreateBy = exam.CreateBy
		examResponse.ClassID = exam.ClassID
		examResponse.Description = exam.Description
		examResponse.DurationMinutes = exam.DurationMinutes
		examResponse.EndTime = exam.EndTime
		examResponse.ExamsID = exam.ExamsID
		examResponse.ExamsName = exam.ExamsName
		examResponse.Location = exam.Location
		examResponse.StartTime = exam.StartTime
		examResponse.SubjectID = exam.SubjectID
		examResponseList = append(examResponseList, examResponse)
	}
	response.OkWithData(examResponseList, c)
}

// CreateExam 创建试卷
func CreateExam(c *gin.Context) {
	examsName := c.Query("exams_name")
	description := c.Query("description")
	subjectID := c.Query("subject_id")
	subjectIDInt, _ := strconv.Atoi(subjectID)
	teacherID := c.Query("teacher_id")
	teacherIDInt, _ := strconv.Atoi(teacherID)
	classID := c.Query("class_id")
	classIDInt, _ := strconv.Atoi(classID)
	location := c.Query("location")
	startTime := c.Query("start_time")
	starttime, _ := time.Parse("2006-01-02 15:04:05", startTime)
	endTime := c.Query("end_time")
	endtime, _ := time.Parse("2006-01-02 15:04:05", endTime)
	durationMinutes := c.Query("duration_minutes")
	durationMinutesInt, _ := strconv.Atoi(durationMinutes)
	totalQuestion := c.Query("total_question")
	totalQuestionInt, _ := strconv.Atoi(totalQuestion)
	db := global.DB
	exams := model.Exams{
		ExamsName:       examsName,
		SubjectID:       uint(subjectIDInt),
		CreateBy:        uint(teacherIDInt),
		CreateAt:        time.Now(),
		Location:        location,
		ClassID:         uint(classIDInt),
		StartTime:       starttime,
		TotalQuestion:   totalQuestionInt,
		Description:     description,
		EndTime:         endtime,
		DurationMinutes: durationMinutesInt,
	}
	if err := db.Create(&exams).Error; err != nil {
		response.FailWithMessage("创建试卷失败", c)
		return
	}
	response.OkWithMessage("创建试卷成功", c)
}

// ShowExam 显示所有试卷
func ShowExam(c *gin.Context) {
	var examList []model.Exams
	db := global.DB
	db.Find(&examList)
	var examResponseList []response.ExamsResponse
	for _, exam := range examList {
		var examResponse response.ExamsResponse
		examResponse.CreateAt = exam.CreateAt
		examResponse.CreateBy = exam.CreateBy
		examResponse.ClassID = exam.ClassID
		examResponse.Description = exam.Description
		examResponse.DurationMinutes = exam.DurationMinutes
		examResponse.EndTime = exam.EndTime
		examResponse.ExamsID = exam.ExamsID
		examResponse.ExamsName = exam.ExamsName
		examResponse.Location = exam.Location
		examResponse.StartTime = exam.StartTime
		examResponse.SubjectID = exam.SubjectID
		examResponse.TotalQuestion = exam.TotalQuestion
		examResponseList = append(examResponseList, examResponse)
	}
	response.OkWithData(examResponseList, c)
}

// UpdateExam 更新试卷信息
func UpdateExam(c *gin.Context) {
	examsID := c.Query("exams_id")
	examsIDInt, _ := strconv.Atoi(examsID)
	if examsIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	examsName := c.Query("exams_name")
	description := c.Query("description")
	subjectID := c.Query("subject_id")
	subjectIDInt, _ := strconv.Atoi(subjectID)
	teacherID := c.Query("teacher_id")
	teacherIDInt, _ := strconv.Atoi(teacherID)
	classID := c.Query("class_id")
	classIDInt, _ := strconv.Atoi(classID)
	location := c.Query("location")
	startTime := c.Query("start_time")
	starttime, _ := time.Parse("2006-01-02 15:04:05", startTime)
	endTime := c.Query("end_time")
	endtime, _ := time.Parse("2006-01-02 15:04:05", endTime)
	durationMinutes := c.Query("duration_minutes")
	durationMinutesInt, _ := strconv.Atoi(durationMinutes)
	totalQuestion := c.Query("total_question")
	totalQuestionInt, _ := strconv.Atoi(totalQuestion)
	db := global.DB
	//判断时间有效性
	if starttime.After(endtime) {
		response.FailWithMessage("结束时间不能早于开始时间", c)
		return
	}
	if err := db.Model(&model.Exams{}).Where("exams_id = ?", examsIDInt).Updates(model.Exams{
		ExamsName:       examsName,
		SubjectID:       uint(subjectIDInt),
		CreateBy:        uint(teacherIDInt),
		CreateAt:        time.Now(),
		Location:        location,
		ClassID:         uint(classIDInt),
		StartTime:       starttime,
		TotalQuestion:   totalQuestionInt,
		Description:     description,
		EndTime:         endtime,
		DurationMinutes: durationMinutesInt,
	}).Error; err != nil {
		response.FailWithMessage("更新试卷信息失败", c)
		return
	}
	response.OkWithMessage("更新试卷信息成功", c)
}

// GetStartTimeByExamID 根据试卷id返回开始时间
func GetStartTimeByExamID(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	db := global.DB
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	response.OkWithData(exam.StartTime, c)
}

// GetEndTimeByExamID 根据试卷id返回结束时间
func GetEndTimeByExamID(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	db := global.DB
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	response.OkWithData(exam.EndTime, c)
}

// GetDurationByExamID 根据试卷id返回考试时长
func GetDurationByExamID(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	db := global.DB
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	response.OkWithData(exam.DurationMinutes, c)
}

// GetExamStartTime 计算考试开始剩余时间
func GetExamStartTime(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	db := global.DB
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	response.OkWithData(time.Until(exam.StartTime), c)
}

// GetExamEndTime 计算考试结束剩余时间
func GetExamEndTime(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	db := global.DB
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	response.OkWithData(time.Until(exam.EndTime), c)
}

// CreateStudentExam 学生开始考试创建studentExam
func CreateStudentExam(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	db := global.DB
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	var studentExam model.StudentExams
	studentExam.StudentID = uint(studentIDInt)
	studentExam.ExamID = uint(examIDInt)
	studentExam.StartTime = time.Now()
	studentExam.Status = "InProgress"
	if err := db.Create(&studentExam).Error; err != nil {
		response.FailWithMessage("创建学生考试失败", c)
		return
	}
	response.OkWithMessage("创建学生考试成功", c)
}

// SubmitAnswer 学生考试时保存答案（提交答案）在student——answer表
func SubmitAnswer(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	questionID := c.Query("question_id")
	questionIDInt, _ := strconv.Atoi(questionID)
	answer := c.Query("answer")
	//根据学生id和试卷id查询studentExam表
	db := global.DB
	var studentExam model.StudentExams
	if err := db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).First(&studentExam).Error; err != nil {
		response.FailWithMessage("查询学生考试失败", c)
		return
	}
	//判断学社试卷状态是否为已提交
	if studentExam.Status == "Submitted" {
		response.FailWithMessage("试卷已提交", c)
		return
	}
	//判断是否存在该答案，如果存在则更新，如果不存在则创建
	var studentAnswer model.StudentAnswers
	if err := db.Where("student_exam_id = ? and question_id = ?", studentExam.StudentExamID, questionIDInt).First(&studentAnswer).Error; err != nil {
		//创建
		studentAnswer.StudentExamID = studentExam.StudentExamID
		studentAnswer.QuestionID = uint(questionIDInt)
		studentAnswer.Answer = answer
		if err := db.Create(&studentAnswer).Error; err != nil {
			response.FailWithMessage("创建学生答案失败", c)
			return
		}
		response.OkWithMessage("创建学生答案成功", c)
		return
	}
	if err := db.Model(&studentAnswer).Updates(model.StudentAnswers{Answer: answer}).Error; err != nil {
		response.FailWithMessage("更新学生答案失败", c)
		return
	} else {
		response.OkWithMessage("更新学生答案成功", c)
	}
}

// BackStudentAnswerByExamID 根据ExamId和StudentId查询学生答案
func BackStudentAnswerByExamID(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	questionID := c.Query("question_id")
	questionIDInt, _ := strconv.Atoi(questionID)
	if questionIDInt == 0 {
		response.FailWithMessage("题目ID不能为空", c)
		return
	}
	//根据学生id和试卷id查询studentExam 表
	db := global.DB
	var studentExam model.StudentExams
	if err := db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).First(&studentExam).Error; err != nil {
		response.FailWithMessage("查询学生考试失败", c)
		return
	}
	//根据学生考试id和题目id查询studentAnswer表
	var studentAnswer model.StudentAnswers
	if err := db.Where("student_exam_id = ? and question_id = ?", studentExam.StudentExamID, questionIDInt).First(&studentAnswer).Error; err != nil {
		response.FailWithMessage("查询学生答案失败", c)
		return
	}
	response.OkWithData(studentAnswer.Answer, c)
}

// SubmitExam 提交试卷更新studentExam
func SubmitExam(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	db := global.DB
	var studentExam model.StudentExams
	if err := db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).First(&studentExam).Error; err != nil {
		response.FailWithMessage("查询学生考试失败", c)
		return
	}
	//更新状态
	if err := db.Model(&studentExam).Updates(model.StudentExams{Status: "Submitted"}).Error; err != nil {
		response.FailWithMessage("更新学生考试状态失败", c)
		return
	}
	//提交更新提交时间
	if err := db.Model(&studentExam).Updates(model.StudentExams{SubmittedAt: time.Now()}).Error; err != nil {
		response.FailWithMessage("更新学生考试提交时间失败", c)
		return
	}
	response.OkWithMessage("更新学生考试状态成功", c)
}

// CheckSubmitted 打开试卷前判断是否已提交
func CheckSubmitted(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	db := global.DB
	var studentExam model.StudentExams
	if err := db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).First(&studentExam).Error; err != nil {
		response.FailWithMessage("查询学生考试失败", c)
		return
	}
	if studentExam.Status == "Submitted" {
		response.FailWithMessage("试卷已提交", c)
		return
	}
	response.OkWithMessage("试卷未提交", c)
}

// TimeToSubmit 时间到强行更改状态为已提交
func TimeToSubmit(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	db := global.DB
	var studentExam model.StudentExams
	if err := db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).First(&studentExam).Error; err != nil {
		response.FailWithMessage("查询学生考试失败", c)
		return
	}
	if err := db.Model(&studentExam).Updates(model.StudentExams{Status: "Submitted"}).Error; err != nil {
		response.FailWithMessage("更新学生考试状态失败", c)
		return
	}
	response.OkWithMessage("更新学生考试状态成功", c)
	response.OkWithMessage("时间到，试卷已提交", c)
}

// ShowQuestionByPage 根据当前页码显示当前题目，一题一面
func ShowQuestionByPage(c *gin.Context) {
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	studentID := c.Query("student_id")
	studentIDInt, _ := strconv.Atoi(studentID)
	if studentIDInt == 0 {
		response.FailWithMessage("学生ID不能为空", c)
		return
	}
	db := global.DB
	var studentExam model.StudentExams
	if err := db.Where("student_id = ? and exam_id = ?", studentIDInt, examIDInt).First(&studentExam).Error; err != nil {
		response.FailWithMessage("查询学生考试失败", c)
		return
	}
	//根据页码显示当前的题目，一面显示一题
	page := c.Query("page")
	pageInt, _ := strconv.Atoi(page)
	if pageInt == 0 {
		response.FailWithMessage("页码不能为空", c)
		return
	}
	//题目数量在exam表
	var exam model.Exams
	if err := db.Where("exams_id = ?", examIDInt).First(&exam).Error; err != nil {
		response.FailWithMessage("查询试卷失败", c)
		return
	}
	if pageInt > exam.TotalQuestion {
		response.FailWithMessage("页码超出范围", c)
		return
	}
	//通过试卷id查找题目id，在通过题目id查找题目
	questions := getQuestionsByExamID(uint(examIDInt))

	if pageInt == exam.TotalQuestion {
		//最后一页
		response.OkWithData(gin.H{
			"question": questions[pageInt-1],
			"page":     pageInt,
		}, c)
		return
	}
	response.OkWithData(gin.H{
		"question": questions[pageInt-1],
		"page":     pageInt,
	}, c)
}

// UpdateStatus UpdateStatus更改所有该examID下考试的状态
func UpdateStatus(examID int) {
	db := global.DB
	var studentExams []model.StudentExams
	if err := db.Where("exam_id = ?", examID).Find(&studentExams).Error; err != nil {
		return
	}
	for _, studentExam := range studentExams {
		if err := db.Model(&studentExam).Updates(model.StudentExams{Status: "Evaluated"}).Error; err != nil {
			return
		}
	}
}

// GetStatus 返回状态
func GetStatus(c *gin.Context) {
	examID := c.PostForm("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	var studentExam model.StudentExams
	db := global.DB
	db.Where("exam_id = ?", examIDInt).Find(&studentExam)
	response.OkWithData(gin.H{
		"status": studentExam.Status,
	}, c)
}

// GetStudentExamListByExamID 根据examID获取学生考试列表
func GetStudentExamListByExamID(examIDInt int) []model.StudentExams {
	db := global.DB
	var studentExams []model.StudentExams
	if err := db.Where("exam_id = ?", examIDInt).Find(&studentExams).Error; err != nil {
		return nil
	}
	return studentExams
}

// ExportExam 导出整张试卷，包含题目内容等
func ExportExam(c *gin.Context) {
	//读出题目集
	examID := c.Query("exam_id")
	examIDInt, _ := strconv.Atoi(examID)
	if examIDInt == 0 {
		response.FailWithMessage("试卷ID不能为空", c)
		return
	}
	questions := getQuestionsByExamID(uint(examIDInt))
	response.OkWithData(gin.H{
		"questions": questions,
	}, c)
}
