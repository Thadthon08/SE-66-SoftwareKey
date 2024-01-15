package cart

import (
	"net/http"

	"github.com/Thadthon08/se-66-stock/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CraeteCart(c *gin.Context) {
	var cart entity.Cart
	var product entity.Product
	// var voucher entity.Voucher

	if err := c.ShouldBindJSON(&cart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", cart.ProductID).First(&product); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "product not found"})
		return
	}
	// if tx := entity.DB().Where("id = ?", cart.VoucherID).First(&voucher); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Voucher not found"})
	// 	return
	// }

	u := entity.Cart{
		UserID: cart.UserID,
		// VoucherID: cart.VoucherID,
		ProductID: cart.ProductID,
		Total:     cart.Total,
	}

	if err := entity.DB().Create(&u).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": cart})
}

func GetCart(c *gin.Context) {
	var cart []entity.Cart
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&cart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cart})
}
func GetCartByID(c *gin.Context) {
	// 1. รับ userId จาก context ของ Gin
	userId := c.Param("id")

	// 2. ค้นหาตะกร้าของผู้ใช้โดยใช้ userId ในฐานข้อมูล
	var cart []entity.Cart
	if tx := entity.DB().Where("user_id = ?", userId).Find(&cart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found for the user"})
		return
	}

	// 3. นับจำนวนรายการในตะกร้า
	itemCount := len(cart)

	c.JSON(http.StatusOK, gin.H{"data": cart, "item_count": itemCount})
}

func ListCart(c *gin.Context) {
	var cart []entity.Cart
	if err := entity.DB().Raw("SELECT * FROM Cart").Find(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cart})
}

func GetUserCart(c *gin.Context) {
	var product entity.Product
	var cart []entity.Cart
	uid := c.Param("uid")
	if err := entity.DB().Preload("User").Preload("Product", func(db *gorm.DB) *gorm.DB {
		return db.Select("id", "deleted_at", "Name", "Price", "Desciption", "Image").Where("deleted_at IS NULL").Find(&product)
	}).Raw("SELECT * FROM carts WHERE (user_id = ?) ", uid).Find(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cart})
}
