package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterRoles(r *gin.RouterGroup) {
	r.POST("/createRoles", service.UpdateRoles)
	r.POST("/updateRoles", service.UpdateOneRoles)
	r.POST("/updateDescription", service.UpdateDescription)
	r.GET("/showRoles", service.ShowRoles)
	r.GET("/showRolesByID", service.ShowRolesByID)
	r.GET("/showRolesByName", service.ShowRolesByName)
	r.DELETE("/deleteRoles", service.DeleteRoles)
	r.GET("/checkRoles", service.CheckRoles)
}
