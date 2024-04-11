package response

import "time"

type ClassesResponse struct {
	ClassID      uint      `json:"class_id"`      // 班级ID
	ClassName    string    `json:"class_name"`    // 班级名称
	TeacherID    uint      `json:"teacher_id"`    // 班主任ID
	CourseID     uint      `json:"course_id"`     // 课程ID
	StudentCount int       `json:"student_count"` // 学生数量
	Description  string    `json:"description"`   // 描述
	CreateAt     time.Time `json:"create_at"`     // 创建时间
}

//CREATE TABLE Classes (
//	ClassID   INT PRIMARY KEY AUTO_INCREMENT,
//	ClassName VARCHAR(50) NOT NULL UNIQUE,
//	TeacherID INT,
//	CourseID  INT,
//	StudentCount INT DEFAULT 0, -- 新增字段：学生数量，默认为0
//	Description TEXT,
//	CreatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	FOREIGN KEY (TeacherID) REFERENCES Users(UserID),
//	FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
//);
