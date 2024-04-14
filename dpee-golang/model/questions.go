package model

import "time"

type Questions struct {
	QuestionID      uint      `json:"question_id" gorm:"column:question_id;primaryKey"`
	QuestionContent string    `json:"question_content" gorm:"column:question_content"`
	Type            string    `json:"type" gorm:"column:type"`
	Answer          string    `json:"answer" gorm:"column:answer"`
	CreateTable     string    `json:"create_table" gorm:"column:create_table"`
	DeleteTable     string    `json:"delete_table" gorm:"column:delete_table"`
	Points          int       `json:"points" gorm:"column:points"`
	Difficulty      int       `json:"difficulty" gorm:"column:difficulty"`
	CreateBy        uint      `json:"create_by" gorm:"column:create_by"`
	CreateAt        time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
	UpdateAt        time.Time `json:"update_at" gorm:"column:update_at"`
}

func (Questions) TableName() string {
	return "questions"
}
