package controller

import (
	"net/http"

	"github.com/Thadthon08/se-66-stock/entity"
	"github.com/gin-gonic/gin"
)

func GetManufacturer(c *gin.Context) {
	var Manufacturers entity.Manufacturer
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM manufacturers WHERE id = ?", id).Find(&Manufacturers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Manufacturers})
}

func ListManufacturer(c *gin.Context) {
	var Manufacturers []entity.Manufacturer
	if err := entity.DB().Raw("SELECT * FROM manufacturers").Find(&Manufacturers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Manufacturers})
}

func CreateManufacturer(c *gin.Context) {
	var Manufacturers entity.Manufacturer

	if err := c.ShouldBindJSON(&Manufacturers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorb": err.Error()})
		return
	}

	u := entity.Manufacturer{
		Name: Manufacturers.Name,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorC": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}
