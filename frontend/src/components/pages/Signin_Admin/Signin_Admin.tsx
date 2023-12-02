import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { SigninUserInterface } from "../../../interfaces/ISignIn_User";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signin_Admin() {
  const [signin, setSignin] = useState<Partial<SigninUserInterface>>({});
  const [signinAdmin, setSigninAdmin] = useState<Partial<SigninUserInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function LoginAdmin(data: SigninUserInterface) {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/login/admin`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("aid", res.data.id);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("position", res.data.position);
          return res.data;
        } else {
          console.log(res.error);
          return false;
        }
      });

    return res;
  }

  const handleInputChangeAdmin = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSigninAdmin({ ...signinAdmin, [id]: value });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const submitAdmin = async () => {
    let res = await LoginAdmin(signinAdmin);
    if (res) {
      console.log(res);
      setSuccess(true);
      setTimeout(() => {
        // window.location.reload();
        window.location.href = "/";
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider
      theme={createTheme({
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
      })}
    >
      {/** Sign In */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/** Sign In Alert*/}
        <Snackbar
          id="success"
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          id="error"
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/images/bg-admin1.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 16,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar sx={{ p: 3, m: 2, bgcolor: "#000", cursor: "pointer" }} onClick={handleClickOpen}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h2">
              Sign in for Admin
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                autoComplete="Email"
                autoFocus
                value={signinAdmin.Email || ""}
                onChange={handleInputChangeAdmin}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={signinAdmin.Password || ""}
                onChange={handleInputChangeAdmin}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ padding: 1.5, marginTop: 2 }}
                onClick={submitAdmin}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signin_Admin;
