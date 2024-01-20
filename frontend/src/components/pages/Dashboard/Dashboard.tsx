import React from "react";
import { Content } from "antd/es/layout/layout";
import { Button, Container, CssBaseline, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typewriter from "typewriter-effect";
import styles from "./style.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Dashboard() {
  const username = localStorage.getItem("name");
  return (
    <main
      style={{
        backgroundColor: "#242526",
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ padding: 5 }} className={styles.Container}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={styles.GridContainer}>
          <Grid item xs={7} className={styles.GridContent}>
            <Typography
              className={styles.Typography}
              variant="h4"
              noWrap
              component="div"
              fontWeight="600"
              sx={{ color: "white", marginTop: 3 }}
            >
              🚀 ยินดีต้อนรับสู่เว็บไซต์ !
            </Typography>
            <Typography
              className={styles.Typewriter}
              variant="h4"
              noWrap
              component="div"
              fontWeight="600"
              sx={{ color: "#eab308", marginBottom: 3 }}
            >
              <Typewriter
                options={{
                  strings: ["o💸KeyHub Pro Shop💸o"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Typography>
            <Typography
              className={styles.TypographyContent}
              variant="subtitle1"
              noWrap
              component="div"
              fontWeight="300"
              sx={{ color: "#B3B3B3", margin: 0.5, width: "500px", fontSize: "18px" }}
            >
              เว็บไซต์ของเราเป็นที่รวบรวมและจำหน่ายคีย์ซอฟต์แวร์อย่างมีคุณภาพ
            </Typography>
            <Typography
              className={styles.TypographyContent}
              variant="subtitle1"
              noWrap
              component="div"
              fontWeight="300"
              sx={{ color: "#B3B3B3", width: "550px", margin: 0.5, fontSize: "18px" }}
            >
              และครบวงจรที่สำหรับผู้ใช้ทุกคนที่มีความต้องการในด้านซอฟต์แวร์ต่าง ๆ
            </Typography>
            <Typography
              className={styles.NavigateHeader}
              variant="h6"
              noWrap
              component="div"
              fontWeight="600"
              sx={{ color: "White", width: "550px", margin: 0.5, marginTop: 3 }}
            >
              เลือกเส้นทางสำรวจสินค้า:
            </Typography>
            <List sx={{ marginTop: 2, width: "550px" }} className={styles.ListNavigate}>
              <Button
                className={styles.bttn}
                href="#"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 2,
                  "&:hover": {
                    background: "#eab308",
                    color: "black",
                    boxShadow: "0 0.5em 0.5em -0.4em #b3b3b3",
                    transform: "translateY(-0.25em)",
                  },
                }}
              >
                Operating System
              </Button>
              <Button
                className={styles.bttn}
                href="#"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 2,
                  "&:hover": {
                    background: "#eab308",
                    color: "black",
                    boxShadow: "0 0.5em 0.5em -0.4em #b3b3b3",
                    transform: "translateY(-0.25em)",
                  },
                }}
              >
                Antivirus & Security
              </Button>
              <Button
                className={styles.bttn}
                href="#"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 2,
                  "&:hover": {
                    background: "#eab308",
                    color: "black",
                    boxShadow: "0 0.5em 0.5em -0.4em #b3b3b3",
                    transform: "translateY(-0.25em)",
                  },
                }}
              >
                Office & Business
              </Button>
              <Button
                className={styles.bttn}
                href="#"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 2,
                  marginTop: 2,
                  "&:hover": {
                    background: "#eab308",
                    color: "black",
                    boxShadow: "0 0.5em 0.5em -0.4em #b3b3b3",
                    transform: "translateY(-0.25em)",
                  },
                }}
              >
                Utility, Tool & Driver
              </Button>
              <Button
                className={styles.bttn}
                href="#"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 2,
                  marginTop: 2,
                  "&:hover": {
                    background: "#eab308",
                    color: "black",
                    boxShadow: "0 0.5em 0.5em -0.4em #b3b3b3",
                    transform: "translateY(-0.25em)",
                  },
                }}
              >
                Image, Video & Audio
              </Button>
              <Button
                className={styles.bttn}
                href="#"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 2,
                  marginTop: 2,
                  "&:hover": {
                    background: "#eab308",
                    color: "black",
                    boxShadow: "0 0.5em 0.5em -0.4em #b3b3b3",
                    transform: "translateY(-0.25em)",
                  },
                }}
              >
                Web & Desktop Publishing
              </Button>
            </List>
            <Typography
              className={styles.getStarted}
              variant="h6"
              noWrap
              component="div"
              fontWeight="600"
              sx={{ color: "White", width: "550px", margin: 0.5, marginTop: 4 }}
            >
              เลือกดูสินค้าทั้งหมด:
            </Typography>
            <Button
              className={styles.bttngetStarted}
              href="/Home"
              variant="contained"
              sx={{
                fontSize: "25px",
                fontWeight: "600PX",
                width: "300px",
                height: "52px",
                color: "black",
                marginRight: 2,
                background: "#eab308",
                marginTop: 2,
                "&:hover": {
                  background: "#eab308",
                  color: "black",
                },
              }}
            >
              GET STARTED 🎉
            </Button>
          </Grid>
          <Grid item xs={5} className={styles.GridImage}>
            <img src={process.env.PUBLIC_URL + "/images/dev.png"} width="130%" />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
