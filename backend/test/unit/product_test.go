package unit

import (
	"fmt"
	"testing"

	"github.com/Thadthon08/se-66-stock/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestProductValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`the data is correct`, func(t *testing.T) {
		Product := entity.Product{
			Name:       "Microsoft Excel5",
			Image:      "data:image/jpeg;base64,/9jdasddsawegdasd/asdger",
			Price:      500.00,
			Desciption: "Test-Description",
		}

		ok, err := govalidator.ValidateStruct(Product)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

	t.Run("Name must not more than 30 character", func(t *testing.T) {
		Product := entity.Product{
			Name:       "1234567890123456789012345678901",
			Image:      "data:image/jpeg;base64,/9jdasddsawegdasd/asdger",
			Price:      500.00,
			Desciption: "Test-Description",
		}

		ok, err := govalidator.ValidateStruct(Product)

		g.Expect(ok).NotTo(BeTrue()) // ข้อมูลผิด ok จะเป็น false

		g.Expect(err).NotTo(BeNil()) // ข้อมูลผิด error จะไม่เป็น nil

		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Name must not more than 30 character")))

	})

	t.Run("Product_price must in range (0,100000)", func(t *testing.T) {
		Product := entity.Product{
			Name:       "Microsoft Excel",
			Image:      "data:image/jpeg;base64,/9jdasddsawegdasd/asdger",
			Price:      100001,
			Desciption: "Test-Description",
		}

		ok, err := govalidator.ValidateStruct(Product)

		g.Expect(ok).NotTo(BeTrue()) // ข้อมูลผิด ok จะเป็น false

		g.Expect(err).NotTo(BeNil()) // ข้อมูลผิด error จะไม่เป็น nil

		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Price over range"))) // check error message
	})

	t.Run("Description must not more than 400 character", func(t *testing.T) {
		Product := entity.Product{
			Name:       "Microsoft Excel",
			Image:      "data:image/jpeg;base64,/9jdasddsawegdasd/asdger",
			Price:      500.00,
			Desciption: "Test-Description 1234567890 1234567890  1234567890  1234567890 1234567890 1234567890  1234567890  1234567890 1234567890 1234567890  1234567890 1234567890 1234567890  1234567890  12345678901234567890 1234567890  1234567890  12345678901234567890 1234567890  1234567890  12345678901234567890 1234567890  1234567890  12345678901234567890 1234567890  1234567890  12345678901234567890 1234567890  1234567890  1234567890 1234567890 1234567890 1234567890  1234567890  1234567890 1234567890 1234567890  1234567890  1234567890",
		}

		ok, err := govalidator.ValidateStruct(Product)

		g.Expect(ok).NotTo(BeTrue()) // ข้อมูลผิด ok จะเป็น false

		g.Expect(err).NotTo(BeNil()) // ข้อมูลผิด error จะไม่เป็น nil

		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Description ความยาวไม่เกิน 400 ตัวอักษร"))) // check error message
	})

}
