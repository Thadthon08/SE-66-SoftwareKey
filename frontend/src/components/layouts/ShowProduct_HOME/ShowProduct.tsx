import React from "react";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProduct } from "../../../sevices/http";
import { Box, Container, Grid, List, ListItem, Pagination, Paper, Typography, styled } from "@mui/material";
import { NumericFormat } from "react-number-format";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SellIcon from "@mui/icons-material/Sell";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Content, Footer } from "antd/es/layout/layout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
                //   height: 330,
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
                    fontSize: 17,
                  }}
                >
                  {product.Name}
                </Typography>
                <Typography variant="body2">
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
          {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
        </Container>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <Button variant="contained" disableElevation sx={{ width: 300, fontSize: 20 }} onClick={showMoreItem}>
            View More
          </Button>
        </Box>
      </Content>
      <Footer style={{ backgroundColor: "#3a3b3c", color: "white" }}>
        <Grid container spacing={2} columns={16}>
          <Grid xs={5}>
            <img src={process.env.PUBLIC_URL + "/images/log1.png"} width="120" />
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Keyhub Pro ร้านขายคีย์ซอฟต์แวร์ที่แพงที่สุดในโลก
            </Typography>
            <Typography variant="subtitle2" sx={{ width: 400 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolorum sunt iure, dolore reiciendis
              molestias eaque molestiae corporis commodi maiores dolor temporibus soluta repellat cupiditate architecto
              doloribus voluptatibus dolores sint?
            </Typography>
          </Grid>
          <Grid xs={5}>
            <Typography variant="h5">SITE LINKS</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h5">Contact us</Typography>
            <List>
              <ListItem>
                <Button href="https://www.facebook.com/profile.php?id=61553421364547" sx={{ color: "white" }}>
                  <img src={process.env.PUBLIC_URL + "/images/facebook.png"} width={35} style={{ padding: 2 }} />
                  Facebook
                </Button>
              </ListItem>
              <ListItem>
                <Button href="https://line.me/th/" sx={{ color: "white" }}>
                  <img src={process.env.PUBLIC_URL + "/images/line.png"} width={35} style={{ padding: 2 }} />
                  Line
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  href="https://mail.google.com/mail/u/0/#sent/KtbxLvhRXHXsfBWFQnMCWVtSlmCctjLFHL?compose=CllgCHrkWCjNbwvNZLXzBfVVNBVSzhGCsshcKkDPwrJFTKjWqFJLKfCldGZnmnCHPFSfFbvKStg"
                  sx={{ color: "white" }}
                >
                  <img src={process.env.PUBLIC_URL + "/images/gmail.png"} width={35} style={{ padding: 2 }} />
                  Mail
                </Button>
              </ListItem>
            </List>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h5">Community</Typography>
            <List>
              <ListItem>
                <Button href="https://www.facebook.com/profile.php?id=61553421364547" sx={{ color: "white" }}>
                  <img src={process.env.PUBLIC_URL + "/images/facebook.png"} width={35} style={{ padding: 2 }} />
                  Facebook
                </Button>
              </ListItem>
              <ListItem>
                <Button href="https://discord.gg/dWGY4BMd" sx={{ color: "white" }}>
                  <img src={process.env.PUBLIC_URL + "/images/discord.png"} width={35} style={{ padding: 2 }} />
                  Discord
                </Button>
              </ListItem>
              <ListItem>
                <Button href="https://www.twitch.tv/" sx={{ color: "white" }}>
                  <img src={process.env.PUBLIC_URL + "/images/twitch.png"} width={35} style={{ padding: 2 }} />
                  Twitch
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Footer>
    </>
  );
}
