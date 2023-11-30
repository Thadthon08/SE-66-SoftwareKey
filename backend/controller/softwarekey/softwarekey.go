package controller

import (
	"net/http"

	"github.com/Thadthon08/se-66-stock/entity"
	"github.com/gin-gonic/gin"
)

//POST /Sorftwarekey

func CreateSorftwarekey(c *gin.Context) {
	var Sorftwarekey entity.Sorftwarekey
	var Product entity.Product

	// bind เข้าตัวแปร Sorftwarekey
	if err := c.ShouldBindJSON(&Sorftwarekey); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorb": err.Error()})
		return
	}
	//ค้าหา Product ด้วย id
	if tx := entity.DB().Where("id = ?", Sorftwarekey.ProductID).First(&Product); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Product not found"})
		return
	}

	//สร้าง Sorftwarekey
	u := entity.Sorftwarekey{
		Product: Product, //โยงความสัมพันะ์กับ Entity Product
		Key:     Sorftwarekey.Key,
		Status:  true,
	}

	//บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorC": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

// GET /Sorftwarekey/:id

func GetSorftwarekey(c *gin.Context) {
	var Sorftwarekeys entity.Sorftwarekey
	id := c.Param("id")
	if err := entity.DB().Preload("Product").Raw("SELECT * FROM Sorftwarekeys WHERE id = ?", id).Find(&Sorftwarekeys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Sorftwarekeys})
}

// GET /Sorftwarekey
func ListSorftwarekeys(c *gin.Context) {
	var Sorftwarekeys []entity.Sorftwarekey
	if err := entity.DB().Preload("Product").Raw("SELECT * FROM Sorftwarekeys").Find(&Sorftwarekeys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Sorftwarekeys})
}

// DELETE /Sorftwarekey/:id
func DeleteSorftwarekey(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Sorftwarekeys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sorftwarekey not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PACTH /Sorftwarekeys
func UpdateSorftwarekey(c *gin.Context) {
	var Sorftwarekey entity.Sorftwarekey
	var result entity.Sorftwarekey
	if err := c.ShouldBindJSON(&Sorftwarekey); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//ค้นหา Sorftwarekey ด้วย id
	if tx := entity.DB().Where("id = ?", Sorftwarekey.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sorftwarekey not found"})
		return
	}
	if err := entity.DB().Save(&Sorftwarekey).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": &Sorftwarekey})
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
