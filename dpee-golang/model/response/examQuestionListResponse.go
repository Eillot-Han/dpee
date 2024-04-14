package response

type QuestionListResponse struct {
	QuestionNumber int  `json:"question_number"`
	QuestionID     uint `json:"question_id"`
	ExamID         uint `json:"exam_id"`
}
