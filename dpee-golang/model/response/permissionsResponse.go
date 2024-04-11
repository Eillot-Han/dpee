package response

type PermissionsResponse struct {
	PermissionID   uint   `json:"permission_id"`   //权限ID
	PermissionName string `json:"permission_name"` //权限名称
	Description    string `json:"description"`     //权限描述
}

//CREATE TABLE Permissions (
//	PermissionID INT PRIMARY KEY AUTO_INCREMENT,
//	PermissionName VARCHAR(100) NOT NULL,
//	Description TEXT,
//	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//);
