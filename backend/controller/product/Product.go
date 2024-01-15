package controller

import (
	"net/http"

	"github.com/Thadthon08/se-66-stock/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {
	var Product entity.Product
	var Admin entity.Admin
	var Category entity.Category
	var Manufacturer entity.Manufacturer

	// bind เข้าตัวแปร Product
	if err := c.ShouldBindJSON(&Product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Product.AdminID).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Product.CategoryID).First(&Category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Product.ManufacturerID).First(&Manufacturer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Manufacturer not found"})
		return
	}

	//สร้าง Product
	u := entity.Product{
		Admin:        Admin,
		Category:     Category,
		Manufacturer: Manufacturer,
		Name:         Product.Name,
		Price:        Product.Price,
		Desciption:   Product.Desciption,
		Image:        Product.Image,
	}

	if _, err := govalidator.ValidateStruct(u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

// GET /Product/:id

func GetProduct(c *gin.Context) {
	var Products entity.Product
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Products WHERE id = ?", id).Find(&Products).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Products})
}

// GET /Product
func ListProducts(c *gin.Context) {
	var Products []entity.Product
	if err := entity.DB().Raw("SELECT * FROM Products").Find(&Products).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Products})
}

func ListProductsWithKeyCount(c *gin.Context) {
	var productsWithKeyCount []struct {
		entity.Product
		KeyCount int
	}

	query := `
       SELECT products.*, COUNT(CASE WHEN softwarekeys.status_key = true THEN 1 ELSE NULL END) AS key_count
		FROM products
		LEFT JOIN softwarekeys ON products.id = softwarekeys.product_id
		GROUP BY products.id;
    `

	if err := entity.DB().Raw(query).Scan(&productsWithKeyCount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": productsWithKeyCount})
}

// DELETE /Product/:id
func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Products WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PACTH /Products
func UpdateProduct(c *gin.Context) {
	var Product entity.Product
	var result entity.Product
	if err := c.ShouldBindJSON(&Product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//ค้นหา Product ด้วย id
	if tx := entity.DB().Where("id = ?", Product.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Product not found"})
		return
	}
	if err := entity.DB().Save(&Product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Product})
}

//Search Product

func SearchProducts(c *gin.Context) {
	var products []entity.Product

	// รับคำค้นหาจาก query parameter
	query := c.Query("query")

	// ใช้ Gorm เพื่อค้นหาข้อมูล
	if query != "" {
		if err := entity.DB().Where("name LIKE ?", "%"+query+"%").Find(&products).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		if err := entity.DB().Find(&products).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": products})
}
