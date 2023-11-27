import React, { useEffect } from "react";
import { Carousel } from "antd";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProduct } from "../../../sevices/http";
const contentStyle: React.CSSProperties = {
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#3a3b3c",
  margin: 0,
};

export default function Carousels() {
  const [products, setProducts] = React.useState<ProductInterface[]>([]);

  const getProducts = async () => {
    let res = await GetProduct();
    if (res) {
      setProducts(res);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    // <Carousel autoplay>
    //   {products.map((product) => (
    //     <div key={product.ID} style={contentStyle}>
    //       <img src={product.Image} alt={product.Name} width="100%" />
    //     </div>
    //   ))}
    // </Carousel>
    <Carousel autoplay>
      <div>
        <img src={process.env.PUBLIC_URL + "/images/promo.jpg"} style={contentStyle} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + "/images/promo1.jpg"} style={contentStyle} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + "/images/promo2.jpg"} style={contentStyle} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + "/images/promo4.jpg"} style={contentStyle} />
      </div>
    </Carousel>
  );
}
