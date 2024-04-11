package model

type Permissions struct {
	PermissionID   uint   `json:"permission_id" gorm:"column:permission_id;primaryKey"`
	PermissionName string `json:"permission_name" gorm:"column:permission_name"`
	Description    string `json:"description" gorm:"column:description"`
}

func (Permissions) TableName() string {
	return "permissions"
}
