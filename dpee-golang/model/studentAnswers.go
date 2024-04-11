package model

import "time"

type StudentAnswers struct {
	StudentAnswerID uint      `json:"student_answer_id" gorm:"column:student_answer_id;primaryKey"`
	StudentExamID   uint      `json:"student_exam_id" gorm:"column:student_exam_id"`
	QuestionID      uint      `json:"question_id" gorm:"column:question_id"`
	Answer          string    `json:"answer" gorm:"column:answer"`
	PointsAwarded   int       `json:"points_awarded" gorm:"column:points_awarded"` // 将类型从字符串改为整数，以便存储分数
	CreateAt        time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
}

func (StudentAnswers) TableName() string {
	return "student_answers"
}
