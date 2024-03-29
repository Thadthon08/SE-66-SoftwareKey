import React from "react";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProduct } from "../../../sevices/http";
import { Box, Container, Paper, TextField, Typography, styled } from "@mui/material";
import { NumericFormat } from "react-number-format";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SellIcon from "@mui/icons-material/Sell";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import styles from "./style.module.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "@media (max-width: 718px)": {
    display: "none",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export default function ShowProduct() {
  const [products, setProducts] = React.useState<ProductInterface[]>([]);
  const [loadmore, setLoadmore] = React.useState(6);
  const [search, setSearch] = React.useState("");
  const Navigate = useNavigate();

  const AddToBasket = (productId: Number) => {
    let data = {
      UserID: Number(localStorage.getItem("uid")),
      VoucherID: 1,
      ProductID: productId,
      Total: 0,
    };
    console.log(data);
    const apiUrl = "http://localhost:8080/baskets"; //ส่งขอบันทึก
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions) //ขอการส่งกลับมาเช็คว่าบันทึกสำเร็จมั้ย
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Success",
            text: "เพิ่มสินค้าในตะกร้าสำเร็จ !",
            icon: "success",
            timer: 2000,
          }).then((result) => {
            if (result) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: res.message,
            icon: "error",
            timer: 2000,
          });
        }
      });
  };

  const showMoreItem = () => {
    setLoadmore((prevValue) => prevValue + 3);
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
      <main style={{ backgroundColor: "#242526" }}>
        <CssBaseline />
        <Container
          className={styles.Container}
          maxWidth="lg"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              padding: 3,
              width: "88%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
            className={styles.headers}
              variant="h5"
              sx={{
                color: "white",
                flexGrow: 3,
                cursor: "default",
              }}
            >
              <SellIcon fontSize="medium" />
              สินค้าทั้งหมด
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Search>
          </Box>
          {products
            .slice(0, loadmore)
            .filter((product) => product.Name?.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <Card
                className={styles.Card}
                key={product.ID}
                sx={{
                  bgcolor: "white",
                  width: 275,
                  height: 325,
                  margin: 2,
                  boxShadow: "0px 0px 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
                  transition: "transform 0.4s",
                  "&:hover": {
                    // height: 330,
                    transform: "translateY(-0.45em)",
                  },
                }}
              >
                <CardMedia
                  className={styles.CardMedia}
                  sx={{
                    width: 150,
                    height: 150,
                    margin: "auto",
                    marginTop: 2,
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
                <CardContent className= {styles.CardContent}>
                  <Typography
                    className={styles.productName}
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
                  <Typography variant="body1" className={styles.productPrice}>
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
                <CardActions className={styles.CardActions} sx={{ textAlign: "center", justifyContent: "center" }}>
                  <Button
                    className={styles.bttn}
                    variant="contained"
                    sx={{
                      backgroundColor: "#primary",
                    }}
                    onClick={() => product.ID && AddToBasket(product.ID)}
                  >
                    <ShoppingCartSharpIcon className={styles.Icon} />
                    ADD TO CART
                  </Button>
                  <Button
                    className={styles.bttnle}
                    size="medium"
                    sx={{
                      border: "1px solid #000",
                    }}
                    onClick={() => {
                      Navigate("/product/" + product.ID);
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Container>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: 300,
              fontSize: 20,
              transition: "transform 0.4s",
              "&:hover": {
                boxShadow: "0 0.5em 0.5em -0.4em black",
                transform: "translateY(-0.25em)",
              },
              mb: 4,
            }}
            onClick={showMoreItem}
          >
            View More
          </Button>
        </Box>
      </main>
    </>
  );
}
