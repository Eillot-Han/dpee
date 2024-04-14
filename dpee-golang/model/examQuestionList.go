package model

type ExamQuestionList struct {
	QuestionNumber int  `json:"question_number" gorm:"column:question_number"`
	QuestionID     uint `json:"question_id" gorm:"column:question_id"`
	ExamID         uint `json:"exam_id" gorm:"column:exam_id"`
}

func (ExamQuestionList) TableName() string {
	return "exam_question_list"
}
