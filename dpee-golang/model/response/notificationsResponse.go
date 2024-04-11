package response

type NotificationsResponse struct {
	NotificationID uint   `json:"notification_id"` //消息ID
	UserID         uint   `json:"user_id"`         //用户ID
	Title          string `json:"title"`           //消息标题
	Message        string `json:"message"`         //消息内容
	Type           string `json:"type"`            //消息类型
	CreateAt       string `json:"create_at"`       //消息创建时间
	SentAt         string `json:"sent_at"`         //消息发送时间
	ReadAt         string `json:"read_at"`         //消息阅读时间
}

//CREATE TABLE Notifications (
//	NotificationID INT PRIMARY KEY AUTO_INCREMENT,
//	UserID INT NOT NULL,
//	Title VARCHAR(100) NOT NULL,
//	Message TEXT NOT NULL,
//	Type VARCHAR(50) NOT NULL,
//	CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//	SentAt TIMESTAMP,
//	ReadAt TIMESTAMP,
//	FOREIGN KEY (UserID) REFERENCES Users(UserID)
//);
