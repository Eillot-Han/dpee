interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T;
    date_time: string;
    time_stamp: number;
  }
  
  export interface UserData {
    user_id: number;
    username: string;
    sex: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    user_role: string;
    user_class?: string; // "?"表示可选字段
    create_at: string;
  }
  
  export interface ExamData{
    exams_id: number;
    exams_name: string;
    description: string;
    subject_id: number;
    location: string;
    class_id: number;
    start_time: string;
    end_time: string;
    duration_minutes: number;
    total_question: number;
    create_by: number;
    create_at: string;
  }

  export interface ScoreData{
    student_exam_id: number;
    student_id: number;
    exam_id: number;
    start_time: string;
    submitted_at: string;
    score: number;
    status: string;
  }

  // 接口返回数据模型
//   type LoginResponse = ApiResponse<UserData>;
  export type LoginResponse = ApiResponse<UserData>;
  export type UserResponse = ApiResponse<UserData>;
  export type ExamResponse = ApiResponse<ExamData[]>;
  export type ScoreResponse = ApiResponse<ScoreData>;