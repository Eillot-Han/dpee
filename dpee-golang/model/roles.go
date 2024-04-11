package model

import "time"

type Roles struct {
	RoleID      uint      `json:"role_id" gorm:"column:role_id;primaryKey"`
	RoleName    string    `json:"role_name" gorm:"column:role_name"`
	Description string    `json:"description" gorm:"column:description"`
	CreateAt    time.Time `json:"create_at" gorm:"column:create_at;default:CURRENT_TIMESTAMP"`
}

func (Roles) TableName() string {
	return "roles"
}
