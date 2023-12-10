import React, { useEffect, useState } from "react";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProductById } from "../../../sevices/http";
import { Content } from "antd/es/layout/layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Button, CardActions, Divider } from "@mui/material";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { NumericFormat } from "react-number-format";

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
    <Content style={{ backgroundColor: "#242526", height: "100vh", paddingTop: "5%" }}>
      {product ? (
        <Card
          sx={{
            display: "flex",
            width: "45%",
            margin: "auto",
            padding: "15px",
            boxShadow: "0 0 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
          }}
        >
          <img src={product.Image} alt={product.Name} style={{ width: "100%", height: "90%" }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h4">
                {product.Name}
              </Typography>
              <Typography component="div" variant="h5">
                <NumericFormat
                  value={product.Price}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix={"฿"}
                />
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
                sx={{ width: "70%", padding: "7px" }}
              >
                {product.Desciption}
              </Typography>
              <Divider />
              <Typography component="div" variant="subtitle1">
                Categories : <span style={{ color: "red" }}>{product.CategoryID}</span>
              </Typography>
              <Typography component="div" variant="subtitle1">
                Stock : <span style={{ color: "red" }}>{product.CategoryID}</span>
              </Typography>
            </CardContent>
            <CardActions sx={{ textAlign: "center", justifyContent: "center" }}>
              <Button variant="contained" sx={{ backgroundColor: "#primary", width: "50%", padding: 1.2 }}>
                <ShoppingCartSharpIcon />
                ADD TO CART
              </Button>
              <Button
                size="medium"
                sx={{ border: "1px solid #000", width: "50%", padding: 1.2 }}
                onClick={() => {
                  Navigate("/");
                }}
              >
                Back
              </Button>
            </CardActions>
          </Box>
        </Card>
      ) : (
        <div>ไม่มีสินค้านี้....</div>
      )}
    </Content>
  );
}
