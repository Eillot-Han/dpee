package initialize

import (
	"fmt"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

func Gorm() *gorm.DB {
	username := "postgres"
	password := "Wyy20020508"
	host := "120.55.180.142"
	port := "5432" // PostgreSQL 默认端口
	dbname := "dpee_system"

	// 构造连接字符串
	dsn := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s",
		username, password, host, port, dbname)

	// 创建数据库连接
	if db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{}); err != nil {
		log.Printf("Failed to connect to PostgreSQL: %v", err)
		os.Exit(1)
		return nil
	} else {
		sqlDB, _ := db.DB()
		sqlDB.SetMaxIdleConns(10)
		sqlDB.SetMaxOpenConns(100)
		fmt.Println("Successfully connected to the PostgreSQL database on the cloud server!")
		return db
	}
}
