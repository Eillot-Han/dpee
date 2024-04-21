package initialize

import (
	"dpee-golang/router"
	"github.com/gin-gonic/gin"
)

func Routers() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(Cors())

	user := r.Group("/user")
	{
		router.RegisterUser(user)
	}
	roles := r.Group("/roles")
	{
		router.RegisterRoles(roles)
	}
	courses := r.Group("/courses")
	{
		router.RegisterCourses(courses)
	}
	class := r.Group("/class")
	{
		router.RegisterClass(class)
	}
	questions := r.Group("/questions")
	{
		router.RegisterQuestions(questions)
	}
	exams := r.Group("/exams")
	{
		router.RegisterExams(exams)
	}
	correction := r.Group("/correction")
	{
		router.RegisterCorrection(correction)
	}
	return r
}
