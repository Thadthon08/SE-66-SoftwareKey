package entity

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name           string `gorm:"uniqueIndex" valid:"maxstringlength(30)~Name must not more than 30 character,required~Please Enter your Product Name"`
	Image          string `gorm:"type:longtext"`
	Price          float64 `valid:"range(0|100000)~Price over range"`
	Desciption     string  `valid:"maxstringlength(400)~Description ความยาวไม่เกิน 400 ตัวอักษร"`
	Softwarekey    []Softwarekey `gorm:"foreignKey:ProductID"`
	CategoryID     *uint
	Category       Category `gorm:"references:id"`
	AdminID        *uint
	Admin          Admin `gorm:"references:id"`
	ManufacturerID *uint
	Manufacturer   Manufacturer `gorm:"references:id"`
}
type Softwarekey struct {
	gorm.Model
	Key        string `gorm:"uniqueIndex" `
	Status_Key bool
	ProductID  *uint
	Product    Product `gorm:"references:id"`
}

type User struct {
	gorm.Model
	Email           string `gorm:"uniqueIndex" `
	Password        string
	Profile_Picture string `gorm:"type:longtext"`
}
type Admin struct {
	gorm.Model
	Email           string `gorm:"uniqueIndex"`
	Password        string
	Name            string    `gorm:"uniqueIndex" `
	Profile_Picture string    `gorm:"type:longtext"`
	Product         []Product `gorm:"foreignKey:AdminID"`
}
type Category struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex" `
	Product []Product `gorm:"foreignKey:CategoryID"`
}

type Manufacturer struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex"`
	Product []Product `gorm:"foreignKey:ManufacturerID"`
}

type Status struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex"`
	Payment []Payment `gorm:"foreignKey:StatusID"`
}

type Payment struct {
	gorm.Model

	CartID *uint
	Cart   Cart `gorm:"references:id"`

	StatusID *uint
	Status   Status `gorm:"references:id"`

	UserID *uint
	User   User `gorm:"references:id"`

	AdminID *uint
	Admin   Admin `gorm:"references:id"`

	Image string `gorm:"type:longtext"`

	Date time.Time
}

type Voucher struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	Cart []Cart `gorm:"foreignKey:VoucherID"`
}

type Cart struct {
	gorm.Model

	UserID *uint
	User   User

	VoucherID *uint
	Voucher   Voucher

	Total float64
}
type Publicrelations struct {
	gorm.Model
	Section int
	Artcles string
	Image   string `gorm:"type:longtext"`
}
