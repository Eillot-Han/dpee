package response

import "time"

type UserResponse struct {
	UserID    uint      `json:"user_id"`    // 用户ID
	Username  string    `json:"username"`   // 用户名
	Password  string    `json:"password"`   // 密码
	Sex       string    `json:"sex"`        // 性别
	Email     string    `json:"email"`      // 邮箱
	Phone     string    `json:"phone"`      // 手机号
	FirstName string    `json:"first_name"` // 姓
	LastName  string    `json:"last_name"`  // 名
	UserRole  string    `json:"user_role"`  // 角色
	UserClass string    `json:"user_class"` // 班级
	CreateAt  time.Time `json:"create_at"`  // 创建时间
}

//CREATE TABLE Users (
//	UserID         INT PRIMARY KEY AUTO_INCREMENT,
//	Username       VARCHAR(50) NOT NULL UNIQUE,
//	PasswordHash   VARCHAR(255) NOT NULL, -- 假设使用哈希存储密码
//	Sex            ENUM('Male', 'Female', 'Other') NOT NULL,  -- 修改为枚举类型
//	Email          VARCHAR(100) NOT NULL UNIQUE,
//	Phone          VARCHAR(20) NOT NULL, -- 假设电话号码为20位以内
//	FirstName      VARCHAR(50),
//	LastName       VARCHAR(50),
//	UserRole       ENUM('Student', 'Teacher', 'Admin') NOT NULL,
//	UserClass      VARCHAR(50), -- 班级名称或ID，具体类型取决于您的业务需求
//	CreatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	FOREIGN KEY (UserRole) REFERENCES Roles(RoleID), -- 假设存在一个Roles表，UserRole引用其RoleID
//	FOREIGN KEY (UserClass) REFERENCES Classes(ClassID) -- 假设存在一个Classes表，UserClass引用其ClassID
//);
