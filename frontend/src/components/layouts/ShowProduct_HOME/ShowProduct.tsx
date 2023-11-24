import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProduct } from "../../../sevices/http";
import { Container, Typography } from "@mui/material";

export default function ShowProduct() {
  const [products, setProducts] = React.useState<ProductInterface[]>([]);

  const getProducts = async () => {
    let res = await GetProduct();
    if (res) {
      setProducts(res);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "#fff8f8",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Card key={product.ID} sx={{ width: 275, height: 320, margin: 2, marginTop: 2 }}>
            <CardMedia sx={{ width: 150, height: 160, margin: "auto", marginTop: 2 }} image={product.Image} />
            <CardContent>
              <Typography
                gutterBottom
                component="div"
                sx={{
                  textAlign: "center",
                  width: 215,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 17,
                }}
              >
                {product.Name}
              </Typography>
            </CardContent>
            <CardActions sx={{ textAlign: "center", justifyContent: "center" }}>
              <Button size="medium" sx={{ border: "1px solid #000" }}>
                ADD TO CART
              </Button>
              <Button size="medium" sx={{ border: "1px solid #000" }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
}
