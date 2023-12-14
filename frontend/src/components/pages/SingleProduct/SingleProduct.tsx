import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProductById } from "../../../sevices/http";
import { Content } from "antd/es/layout/layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Breadcrumbs, Button, CardActions, CardMedia, Container, CssBaseline, Divider, Link } from "@mui/material";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { NumericFormat } from "react-number-format";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessSharpIcon from "@mui/icons-material/AddBusinessSharp";
import InterestsSharpIcon from "@mui/icons-material/InterestsSharp";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductInterface | null>();
  const Navigate = useNavigate();

  const getProductById = async () => {
    let res = await GetProductById(Number(id));
    if (res) {
      setProduct(res);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <Content style={{ backgroundColor: "#242526" }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ padding: 5 }}>
        {product ? (
          <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white", paddingBottom: 3 }}>
              <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="inherit" href="/home">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="inherit" href="/home">
                <InterestsSharpIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {product.CategoryID}
              </Link>
              <Typography sx={{ display: "flex", alignItems: "center" }} color="#eab308">
                {/* <AddBusinessSharpIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
                {product.Name}
              </Typography>
            </Breadcrumbs>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "65%",
                margin: "auto",
                padding: "15px",
                boxShadow: "0 0 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
              }}
            >
              <CardMedia
                sx={{
                  width: "100%",
                  height: 300,
                  margin: "auto",
                  marginY: 3,
                }}
              >
                <img
                  src={product.Image}
                  alt={product.Name}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </CardMedia>
              <CardContent sx={{ ml: 3.5 }}>
                <Typography component="div" variant="h4">
                  {product.Name}
                </Typography>
                <Typography component="div" variant="h5" color="red" sx={{ pb: 2 }}>
                  <NumericFormat
                    value={product.Price}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"฿ "}
                  />{" "}
                  💸💸💸
                </Typography>
                <Divider />
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Description :
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                  sx={{ width: "90%", p: "0 0 14px 14px" }}
                >
                  {product.Desciption}
                </Typography>
                <Divider />
                <Typography component="div" variant="h6" sx={{ pt: 1.5 }}>
                  Categories : <span style={{ color: "red" }}>{product.CategoryID}</span>
                </Typography>
                <Typography component="div" variant="h6">
                  Stock : <span style={{ color: "red" }}>{product.CategoryID}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" sx={{ backgroundColor: "#primary", width: "50%", p: 1.2 }}>
                  <ShoppingCartSharpIcon />
                  ADD TO CART
                </Button>
                <Button
                  size="medium"
                  sx={{ border: "1px solid #000", width: "50%", p: 1.2 }}
                  onClick={() => {
                    Navigate(-1);
                  }}
                >
                  Back
                </Button>
              </CardActions>
            </Card>
          </div>
        ) : (
          <div>ไม่มีสินค้านี้....</div>
        )}
      </Container>
    </Content>
  );
}
