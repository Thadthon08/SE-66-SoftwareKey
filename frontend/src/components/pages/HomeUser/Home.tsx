import * as React from "react";
import Carousels from "../../layouts/Carousel/Carousels";
import ShowProduct from "../../layouts/ShowProduct_HOME/ShowProduct";
import { Content } from "antd/es/layout/layout";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Content style={{ backgroundColor: "#242526" }}>
      <Carousels />
      <Container >
        <ShowProduct />
      </Container>
    </Content>
  );
}
