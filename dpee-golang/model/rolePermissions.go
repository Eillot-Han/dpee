package model

type RolePermissions struct {
	RoleID       uint `json:"-" gorm:"column:role_id;primaryKey"`
	PermissionID uint `json:"-" gorm:"column:permission_id;primaryKey"`
}

func (RolePermissions) TableName() string {
	return "role_permissions"
}
