CREATE TABLE classes (
                         ClassID SERIAL PRIMARY KEY,
                         ClassName VARCHAR(50) NOT NULL UNIQUE,
                         TeacherID INT,
                         CourseID INT,
                         StudentCount INT DEFAULT 0,
                         Description TEXT,
                         CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT fk_classes_teacher FOREIGN KEY (TeacherID) REFERENCES Users(UserID),
                         CONSTRAINT fk_classes_course FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
CREATE TABLE courses (
                         CourseID SERIAL PRIMARY KEY,
                         CourseName VARCHAR(100) NOT NULL,
                         Description TEXT,
                         CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         CreatedByUserID INT NOT NULL,
                         CONSTRAINT fk_courses_user FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
);
CREATE TABLE exams (
                       ExamID SERIAL PRIMARY KEY,
                       Title VARCHAR(100) NOT NULL,
                       Description TEXT,
                       Subject VARCHAR(100) NOT NULL,
                       Location VARCHAR(200) NOT NULL,
                       StartTime TIMESTAMP NOT NULL,
                       EndTime TIMESTAMP NOT NULL,
                       DurationMinutes INT NOT NULL,
                       TotalQuestions INT NOT NULL,
                       CreatedByUserID INT,
                       CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT fk_exams_user FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
);
CREATE TABLE notifications (
                               NotificationID SERIAL PRIMARY KEY,
                               UserID INT NOT NULL,
                               Title VARCHAR(100) NOT NULL,
                               Message TEXT NOT NULL,
                               Type VARCHAR(50) NOT NULL,
                               CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               SentAt TIMESTAMP,
                               ReadAt TIMESTAMP,
                               CONSTRAINT fk_notifications_user FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE permissions (
                             PermissionID SERIAL PRIMARY KEY,
                             PermissionName VARCHAR(100) NOT NULL,
                             Description TEXT,
                             CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE questions (
                           QuestionID SERIAL PRIMARY KEY,
                           ExamID INT NOT NULL,
                           QuestionContent TEXT NOT NULL,
                           AnswerType VARCHAR(50) NOT NULL CHECK (AnswerType IN ('SingleChoice', 'MultipleChoice', 'TrueFalse', 'Essay')),
                           Answer TEXT,
                           Points INT NOT NULL,
                           CreatedByUserID INT,
                           CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           CONSTRAINT fk_questions_exam FOREIGN KEY (ExamID) REFERENCES Exams(ExamID),
                           CONSTRAINT fk_questions_created_by FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
);
CREATE TABLE role_permissions (
                                 RoleID INT NOT NULL,
                                 PermissionID INT NOT NULL,
                                 PRIMARY KEY (RoleID, PermissionID),
                                 CONSTRAINT fk_role_permissions_role FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
                                 CONSTRAINT fk_role_permissions_permission FOREIGN KEY (PermissionID) REFERENCES Permissions(PermissionID)
);
CREATE TABLE roles (
                       RoleID SERIAL PRIMARY KEY,
                       RoleName VARCHAR(50) NOT NULL UNIQUE,
                       Description TEXT,
                       CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE student_answers (
                                StudentAnswerID SERIAL PRIMARY KEY,
                                StudentExamID INT NOT NULL,
                                QuestionID INT NOT NULL,
                                Answer TEXT NOT NULL,
                                PointsAwarded INT,
                                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE student_exams (
                              StudentExamID SERIAL PRIMARY KEY,
                              StudentID INT NOT NULL,
                              ExamID INT NOT NULL,
                              StartTime TIMESTAMP NOT NULL,
                              SubmittedAt TIMESTAMP,
                              Score INT,
                              Status VARCHAR(50) NOT NULL CHECK (Status IN ('InProgress', 'Submitted', 'Evaluated')),
                              CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              CONSTRAINT fk_student_exams_student FOREIGN KEY (StudentID) REFERENCES Users(UserID),
                              CONSTRAINT fk_student_exams_exam FOREIGN KEY (ExamID) REFERENCES Exams(ExamID)
);
CREATE TABLE users (
                       UserID SERIAL PRIMARY KEY,
                       Username VARCHAR(50) NOT NULL UNIQUE,
                       PasswordHash VARCHAR(255) NOT NULL,
                       Sex VARCHAR(50) NOT NULL CHECK (Sex IN ('Male', 'Female', 'Other')),
                       Email VARCHAR(100) NOT NULL UNIQUE,
                       Phone VARCHAR(20) NOT NULL,
                       FirstName VARCHAR(50),
                       LastName VARCHAR(50),
                       UserRole VARCHAR(50) NOT NULL CHECK (UserRole IN ('Student', 'Teacher', 'Admin')),
                       UserClass VARCHAR(50),
                       CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE user_classes (
                             UserID INT NOT NULL,
                             ClassID INT NOT NULL,
                             EnrolledAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             PRIMARY KEY (UserID, ClassID),
                             CONSTRAINT fk_user_classes_user FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
                             CONSTRAINT fk_user_classes_class FOREIGN KEY (ClassID) REFERENCES Classes(ClassID) ON DELETE RESTRICT
);