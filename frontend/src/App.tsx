import * as React from "react";
import { ThemeProvider, createTheme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Menu from "./components/layouts/Menu";
import Header from "./components/layouts/Header";
import { Link, Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./components/pages/AdminLoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockPage from "./components/pages/StockPage";
import StockEditPage from "./components/pages/StockEditPage";
import SoftwareKey from "./components/pages/SoftwareKey";
import SoftwareKeyCreate from "./components/pages/SoftwareKeyCreate";
import HomeUser from "./components/pages/HomeUser";
import { blue, blueGrey, purple, red, common } from "@mui/material/colors";

import "./App.css";

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
    background: {
      default: "#fff8f8",
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
    return <LoginPage />;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function routers() {
    if (localStorage.getItem("position") == "Admin") {
      return (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {true && <Header open={open} onDrawerOpen={handleDrawerOpen} />}
            {true && <Menu open={open} onDrawerClose={handleDrawerClose} />}
            <Main open={open}>
              <DrawerHeader />
              <Routes>
                {/* <Route path="/" element={<Navigate to="/login" />} /> */}
                <Route path="/" element={<StockPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/stock" element={<StockPage />} />
                <Route path="/stock/create" element={<StockCreatePage />} />
                <Route path="/stock/edit/:id" element={<StockEditPage />} />
                <Route path="/storage" element={<SoftwareKey />} />
                <Route path="/storage/create" element={<SoftwareKeyCreate />} />
              </Routes>
            </Main>
          </Box>
        </ThemeProvider>
      );
    } else if (localStorage.getItem("position") == "User") {
      return (
        <Routes>
          <Route path="/" element={<HomeUser />} />
        </Routes>
      );
    }
  }
  return (
    // <ThemeProvider theme={theme}>
    //   <Box sx={{ display: "flex" }}>
    //     <CssBaseline />
    //     {true && <Header open={open} onDrawerOpen={handleDrawerOpen} />}
    //     {true && <Menu open={open} onDrawerClose={handleDrawerClose} />}
    //     <Main open={open}>
    //       <DrawerHeader />
    //       <Routes>
    //         <Route path="/" element={<Navigate to="/login" />} />
    //         <Route path="*" element={<NotFound />} />
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/register" element={<RegisterPage />} />
    //         <Route path="/stock" element={<StockPage />} />
    //         <Route path="/stock/create" element={<StockCreatePage />} />
    //         <Route path="/stock/edit/:id" element={<StockEditPage />} />
    //         <Route path="/storage" element={<SoftwareKey />} />
    //         <Route path="/storage/create" element={<SoftwareKeyCreate />} />
    //       </Routes>
    //     </Main>
    //   </Box>
    // </ThemeProvider>
    <>{routers()}</>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 -- Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
