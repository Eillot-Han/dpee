package service

import (
	"dpee-golang/global"
	"dpee-golang/model"
	"dpee-golang/model/response"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"strconv"
)

// CreateClasses 创建班级
func CreateClasses(c *gin.Context) {
	classId := c.PostForm("class_id")
	classIdInt, _ := strconv.Atoi(classId)
	className := c.PostForm("class_name")
	teacherId := c.PostForm("teacher_id")
	teacherIdInt, _ := strconv.Atoi(teacherId)
	Course := c.PostForm("course_id")
	CourseId, _ := strconv.Atoi(Course)
	description := c.PostForm("description")
	classes := model.Classes{
		ClassID:      uint(classIdInt),
		ClassName:    className,
		TeacherID:    uint(teacherIdInt),
		CourseID:     uint(CourseId),
		Description:  &description,
		StudentCount: 0,
	}
	db := global.DB
	db.Create(&classes)
	response.OkWithMessage("班级创建成功", c)
}

// ShowClasses 显示班级
func ShowClasses(c *gin.Context) {
	db := global.DB
	var classes []model.Classes
	db.Find(&classes)
	response.OkWithData(classes, c)
}

// ShowClassesByID 根据ID显示班级
func ShowClassesByID(c *gin.Context) {
	classId := c.Param("class_id")
	classIdInt, _ := strconv.Atoi(classId)
	db := global.DB
	var classes model.Classes
	db.Where("class_id = ?", classIdInt).First(&classes)
	response.OkWithData(classes, c)
}

// ShowClassesByName 根据班级名称显示班级
func ShowClassesByName(c *gin.Context) {
	className := c.Param("class_name")
	db := global.DB
	var classes model.Classes
	db.Where("class_name = ?", className).First(&classes)
	response.OkWithData(classes, c)
}

// UpdateClass 更新班级
func UpdateClass(c *gin.Context) {
	classId := c.PostForm("class_id")
	classIdInt, _ := strconv.Atoi(classId)
	className := c.PostForm("class_name")
	teacherId := c.PostForm("teacher_id")
	teacherIdInt, _ := strconv.Atoi(teacherId)
	Course := c.PostForm("course_id")
	CourseId, _ := strconv.Atoi(Course)
	description := c.PostForm("description")
	classes := model.Classes{
		ClassID:     uint(classIdInt),
		ClassName:   className,
		TeacherID:   uint(teacherIdInt),
		CourseID:    uint(CourseId),
		Description: &description,
	}
	db := global.DB
	db.Model(&classes).Where("class_id = ?", classIdInt).Updates(classes)
	response.OkWithMessage("班级更新成功", c)
}

// DeleteClass 删除班级
func DeleteClass(c *gin.Context) {
	classId := c.Param("class_id")
	classIdInt, _ := strconv.Atoi(classId)
	db := global.DB
	db.Where("class_id = ?", classIdInt).Delete(&model.Classes{})
	response.OkWithMessage("班级删除成功", c)
}

// AddStudentToClass 添加学生到班级
func AddStudentToClass(c *gin.Context) {
	classId := c.PostForm("class_id")
	classIdInt, _ := strconv.Atoi(classId)
	studentId := c.PostForm("student_id")
	studentIdInt, _ := strconv.Atoi(studentId)
	//判断学生是否在班级中
	if IsStudentInClass(classIdInt, studentIdInt) {
		response.FailWithMessage("学生已在班级中", c)
		return
	}
	db := global.DB
	db.Model(&model.Classes{}).Where("class_id = ?", classIdInt).Association("Students").Append(&model.UserClasses{
		UserID:  uint(studentIdInt),
		ClassID: uint(classIdInt),
	})
	//数据同时添加到user_classes表中
	db.Create(&model.UserClasses{
		UserID:  uint(studentIdInt),
		ClassID: uint(classIdInt),
	})
	//class表中的学生数量+1
	db.Model(&model.Classes{}).Where("class_id = ?", classIdInt).Update("student_count", gorm.Expr("student_count + ?", 1))
	response.OkWithMessage("学生添加成功", c)
}

// IsStudentInClass 判断学生是否在班级中
func IsStudentInClass(classId int, studentId int) bool {
	db := global.DB
	var classes model.Classes
	db.Where("class_id = ?", classId).First(&classes)
	var students []model.UserClasses
	db.Where("class_id = ?", classId).Find(&students)
	for _, student := range students {
		if student.UserID == uint(studentId) {
			return true
		}
	}
	return false
}
