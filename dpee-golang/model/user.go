package model

import "time"

type User struct {
	UserID    uint      `json:"user_id" gorm:"column:user_id;primaryKey"`
	Username  string    `json:"username" gorm:"column:username;uniqueIndex"`
	Password  string    `json:"-" gorm:"column:password"` // 密码通常不在JSON响应中返回，但仍需要在数据库中存储
	Sex       string    `json:"sex" gorm:"column:sex"`
	Email     string    `json:"email" gorm:"column:email;uniqueIndex"`
	Phone     string    `json:"phone" gorm:"column:phone"`
	FirstName string    `json:"first_name" gorm:"column:first_name"`
	LastName  string    `json:"last_name" gorm:"column:last_name"`
	UserRole  string    `json:"user_role" gorm:"column:user_role"`   // 在实际应用中，可能会关联到 Role 表，此处视具体情况而定
	UserClass string    `json:"user_class" gorm:"column:user_class"` // 在实际应用中，可能会关联到 Class 表，此处视具体情况而定
	CreateAt  time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
}

func (User) TableName() string {
	return "users"
}
