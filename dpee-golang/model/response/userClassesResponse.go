package response

type UserClassesResponse struct {
	UserID     uint   `json:"user_id"`     // 用户ID
	ClassID    uint   `json:"class_id"`    // 班级ID
	EnrolledAt string `json:"enrolled_at"` // 加入时间
}
