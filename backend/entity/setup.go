package entity

import (
	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("se-66.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(&Product{}, &Softwarekey{}, &User{}, &Admin{}, &Category{}, &Manufacturer{},&Publicrelations{}, &Cart{})

	db = database

	// var category = []Category{
	// 	{Name: "Image, Video & Audio"},
	// 	{Name: "Antivirus & Security"},
	// 	{Name: "Office & Business"},
	// 	{Name: "Operating System"},
	// 	{Name: "Utility, Tool & Driver"},
	// 	{Name: "Web & Desktop Publishing"},
	// }

	// for _, Category := range category {
	// 	db.Create(&Category)

	// }
	// var manufacturer = []Manufacturer{
	// 	{Name: "Microsoft"},
	// 	{Name: "AVG Technologies"},
	// 	{Name: "McAfee"},
	// 	{Name: "Adobe Systems Incorporated"},
	// 	{Name: "Utility, Tool & Driver"},
	// 	{Name: "Web & Desktop Publishing"},
	// }

	// for _, Manufacturer := range manufacturer {
	// 	db.Create(&Manufacturer)

	// }

}
