package response

import "time"

type UserClassesResponse struct {
	UserID     uint      `json:"user_id"`     // 用户ID
	ClassID    uint      `json:"class_id"`    // 班级ID
	EnrolledAt time.Time `json:"enrolled_at"` // 加入时间
}
