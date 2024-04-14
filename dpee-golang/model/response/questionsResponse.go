package response

type QuestionsResponse struct {
	QuestionID      uint   `json:"question_id"`      // 题目ID
	QuestionContent string `json:"question_content"` // 题目内容
	Type            string `json:"type"`
	Points          int    `json:"points"`     // 分值
	Difficulty      int    `json:"difficulty"` // 难度
	CreateBy        uint   `json:"create_by"`  // 创建者
}

//CREATE TABLE Questions (
//	QuestionID INT PRIMARY KEY AUTO_INCREMENT,
//	ExamID INT NOT NULL,
//	QuestionContent TEXT NOT NULL,
//	AnswerType ENUM('SingleChoice', 'MultipleChoice', 'TrueFalse', 'Essay') NOT NULL,
//	Answer TEXT, -- 增加答案字段，存储客观题答案或主观题参考答案
//	Points INT NOT NULL,
//	CreatedByUserID INT,
//	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 新增：更新时间字段，自动更新
//	FOREIGN KEY (ExamID) REFERENCES Exams(ExamID),
//	FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
//);
