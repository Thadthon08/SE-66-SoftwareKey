import React from "react";
import Typography from "@mui/material/Typography";
import { Footer } from "antd/es/layout/layout";
import { Avatar, Button, CssBaseline, Grid, List, ListItemText, ListItemButton } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function footer() {
  return (
    <Footer style={{ backgroundColor: "#3a3b3c", color: "white" }}>
      <CssBaseline />
      <Grid container spacing={2} columns={16}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={4.5}>
          <img src={process.env.PUBLIC_URL + "/images/keyhub1.png"} width="40%" />
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            ร้านขายคีย์ซอฟต์แวร์ที่แพงที่สุดในโลก
          </Typography>
          <Typography variant="subtitle2" width="80%">
            เว็บไซต์ KeyHubPro เป็นเพียงตัวแทนจำหน่ายเท่านั้น
            ไม่มีส่วนเกี่ยวข้องกับองค์กรหรือบุคคลใดๆที่แอบอ้างใช้ชื่อบัญชีธนาคาร ร้าน KeyHubPro
            โปรดระวังมิจฉาชีพแอบอ้างบัญชีเราเพื่อหลอกให้ผู้อื่นจ่ายค่าสินค้าแทน!
          </Typography>
        </Grid>
        <Grid item xs={2.5}>
          <Typography variant="h6">Site Links</Typography>
          <List>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "/home")}
              >
                หน้าหลัก
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "/Products")}
              >
                สินค้าทั้งหมด
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                หมวดหมู่สินค้า
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                ข่าว & คูปองส่วนลด
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "/Howtopay")}
              >
                วิธีการชำระเงิน
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">How to activate your Software code</Typography>
          <List>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                Origin code activation
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                Steam code activation
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                Epic Games code activation
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                Rockstar code activation
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 2, marginLeft: 2, cursor: "pointer" }}
                onClick={() => (window.location.href = "#")}
              >
                Ubisoft Connect code activation
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item xs={2.5}>
          <Typography variant="h6">Contact us</Typography>
          <List>
            <ListItemText>
              <Button
                href="https://www.facebook.com/profile.php?id=61553421364547"
                variant="text"
                sx={{ color: "white" }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/facebook.png"}
                  width={30}
                  style={{ marginLeft: "10px", marginRight: 6 }}
                />
                Facebook
              </Button>
            </ListItemText>
            <ListItemText>
              <Button href="https://line.me/th/" variant="text" sx={{ color: "white" }}>
                <img
                  src={process.env.PUBLIC_URL + "/images/line.png"}
                  width={30}
                  style={{ marginLeft: "10px", marginRight: 6 }}
                />
                Line
              </Button>
            </ListItemText>
            <ListItemText>
              <Button
                href="https://mail.google.com/mail/u/0/#sent/KtbxLvhRXHXsfBWFQnMCWVtSlmCctjLFHL?compose=CllgCHrkWCjNbwvNZLXzBfVVNBVSzhGCsshcKkDPwrJFTKjWqFJLKfCldGZnmnCHPFSfFbvKStg"
                variant="text"
                sx={{ color: "white" }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/gmail.png"}
                  width={30}
                  style={{ marginLeft: "10px", marginRight: 6 }}
                />
                Mail
              </Button>
            </ListItemText>
          </List>
          <Typography variant="h6">Community</Typography>
          <List>
            <Button
              href="https://www.facebook.com/profile.php?id=61553421364547"
              variant="text"
              sx={{ color: "white" }}
            >
              <img src={process.env.PUBLIC_URL + "/images/facebook.png"} width={30} />
              {/* Facebook */}
            </Button>
            <Button href="https://discord.gg/dWGY4BMd" variant="text" sx={{ color: "white" }}>
              <img src={process.env.PUBLIC_URL + "/images/discord.png"} width={30} />
              {/* Discord */}
            </Button>
            <Button href="https://www.twitch.tv/" variant="text" sx={{ color: "white" }}>
              <img src={process.env.PUBLIC_URL + "/images/twitch.png"} width={30} />
              {/* Twitch */}
            </Button>
          </List>
        </Grid>
      </Grid>
    </Footer>
  );
}
