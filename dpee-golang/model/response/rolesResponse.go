package response

type RolesResponse struct {
	RoleID      uint   `json:"role_id"`     // 角色ID
	RoleName    string `json:"role_name"`   // 角色名称
	Description string `json:"description"` // 角色描述
	CreateAt    string `json:"create_at"`   // 创建时间
}

//CREATE TABLE Roles (
//	RoleID   INT PRIMARY KEY AUTO_INCREMENT,
//	RoleName VARCHAR(50) NOT NULL UNIQUE,
//	Description TEXT,
//	CreatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//);
