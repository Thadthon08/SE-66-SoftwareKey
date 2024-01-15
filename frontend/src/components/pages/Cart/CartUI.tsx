import * as React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { CartInterface } from "../../../interfaces/ICart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NumericFormat } from "react-number-format";
import CalculateIcon from "@mui/icons-material/Calculate";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CartUI() {
  const [cart, setCart] = React.useState<CartInterface[]>([]);
  const [show, setShow] = React.useState(false);
  const getUserBasket = async () => {
    const apiUrl = "http://localhost:8080/userbasket/" + String(localStorage.getItem("uid"));
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCart(res.data);
        }
      });
  };
  React.useEffect(() => {
    const fetchData = async () => {
      await getUserBasket();
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ height: "auto", padding: 5 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
          <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="inherit" href="/home">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography sx={{ display: "flex", alignItems: "center" }} color="#eab308">
            <ShoppingBasketIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            ตะกร้าสินค้า
          </Typography>
        </Breadcrumbs>
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
          <Typography variant="h5" sx={{ color: "white", flexGrow: 3, cursor: "default" }}>
            <ShoppingCartIcon fontSize="medium" sx={{ position: "relative", bottom: "-5px", mr: "6px" }} />
            ตะกร้าสินค้า
          </Typography>
        </Box>
        {cart.map((item) => (
          <Paper
            sx={{
              p: 2,
              margin: "25px auto",
              maxWidth: 1000,
              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "translateY(-0.45em)",
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 250, height: 180 }}>
                  <Img alt="complex" src={item.Product.Image} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h3" component="div">
                      {item.Product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.Product.Desciption}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: "pointer" }} variant="body2">
                      Remove
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h4" component="div">
                    <NumericFormat
                      value={item.Product.Price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"฿"}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
      <IconButton
        sx={{
          padding: "20px 24px",
          color: "#000",
          bgcolor: "#ffff",
          position: "fixed",
          top: "20%",
          right: "5%",
          "&:hover": {
            backgroundColor: "#eab308",
            color: "#fff",
          },
        }}
        onClick={() => setShow((prev) => !prev)}
      >
        <CalculateIcon fontSize="large" />
      </IconButton>
      {show && (
        <Box>
          <Card sx={{ maxWidth: 345, position: "fixed", top: "30%", right: "5%" }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total :
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large">สั่งซื้อ</Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </React.Fragment>
  );
}
