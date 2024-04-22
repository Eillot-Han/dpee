package main

import (
	"dpee-golang/global"
	"dpee-golang/initialize"
	"fmt"
	"github.com/go-redis/redis"
	"math/rand"
	"os"
	"time"
)

func main() {
	// 初始化数据库
	global.DB = initialize.Gorm()
	db, _ := global.DB.DB()
	defer db.Close()
	global.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))

	// 初始化数据库
	global.TestDB = initialize.TestGorm()
	testdb, _ := global.TestDB.DB()
	defer testdb.Close()

	// 初始化redis
	Client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "12345678",
		DB:       0,
	})
	pong, err := Client.Ping().Result()
	if err != nil {
		fmt.Println("redis connect ping failed")
		fmt.Println(err)
		os.Exit(1)
	} else {
		fmt.Println("redis connect ping")
		fmt.Println(pong)
		global.REDIS = Client
	}

	//项目主程序
	addr := ":8888"
	Router := initialize.Routers()

	Router.Run(addr)
}
