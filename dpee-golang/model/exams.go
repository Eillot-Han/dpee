package model

import "time"

type Exams struct {
	ExamsID         uint      `json:"exams_id" gorm:"column:exams_id;primaryKey"` // 在 GORM 中，通常建议使用单一主键，此处可能需要重新考虑字段命名避免冗余
	ExamsName       string    `json:"exams_name" gorm:"column:exams_name"`
	Description     string    `json:"description" gorm:"column:description"`
	SubjectID       uint      `json:"subject_id" gorm:"column:subject_id"`
	Location        string    `json:"location" gorm:"column:location"`
	ClassID         uint      `json:"class_id" gorm:"column:class_id"`
	StartTime       time.Time `json:"start_time" gorm:"column:start_time"`
	EndTime         time.Time `json:"end_time" gorm:"column:end_time"`
	DurationMinutes int       `json:"duration_minutes" gorm:"column:duration_minutes"`
	TotalQuestion   int       `json:"total_question" gorm:"column:total_question"`
	CreateBy        uint      `json:"create_by" gorm:"column:create_by"`
	CreateAt        time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
}

func (Exams) TableName() string {
	return "exams"
}
