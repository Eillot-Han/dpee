package model

import "time"

type UserClasses struct {
	UserID     uint      `json:"user_id" gorm:"column:user_id;primaryKey"`
	ClassID    uint      `json:"class_id" gorm:"column:class_id;primaryKey"`
	EnrolledAt time.Time `json:"enrolled_at" gorm:"column:enrolled_at;default:CURRENT_TIMESTAMP"`
}

func (UserClasses) TableName() string {
	return "user_classes"
}
