package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"strconv"
)

// CreateCourse 创建课程
func CreateCourse(c *gin.Context) {
	courseId := c.PostForm("course_id")
	coursesName := c.PostForm("courses_name")
	description := c.PostForm("description")
	userId := c.PostForm("user_id")
	courseIdInt, _ := strconv.Atoi(courseId)
	user, _ := strconv.Atoi(userId)
	db := global.DB
	courses := model.Courses{
		CourseID:        uint(courseIdInt),
		CourseName:      coursesName,
		Description:     description,
		CreatedByUserID: uint(user),
	}
	db.Create(&courses)
	response.OkWithMessage("课程创建成功", c)
}

// ShowCourses 显示课程
func ShowCourses(c *gin.Context) {
	db := global.DB
	var courses []model.Courses
	db.Find(&courses)
	response.OkWithData(courses, c)
}

// UpdateCourseName 更新课程名称
func UpdateCourseName(c *gin.Context) {
	courseId := c.PostForm("course_id")
	coursesName := c.PostForm("courses_name")
	courseIdInt, _ := strconv.Atoi(courseId)
	db := global.DB
	var courses model.Courses
	db.Where("course_id = ?", courseIdInt).First(&courses)
	courses.CourseName = coursesName
	db.Save(&courses)
	response.OkWithMessage("课程名称更新成功", c)
}

//UpdateCourseDescription 更新课程描述
func UpdateCourseDescription(c *gin.Context) {
	courseId := c.PostForm("course_id")
	description := c.PostForm("description")
	courseIdInt, _ := strconv.Atoi(courseId)
	db := global.DB
	var courses model.Courses
	db.Where("course_id = ?", courseIdInt).First(&courses)
	courses.Description = description
	db.Save(&courses)
	response.OkWithMessage("课程描述更新成功", c)
}

// UpdateCourseTeacher 转移课程老师
func UpdateCourseTeacher(c *gin.Context) {
	courseId := c.PostForm("course_id")
	userId := c.PostForm("user_id")
	courseIdInt, _ := strconv.Atoi(courseId)
	user, _ := strconv.Atoi(userId)
	db := global.DB
	var courses model.Courses
	db.Where("course_id = ?", courseIdInt).First(&courses)
	courses.CreatedByUserID = uint(user)
	db.Save(&courses)
	response.OkWithMessage("课程老师转移成功", c)
}

// ShowCoursesByName 根据课程名称查询课程
func ShowCoursesByName(c *gin.Context) {
	coursesName := c.PostForm("courses_name")
	db := global.DB
	var courses []model.Courses
	db.Where("course_name = ?", coursesName).Find(&courses)
	response.OkWithData(courses, c)
}

// ShowCoursesByTeacher 根据老师查询课程
func ShowCoursesByTeacher(c *gin.Context) {
	userId := c.PostForm("user_id")
	user, _ := strconv.Atoi(userId)
	db := global.DB
	var courses []model.Courses
	db.Where("created_by_user_id = ?", user).Find(&courses)
	response.OkWithData(courses, c)
}

// DeleteCourses 删除课程
func DeleteCourses(context *gin.Context) {
	courseId := context.PostForm("course_id")
	courseIdInt, _ := strconv.Atoi(courseId)
	db := global.DB
	var courses model.Courses
	db.Where("course_id = ?", courseIdInt).First(&courses)
	db.Delete(&courses)
	response.OkWithMessage("课程删除成功", context)
}

// ShowCoursesByID 根据课程ID查询课程
func ShowCoursesByID(context *gin.Context) {
	courseId := context.PostForm("course_id")
	courseIdInt, _ := strconv.Atoi(courseId)
	db := global.DB
	var courses model.Courses
	db.Where("course_id = ?", courseIdInt).First(&courses)
	response.OkWithData(courses, context)
}
