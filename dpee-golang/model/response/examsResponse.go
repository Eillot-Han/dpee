package response

import "time"

type ExamsResponse struct {
	ExamsID         uint      `json:"exams_id"`         // 考试ID
	ExamsName       string    `json:"exams_name"`       // 考试名称
	Description     string    `json:"description"`      // 考试描述
	SubjectID       uint      `json:"subject_id"`       // 考试科目ID
	Location        string    `json:"location"`         // 考试地点
	StartTime       time.Time `json:"start_time"`       // 考试开始时间
	EndTime         time.Time `json:"end_time"`         // 考试结束时间
	DurationMinutes int       `json:"duration_minutes"` // 考试时长
	TotalQuestion   int       `json:"total_question"`   // 题目总数
	CreateBy        uint      `json:"create_by"`        // 创建者
	CreateAt        time.Time `json:"create_at"`        // 创建时间
}

//CREATE TABLE Exams (
//	ExamID INT PRIMARY KEY AUTO_INCREMENT,
//	Title VARCHAR(100) NOT NULL,
//	Description TEXT,
//	Subject VARCHAR(100) NOT NULL,            -- 新增：考试科目
//	Location VARCHAR(200) NOT NULL,           -- 新增：考试地址
//	StartTime DATETIME NOT NULL,
//	EndTime DATETIME NOT NULL,
//	DurationMinutes INT NOT NULL,
//	TotalQuestions INT NOT NULL,
//	CreatedByUserID INT,
//	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
//);
