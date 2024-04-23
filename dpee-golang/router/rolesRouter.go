package router

import (
	"dpee-golang/service"
	"github.com/gin-gonic/gin"
)

func RegisterRoles(r *gin.RouterGroup) {
	r.POST("/createRoles", service.UpdateRoles)             //创建角色
	r.POST("/updateRoles", service.UpdateOneRoles)          //更新角色
	r.POST("/updateDescription", service.UpdateDescription) //更新角色描述
	r.GET("/showRoles", service.ShowRoles)                  //显示所有角色
	r.GET("/showRolesByID", service.ShowRolesByID)          //根据ID显示角色
	r.GET("/showRolesByName", service.ShowRolesByName)      //根据姓名显示角色
	r.DELETE("/deleteRoles", service.DeleteRoles)           //删除角色
	r.GET("/checkRoles", service.CheckRoles)                //检查角色
}
