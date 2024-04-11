package model

import "time"

type Classes struct {
	ClassID      uint      `json:"class_id" gorm:"column:class_id;primaryKey"`
	ClassName    string    `json:"class_name" gorm:"column:class_name"`
	TeacherID    uint      `json:"teacher_id" gorm:"column:teacher_id"`
	CourseID     uint      `json:"course_id" gorm:"column:course_id"`
	StudentCount int64     `json:"student_count" gorm:"column:student_count"`
	Description  *string   `json:"description,omitempty" gorm:"column:description"`
	CreateAt     time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"` // 创建时间
}

func (Classes) TableName() string {
	return "classes"
}
