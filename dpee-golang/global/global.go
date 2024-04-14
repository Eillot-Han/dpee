package global

import (
	"github.com/go-redis/redis"
	"gorm.io/gorm"
	"math/rand"
)

var (
	TestDB *gorm.DB
	DB     *gorm.DB
	REDIS  *redis.Client
	Rand   *rand.Rand
)
