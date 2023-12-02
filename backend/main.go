package main

import (
	"github.com/gin-gonic/gin"

	admin_controller "github.com/Thadthon08/se-66-stock/controller/admin"
	category_controller "github.com/Thadthon08/se-66-stock/controller/category"
	login_controller "github.com/Thadthon08/se-66-stock/controller/login"
	Product_controller "github.com/Thadthon08/se-66-stock/controller/product"
	Softwarekey_controller "github.com/Thadthon08/se-66-stock/controller/softwarekey"
	user_controller "github.com/Thadthon08/se-66-stock/controller/user"
	"github.com/Thadthon08/se-66-stock/middlewares"

	"github.com/Thadthon08/se-66-stock/entity"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// login User Route
	r.POST("/login/user", login_controller.LoginUser)
	r.POST("/users", user_controller.CreateUser)

	// login Admin Route
	r.POST("/login/admin", login_controller.LoginAdmin)
	r.POST("/admin", admin_controller.CreateAdmin)

	r.GET("/search", Product_controller.SearchProducts)
	router := r.Group("/")
	{
		protected := router.Use(middlewares.Authorizes())
		{

			// Admin Routes
			//Products
			protected.GET("/Products", Product_controller.ListProducts)
			protected.GET("/productkey", Product_controller.ListProductsWithKeyCount)
			protected.GET("/Products/:id", Product_controller.GetProduct)
			protected.POST("/Products", Product_controller.CreateProduct)
			protected.PATCH("/Products", Product_controller.UpdateProduct)
			protected.DELETE("/Products/:id", Product_controller.DeleteProduct)
			//Softwarekey
			protected.GET("/key", Softwarekey_controller.ListSoftwarekeys)
			protected.GET("/key/:id", Softwarekey_controller.GetSoftwarekey)
			protected.POST("/key", Softwarekey_controller.CreateSoftwarekey)
			protected.PATCH("/key", Softwarekey_controller.UpdateSoftwarekey)
			protected.DELETE("/key/:id", Softwarekey_controller.DeleteSoftwarekey)

			//Category
			protected.POST("/category", category_controller.CreateCategory)
			protected.GET("/category", category_controller.ListCategory)
			protected.GET("/category/:id", category_controller.GetCategory)
			//Manufacturer
			protected.POST("/manufacturer", Product_controller.CreateManufacturer)
			protected.GET("/manufacturer", Product_controller.ListManufacturer)
			protected.GET("/manufacturer/:id", Product_controller.GetManufacturer)

		}
	}
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH,DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
