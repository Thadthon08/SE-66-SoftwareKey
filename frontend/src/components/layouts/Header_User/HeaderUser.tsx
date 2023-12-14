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
import { Avatar, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddBusinessSharpIcon from "@mui/icons-material/AddBusinessSharp";
import InterestsSharpIcon from "@mui/icons-material/InterestsSharp";
import NewspaperSharp from "@mui/icons-material/NewspaperSharp";
import MenuBookIcon from "@mui/icons-material/MenuBookSharp";
import HomeIcon from "@mui/icons-material/Home";

export default function HeaderUser() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const Navigate = useNavigate();

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
      <MenuItem onClick={handleMenuClose}>Storage</MenuItem>
      <MenuItem onClick={Signout}>Sign Out</MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            KEYHUBPRO
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="show 4 new cart" color="inherit">
              <Badge badgeContent={0} color="error">
                <ShoppingCartSharpIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge color="error">
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
        <Toolbar
          variant="dense"
          sx={{ backgroundColor: "#101010", display: "flex", justifyContent: "center", textAlign: "center" }}
        >
          <Button
            href="/home"
            variant="text"
            sx={{
              color: "#ffff",
              flexGrow: 0.1,
              fontSize: "16px",
              "&:hover": {
                borderRadius: 0,
                borderBottom: "1px solid white",
              },
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />
            หน้าหลัก
          </Button>
          <Button
            href="/products"
            variant="text"
            sx={{
              color: "#ffff",
              flexGrow: 0.1,
              fontSize: "16px",
              "&:hover": {
                borderRadius: 0,
                borderBottom: "1px solid white",
              },
            }}
          >
            <AddBusinessSharpIcon sx={{ mr: 0.5 }} fontSize="medium" />
            สินค้าทั้งหมด
          </Button>
          <Button
            href="/"
            variant="text"
            sx={{
              color: "#ffff",
              flexGrow: 0.1,
              fontSize: "16px",
              "&:hover": {
                // fontSize: "18px",
                borderRadius: 0,
                borderBottom: "1px solid white",
              },
            }}
          >
            <InterestsSharpIcon sx={{ mr: 0.5 }} fontSize="medium" />
            หมวดหมู่สินค้า
          </Button>
          <Button
            href="/"
            variant="text"
            sx={{
              color: "#ffff",
              flexGrow: 0.1,
              fontSize: "16px",
              "&:hover": {
                // fontSize: "18px",
                borderRadius: 0,
                borderBottom: "1px solid white",
              },
            }}
          >
            <NewspaperSharp sx={{ mr: 0.5 }} fontSize="medium" />
            ข่าว & คูปองส่วนลด
          </Button>
          <Button
            href="/Howtopay"
            variant="text"
            sx={{
              color: "#ffff",
              flexGrow: 0.1,
              fontSize: "16px",
              "&:hover": {
                // fontSize: "18px",
                borderRadius: 0,
                borderBottom: "1px solid white",
              },
            }}
          >
            <MenuBookIcon sx={{ mr: 0.5 }} fontSize="medium" />
            วิธีการชำระเงิน
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
