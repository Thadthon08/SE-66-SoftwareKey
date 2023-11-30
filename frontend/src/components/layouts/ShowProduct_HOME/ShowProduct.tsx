import React from "react";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProduct } from "../../../sevices/http";
import { Box, Container, Paper, Typography, styled } from "@mui/material";
import { NumericFormat } from "react-number-format";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SellIcon from "@mui/icons-material/Sell";
import { Content } from "antd/es/layout/layout";

export default function ShowProduct() {
  const [products, setProducts] = React.useState<ProductInterface[]>([]);
  const [loadmore, setLoadmore] = React.useState(8);

  const showMoreItem = () => {
    setLoadmore((prevValue) => prevValue + 4);
  };

  const getProducts = async () => {
    let res = await GetProduct();
    if (res) {
      setProducts(res);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, [loadmore]);
  return (
    <>
      <Content style={{ backgroundColor: "#242526" }}>
        <CssBaseline />
        <Box sx={{ padding: 3, marginLeft: 11 }}>
          <Typography variant="h5" sx={{ color: "white", display: "inline" }} gutterBottom>
            <SellIcon fontSize="medium" />
            สินค้าทั้งหมด
          </Typography>
        </Box>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {products.slice(0, loadmore).map((product) => (
            <Card
              key={product.ID}
              sx={{
                bgcolor: "white",
                width: 275,
                height: 325,
                margin: 2,
                boxShadow: "0 0 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
                transition: "height 0.5s",
                // "&:hover": {
                //   height: 350,
                // },
              }}
            >
              <CardMedia sx={{ width: 150, height: 160, margin: "auto", marginTop: 2 }} image={product.Image} />
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    width: 215,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: 18,
                  }}
                >
                  {product.Name}
                </Typography>
                <Typography variant="body1">
                  <NumericFormat
                    value={product.Price}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"฿ "}
                  />
                </Typography>
              </CardContent>
              <CardActions sx={{ textAlign: "center", justifyContent: "center" }}>
                <Button variant="contained" sx={{ backgroundColor: "#primary" }}>
                  <ShoppingCartSharpIcon />
                  ADD TO CART
                </Button>
                <Button size="medium" sx={{ border: "1px solid #000" }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Container>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <Button variant="contained" disableElevation sx={{ width: 300, fontSize: 20 }} onClick={showMoreItem}>
            View More
          </Button>
        </Box>
      </Content>
    </>
  );
}
