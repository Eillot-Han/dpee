package model

import "time"

type Courses struct {
	CourseID        uint      `json:"course_id" gorm:"column:course_id;primaryKey"`
	CourseName      string    `json:"course_name" gorm:"column:course_name"`
	Description     string    `json:"description" gorm:"column:description"`
	CreateAt        time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
	CreatedByUserID uint      `json:"created_by_user_id" gorm:"column:created_by_user_id"`
}

func (Courses) TableName() string {
	return "courses"
}
