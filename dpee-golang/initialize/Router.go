package initialize

import (
	"dpee-golang/router"
	"github.com/gin-gonic/gin"
)

func Routers() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

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
	return r
}
