package main

import (
	"dpee-golang/global"
	"dpee-golang/initialize"
)

func main() {
	global.DB = initialize.Gorm()
	db, _ := global.DB.DB()
	defer db.Close()
}
