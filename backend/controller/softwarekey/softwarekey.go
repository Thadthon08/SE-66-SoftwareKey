package controller

import (
	"net/http"

	"github.com/Thadthon08/se-66-stock/entity"
	"github.com/gin-gonic/gin"
)

//POST /Softwarekey

func CreateSoftwarekey(c *gin.Context) {
	var Softwarekey entity.Softwarekey
	var Product entity.Product

	// bind เข้าตัวแปร Softwarekey
	if err := c.ShouldBindJSON(&Softwarekey); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorb": err.Error()})
		return
	}
	//ค้าหา Product ด้วย id
	if tx := entity.DB().Where("id = ?", Softwarekey.ProductID).First(&Product); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Product not found"})
		return
	}

	//สร้าง Softwarekey
	u := entity.Softwarekey{
		Product: Product, //โยงความสัมพันะ์กับ Entity Product
		Key:     Softwarekey.Key,
		Status_Key:  true,
	}

	//บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorC": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

// GET /Softwarekey/:id

func GetSoftwarekey(c *gin.Context) {
	var Softwarekeys entity.Softwarekey
	id := c.Param("id")
	if err := entity.DB().Preload("Product").Raw("SELECT * FROM Softwarekeys WHERE id = ?", id).Find(&Softwarekeys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Softwarekeys})
}

// GET /Softwarekey
func ListSoftwarekeys(c *gin.Context) {
	var Softwarekeys []entity.Softwarekey
	if err := entity.DB().Preload("Product").Raw("SELECT * FROM Softwarekeys").Find(&Softwarekeys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Softwarekeys})
}

// DELETE /Softwarekey/:id
func DeleteSoftwarekey(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Softwarekeys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Softwarekey not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PACTH /Softwarekeys
func UpdateSoftwarekey(c *gin.Context) {
	var Softwarekey entity.Softwarekey
	var result entity.Softwarekey
	if err := c.ShouldBindJSON(&Softwarekey); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//ค้นหา Softwarekey ด้วย id
	if tx := entity.DB().Where("id = ?", Softwarekey.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Softwarekey not found"})
		return
	}
	if err := entity.DB().Save(&Softwarekey).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": &Softwarekey})
}

// GET /Product/:id

func GetProduct(c *gin.Context) {
	var Product entity.Product
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM categories WHERE id = ?", id).Find(&Product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Product})
}
