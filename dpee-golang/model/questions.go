package model

import "time"

type Questions struct {
	QuestionID      uint      `json:"question_id" gorm:"column:question_id;primaryKey"`
	ExamID          uint      `json:"exam_id" gorm:"column:exam_id"`
	QuestionContent string    `json:"question_content" gorm:"column:question_content"`
	AnswerType      string    `json:"answer_type" gorm:"column:answer_type"`
	Answer          string    `json:"answer" gorm:"column:answer"`
	Points          int       `json:"points" gorm:"column:points"`
	CreateBy        uint      `json:"create_by" gorm:"column:create_by"`
	CreateAt        time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
	UpdateAt        time.Time `json:"update_at" gorm:"column:update_at"`
}

func (Questions) TableName() string {
	return "questions"
}
