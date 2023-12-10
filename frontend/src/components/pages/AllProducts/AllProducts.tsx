import React from "react";
import ShowProduct from "../../layouts/ShowProduct_HOME/ShowProduct";
import { Breadcrumbs, Container, CssBaseline, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessSharpIcon from "@mui/icons-material/AddBusinessSharp";
import { Content } from "antd/es/layout/layout";
export default function AllProducts() {
  return (
    <Content style={{ backgroundColor: "#242526" }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ padding: 5 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
          <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography sx={{ display: "flex", alignItems: "center" }} color="#eab308">
            <AddBusinessSharpIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            สินค้าทั้งหมด
          </Typography>
        </Breadcrumbs>
        <ShowProduct />
      </Container>
    </Content>
  );
}
