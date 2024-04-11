package response

type CoursesResponse struct {
	CourseID        uint   `json:"course_id"`          // 课程id
	CourseName      string `json:"course_name"`        // 课程名称
	Description     string `json:"description"`        // 课程描述
	CreateAt        string `json:"create_at"`          // 创建时间
	CreatedByUserId uint   `json:"created_by_user_id"` // 创建者id
}

//CREATE TABLE Courses (
//	CourseID INT PRIMARY KEY AUTO_INCREMENT,
//	CourseName VARCHAR(100) NOT NULL,
//	Description TEXT,
//	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	CreatedByUserID INT NOT NULL,
//	FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
//);
