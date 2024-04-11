package model

import "time"

type Notifications struct {
	NotificationID uint      `json:"notification_id" gorm:"column:notification_id;primaryKey"`
	UserID         uint      `json:"user_id" gorm:"column:user_id"`
	Title          string    `json:"title" gorm:"column:title"`
	Message        string    `json:"message" gorm:"column:message"`
	Type           string    `json:"type" gorm:"column:type"`
	CreateAt       time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
	SentAt         time.Time `json:"sent_at" gorm:"column:sent_at"`
	ReadAt         time.Time `json:"read_at" gorm:"column:read_at"`
}

func (Notifications) TableName() string {
	return "notifications"
}
