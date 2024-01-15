import * as React from "react";
import { ThemeProvider, createTheme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Menu from "./components/layouts/Menu";
import Header from "./components/layouts/Header";
import { Link, Route, Routes } from "react-router-dom";
import Signin_User from "./components/pages/Signin_User";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockPage from "./components/pages/StockPage";
import StockEditPage from "./components/pages/StockEditPage";
import SoftwareKey from "./components/pages/SoftwareKey";
import SoftwareKeyCreate from "./components/pages/SoftwareKeyCreate";
import HomeUser from "./components/pages/HomeUser";
import "./App.css";
import SoftwareKeyEdit from "./components/pages/SoftwareKeyEdit";
import Signin_Admin from "./components/pages/Signin_Admin";
import SingleProduct from "./components/pages/SingleProduct";
import HeaderUser from "./components/layouts/Header_User/HeaderUser";
import AboutUs from "./components/pages/AboutUs";
import Footer from "./components/layouts/Footer";
import AllProducts from "./components/pages/AllProducts";
import Dashboard from "./components/pages/Dashboard";
import CartUI from "./components/pages/Cart/CartUI";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "url(" + `${process.env.PUBLIC_URL}/images/menu.png` + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: drawerWidth,
        },
      },
    },
  },
  typography: {
    fontFamily: "Mohave,Noto Sans Thai",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  spacing: 8,
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#FFFF",
    },
    background: {
      default: "#181818",
      // default: "#e5e7e9",
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Signin_User />} />
        <Route path="/admin" element={<Signin_Admin />} />
      </Routes>
    );
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function routers() {
    if (localStorage.getItem("position") === "Admin") {
      return (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {true && <Header open={open} onDrawerOpen={handleDrawerOpen} />}
            {true && <Menu open={open} onDrawerClose={handleDrawerClose} />}
            <Main open={open}>
              <DrawerHeader />
              <Routes>
                <Route path="/" element={<StockPage />} />
                <Route path="/stock" element={<StockPage />} />
                <Route path="/stock/create" element={<StockCreatePage />} />
                <Route path="/stock/edit/:id" element={<StockEditPage />} />
                <Route path="/key" element={<SoftwareKey />} />
                <Route path="/key/edit/:id" element={<SoftwareKeyEdit />} />
                <Route path="/key/create" element={<SoftwareKeyCreate />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Main>
          </Box>
        </ThemeProvider>
      );
    } else if (localStorage.getItem("position") === "User") {
      return (
        <ThemeProvider theme={theme}>
          <HeaderUser />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<HomeUser />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/Howtopay" element={<AboutUs />} />
            <Route path="/cart" element={<CartUI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      );
    }
  }
  return <>{routers()}</>;
}

function NotFound() {
  return (
    <div>
      <h1 style={{ color: "red" }}>404 -- Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
