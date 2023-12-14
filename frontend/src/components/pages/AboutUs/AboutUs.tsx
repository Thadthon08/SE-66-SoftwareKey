import { Box, Breadcrumbs, Container, CssBaseline, Grid, Link, Typography } from "@mui/material";
import { Content } from "antd/es/layout/layout";
import React from "react";
import ReactPlayer from "react-player/youtube";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typewriter from "typewriter-effect";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 500,
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export default function AboutUs() {
  return (
    <>
      <Content style={{ backgroundColor: "#242526" }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ padding: 5 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="inherit" href="/home">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography sx={{ display: "flex", alignItems: "center" }} color="#eab308">
              <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              วิธีการชำระเงิน
            </Typography>
          </Breadcrumbs>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" noWrap component="div" fontWeight="600" sx={{ color: "white", marginTop: 3 }}>
              วิธีการชำระเงินผ่านเว็ป
            </Typography>
            <Typography variant="h5" noWrap component="div" fontWeight="600" sx={{ color: "#eab308", marginBottom: 3 }}>
              <Typewriter
                options={{
                  strings: ["o💸KeyHub Pro Shop💸o"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <DemoPaper
                  variant="elevation"
                  sx={{ boxShadow: "0 0 9px rgba(234, 179, 8,.9),inset 0 0 9px rgba(228, 230, 235,.7)" }}
                >
                  <Typography variant="h5" component="div" sx={{ margin: 0.5, textAlign: "center" }}>
                    💸วิธีการชำระเงิน💸
                  </Typography>
                  <Box sx={{ width: 450 }}>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5 }}>
                      1. โอนเงินผ่านธนาคาร
                    </Typography>
                    <Typography variant="subtitle2" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      บัญชี ออมทรัพย์ ธนาคารกรุงเทพ สาขา สยามพารากอน
                    </Typography>
                    <Typography variant="subtitle2" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      ชื่อบัญชี: บริษัท คอนส์ โรโบติกส์ จำกัด
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      เลขบัญชี: 855-0-65158-5
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5 }}>
                      2. โอนเงินผ่านPromptpay
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      เบอร์ : 098-777-1111
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5 }}>
                      3. Scan QR Code ผ่าน app ธนาคาร
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      <img src="https://promptpay.io/0105561008411/1500" width="130px" />
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5 }}>
                      4. เมื่อชำระเงินเสร็จให้แจ้งการชำระเงิน
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      <Link href="#" sx={{ color: "red", marginRight: 1 }}>
                        Click
                      </Link>
                      ไปที่หน้าแจ้งการชำระเงิน
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5 }}>
                      5. เมื่อแจ้งการชำระเงินเสร็จแล้วให้รอการตรวจภายใน 24 ชม.
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ margin: 0.5, marginLeft: 4 }}>
                      <Link href="#" sx={{ color: "red", marginRight: 1 }}>
                        Click
                      </Link>
                      ไปที่หน้าตรวจสอบสถานะการชำระเงิน
                    </Typography>
                  </Box>
                </DemoPaper>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" component="div" sx={{ color: "white", marginBottom: 1.5 }}>
                  สามารถดูคลิป Viedo วิธีการชำระเงินได้ที่นี่ !
                </Typography>
                <ReactPlayer controls url="https://www.youtube.com/watch?v=d1sm_7lOm3k" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Content>
    </>
  );
}
