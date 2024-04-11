package response

import "time"

type StudentExamsResponse struct {
	StudentExamID uint      `json:"student_exam_id"` // 学生考试ID
	StudentID     uint      `json:"student_id"`      // 学生ID
	ExamID        uint      `json:"exam_id"`         // 考试ID
	StartTime     time.Time `json:"start_time"`      // 开始时间
	SubmittedAt   time.Time `json:"submitted_at"`    // 提交时间
	Score         int       `json:"score"`           // 分数
	Status        string    `json:"status"`          // 状态
}

//CREATE TABLE StudentExams (
//	StudentExamID INT PRIMARY KEY AUTO_INCREMENT,
//	StudentID INT NOT NULL,
//	ExamID INT NOT NULL,
//	StartTime DATETIME NOT NULL,
//	SubmittedAt DATETIME,
//	Score INT,
//	Status ENUM('InProgress', 'Submitted', 'Evaluated') NOT NULL DEFAULT 'InProgress',
//	FOREIGN KEY (StudentID) REFERENCES Users(UserID),
//	FOREIGN KEY (ExamID) REFERENCES Exams(ExamID)
//);
