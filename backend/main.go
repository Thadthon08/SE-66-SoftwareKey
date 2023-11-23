package main

import (
	"github.com/gin-gonic/gin"

	Product_controller "github.com/Thadthon08/se-66-stock/controller/product"
	Sorftwarekey_controller "github.com/Thadthon08/se-66-stock/controller/softwarekey"
	login_controller "github.com/Thadthon08/se-66-stock/controller/login"
	user_controller "github.com/Thadthon08/se-66-stock/controller/user"
	admin_controller "github.com/Thadthon08/se-66-stock/controller/admin"

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

	// Admin Routes
	//Products
	r.GET("/Products", Product_controller.ListProducts)
	r.GET("/Products/:id", Product_controller.GetProduct)
	r.POST("/Products", Product_controller.CreateProduct)
	r.PATCH("/Products", Product_controller.UpdateProduct)
	r.DELETE("/Products/:id", Product_controller.DeleteProduct)
	//Sorftwarekey
	r.GET("/key", Sorftwarekey_controller.ListSorftwarekeys)
	r.GET("/key/:id", Sorftwarekey_controller.GetSorftwarekey)
	r.POST("/key", Sorftwarekey_controller.CreateSorftwarekey)
	r.PATCH("/key", Sorftwarekey_controller.UpdateSorftwarekey)
	r.DELETE("/key/:id", Sorftwarekey_controller.DeleteSorftwarekey)
	// Run the server

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