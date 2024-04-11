package response

type RolePermissionsResponse struct {
	RoleID       uint `json:"role_id"`       // 角色ID
	PermissionID uint `json:"permission_id"` // 权限ID
}

//CREATE TABLE RolePermissions (
//	RoleID       INT NOT NULL,
//	PermissionID INT NOT NULL,
//	PRIMARY KEY (RoleID, PermissionID),
//	FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
//	FOREIGN KEY (PermissionID) REFERENCES Permissions(PermissionID)
//);
