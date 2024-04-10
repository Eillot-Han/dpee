package response

type StudentAnswersResponse struct {
	StudentAnswerID uint   `json:"student_answer_id"` // 学生答案ID
	StudentExamID   uint   `json:"student_exam_id"`   // 学生考试ID
	QuestionID      uint   `json:"question_id"`       // 问题ID
	Answer          string `json:"answer"`            // 答案
	PointsAwarded   string `json:"points_awarded"`    // 得分
	CreateAt        string `json:"create_at"`         // 创建时间
}

//CREATE TABLE StudentAnswers (
//	StudentAnswerID INT PRIMARY KEY AUTO_INCREMENT,
//	StudentExamID INT NOT NULL,
//	QuestionID INT NOT NULL,
//	Answer TEXT NOT NULL,
//	PointsAwarded INT,
//	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	FOREIGN KEY (StudentExamID) REFERENCES StudentExams(StudentExamID),
//	FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
//);
