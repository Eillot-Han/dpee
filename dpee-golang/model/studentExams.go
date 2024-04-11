package model

import "time"

type StudentExams struct {
	StudentExamID uint      `json:"student_exam_id" gorm:"column:student_exam_id;primaryKey"`
	StudentID     uint      `json:"student_id" gorm:"column:student_id"`
	ExamID        uint      `json:"exam_id" gorm:"column:exam_id"`
	StartTime     time.Time `json:"start_time" gorm:"column:start_time"`
	SubmittedAt   time.Time `json:"submitted_at" gorm:"column:submitted_at"`
	Score         int       `json:"score" gorm:"column:score"`
	Status        string    `json:"status" gorm:"column:status"`
}

func (StudentExams) TableName() string {
	return "student_exams"
}
