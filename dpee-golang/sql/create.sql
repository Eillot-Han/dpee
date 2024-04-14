CREATE TABLE users
(
    User_ID    SERIAL PRIMARY KEY,
    Username   VARCHAR(50)  NOT NULL UNIQUE,
    Password   VARCHAR(255) NOT NULL,
    Sex        VARCHAR(50)  NOT NULL CHECK (Sex IN ('Male', 'Female', 'Other')),
    Email      VARCHAR(100) NOT NULL UNIQUE,
    Phone      VARCHAR(20)  NOT NULL,
    First_Name VARCHAR(50),
    Last_Name  VARCHAR(50),
    User_Role  VARCHAR(50)  NOT NULL CHECK (User_Role IN ('Student', 'Teacher', 'Admin')),
    User_Class VARCHAR(50),
    Create_At  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE courses
(
    Course_ID          SERIAL PRIMARY KEY,
    Course_Name        VARCHAR(100) NOT NULL,
    Description        TEXT,
    Create_At          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Created_By_User_ID INT          NOT NULL,
    CONSTRAINT fk_courses_user FOREIGN KEY (Created_By_User_ID) REFERENCES Users (User_ID)
);
CREATE TABLE classes
(
    Class_ID      SERIAL PRIMARY KEY,
    Class_Name    VARCHAR(50) NOT NULL UNIQUE,
    Teacher_ID    INT,
    Course_ID     INT,
    Student_Count INT       DEFAULT 0,
    Description   TEXT,
    Create_At     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_classes_teacher FOREIGN KEY (Teacher_ID) REFERENCES Users (User_ID),
    CONSTRAINT fk_classes_course FOREIGN KEY (Course_ID) REFERENCES Courses (Course_ID)
);

CREATE TABLE exams
(
    Exam_ID          SERIAL PRIMARY KEY,
    Title            VARCHAR(100),
    Description      TEXT,
    Subject          VARCHAR(100),
    Location         VARCHAR(200),
    Class_ID         INT,
    Start_Time       TIMESTAMP,
    End_Time         TIMESTAMP,
    Duration_Minutes INT,
    Total_Questions  INT NOT NULL,
    Create_By        INT,
    Create_At        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_exams_user FOREIGN KEY (Create_By) REFERENCES Users (User_ID)
);
CREATE TABLE notifications
(
    Notification_ID SERIAL PRIMARY KEY,
    User_ID         INT          NOT NULL,
    Title           VARCHAR(100) NOT NULL,
    Message         TEXT         NOT NULL,
    Type            VARCHAR(50)  NOT NULL,
    Create_At       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Sent_At         TIMESTAMP,
    Read_At         TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (User_ID) REFERENCES Users (User_ID)
);
CREATE TABLE permissions
(
    Permission_ID   SERIAL PRIMARY KEY,
    Permission_Name VARCHAR(100) NOT NULL,
    Description     TEXT,
    Create_At       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE questions
(
    Question_ID      SERIAL PRIMARY KEY,
    Question_Content TEXT        NOT NULL,
    Type             VARCHAR(50) NOT NULL,
    Answer           TEXT,
    Create_Table     TEXT,
    Delete_Table     TEXT,
    Points           INT         NOT NULL,
    Difficulty       INT         NOT NULL,
    Create_By        INT,
    Create_At        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Update_At        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_questions_created_by FOREIGN KEY (Create_By) REFERENCES Users (User_ID)
);
CREATE TABLE roles
(
    Role_ID     SERIAL PRIMARY KEY,
    Role_Name   VARCHAR(50) NOT NULL UNIQUE,
    Description TEXT,
    Create_At   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE role_permissions
(
    Role_ID       INT NOT NULL,
    Permission_ID INT NOT NULL,
    PRIMARY KEY (Role_ID, Permission_ID),
    CONSTRAINT fk_role_permissions_role FOREIGN KEY (Role_ID) REFERENCES Roles (Role_ID),
    CONSTRAINT fk_role_permissions_permission FOREIGN KEY (Permission_ID) REFERENCES Permissions (Permission_ID)
);
CREATE TABLE student_answers
(
    Student_Answer_ID SERIAL PRIMARY KEY,
    Student_Exam_ID   INT  NOT NULL,
    Question_ID       INT  NOT NULL,
    Answer            TEXT NOT NULL,
    Points_Awarded    INT,
    Create_At         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE student_exams
(
    Student_Exam_ID SERIAL PRIMARY KEY,
    Student_ID      INT         NOT NULL,
    Exam_ID         INT         NOT NULL,
    Start_Time      TIMESTAMP   NOT NULL,
    Submitted_At    TIMESTAMP,
    Score           INT,
    Status          VARCHAR(50) NOT NULL CHECK (Status IN ('InProgress', 'Submitted', 'Evaluated')),
    Create_At       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_exams_student FOREIGN KEY (Student_ID) REFERENCES Users (User_ID),
    CONSTRAINT fk_student_exams_exam FOREIGN KEY (Exam_ID) REFERENCES Exams (Exam_ID)
);

CREATE TABLE user_classes
(
    User_ID     INT       NOT NULL,
    Class_ID    INT       NOT NULL,
    Enrolled_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (User_ID, Class_ID),
    CONSTRAINT fk_user_classes_user FOREIGN KEY (User_ID) REFERENCES Users (User_ID) ON DELETE CASCADE,
    CONSTRAINT fk_user_classes_class FOREIGN KEY (Class_ID) REFERENCES Classes (Class_ID) ON DELETE RESTRICT
);

CREATE TABLE exam_question_list
(
    Question_Number SERIAL PRIMARY KEY, -- 序号，自增长序列
    Question_ID     INT NOT NULL,       -- 题目ID
    Exam_ID         INT NOT NULL,       -- 试卷ID，外键关联到Exams表

    -- 添加外键约束，确保试卷ID对应的有效性
    FOREIGN KEY (Exam_ID) REFERENCES Exams (Exam_ID) ON DELETE CASCADE ON UPDATE CASCADE
);