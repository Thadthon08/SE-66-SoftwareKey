import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Swal from "sweetalert2";
import { Avatar, Button, Grid, List, ListItem } from "@mui/material";
import Carousels from "../../layouts/Carousel/Carousels";
import ShowProduct from "../../layouts/ShowProduct_HOME/ShowProduct";
import SearchProduct from "../../layouts/SearchProduct";
import { Footer } from "antd/es/layout/layout";

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userID] = React.useState(localStorage.getItem("uid"));
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const Signout = () => {
    let timerInterval: any;
    Swal.fire({
      title: "Sign out!",
      icon: "warning",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(() => {
      localStorage.clear();
      window.location.href = "/";
    });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={Signout}>Sign Out</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              KEYHUBPRO
            </Typography>
            {/* SearchProduct Component */}
            <SearchProduct />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton size="large" aria-label="show 4 new cart" color="inherit">
                <Badge badgeContent={4} color="error">
                  <ShoppingCartSharpIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + "/images/bg-login3.jpg"} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      {/* New Slide */}
      <Carousels />
      {/*Show Product*/}
      <ShowProduct />
      <Footer style={{ backgroundColor: "#3a3b3c", color: "white" }}>
        <Grid container spacing={2} columns={16}>
          <Grid xs={5}>
            <img src={process.env.PUBLIC_URL + "/images/keyhub1.png"} width="160" />
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              ร้านขายคีย์ซอฟต์แวร์ที่แพงที่สุดในโลก
            </Typography>
            <Typography variant="subtitle2">
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
