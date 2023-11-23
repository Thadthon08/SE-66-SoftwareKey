package controller

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	 _"gorm.io/gorm"
	"github.com/Thadthon08/se-66-stock/entity"
	"net/http"
	"github.com/asaskevich/govalidator"
)

func CreateAdmin(c *gin.Context) {
	var admin entity.Admin
	// var emailCheck entity.Admin

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("email = ?", admin.Email).First(&emailCheck); !(tx.RowsAffected == 0) {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "This email is used"})
	// 	return
	// }

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Password), 12)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	newAdmin := entity.Admin{
		Name:            admin.Name,
		Email:           admin.Email,
		Profile_Picture: admin.Profile_Picture,
		Password:        admin.Password,
	}

	if _, err := govalidator.ValidateStruct(newAdmin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newAdmin.Password = string(hashPassword)
	if err := entity.DB().Create(&newAdmin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})

}
