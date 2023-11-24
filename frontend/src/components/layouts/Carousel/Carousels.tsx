import React, { useEffect } from "react";
import { Carousel } from "antd";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProduct } from "../../../sevices/http";
const contentStyle: React.CSSProperties = {
  height: "350px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
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
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}
