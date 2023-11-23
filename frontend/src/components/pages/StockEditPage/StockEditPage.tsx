import React, { useState } from "react";
import { FormikProps, Form, Field, Formik } from "formik";
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { Upload, Form as Formant } from "antd";
import { ImageUpload } from "../../../interfaces/IUpload";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "formik-material-ui";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetProductById, UpdateProduct } from "../../../sevices/http/index";

import Swal from "sweetalert2";

export default function StockEditPage() {
  const [picture, setPicture] = useState<ImageUpload>();
  const [product, setProduct] = useState<ProductInterface>();
  const Navigate = useNavigate();

  let { id } = useParams();

  const getProductById = async () => {
    let res = await GetProductById(Number(id));
    if (res) {
      setProduct(res);
    }
  };

  React.useEffect(() => {
    getProductById();
  }, []);

  const handleSubmit = async (values: ProductInterface) => {
    values.Image = picture?.thumbUrl;
    values.ID = id !== undefined ? Number.parseInt(id) : undefined;
    console.log(values);
    let res = await UpdateProduct(values);
    console.log(res);
    if (res.status) {
      Swal.fire({
        title: "Success",
        text: "แก้ไขสินค้าสำเร็จ !",
        showConfirmButton: false,
        icon: "success",
        timer: 2000,
      }).then((result) => {
        if (result) {
          Navigate("/stock");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "แก้ไขสินค้าไม่สำเร็จ !",
        showConfirmButton: false,
        icon: "error",
        timer: 2000,
      });
    }
  };
  const normImage = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setPicture(e?.fileList[0]);
    return e?.fileList;
  };

  const initialValues: ProductInterface = {
    ID: product?.ID,
    Name: product?.Name,
    Price: product?.Price,
    Desciption: product?.Desciption,
    Image: product?.Image,
  };
  return (
    <>
      {/* {console.log(JSON.stringify(getProductById()))} */}
      {console.log(product)}
      <Formik
        validate={(values) => {
          let err: any = {};
          if (!values.Name) err.Name = "กรุณากรอกชื่อ !";
          if (!values.Price) err.Price = "กรุณากรอกราคา !";
          if (!picture) err.picture = "กรุณาอัปโหลดรูปภาw !";
          return err;
        }}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <Card sx={{ width: 550, margin: "auto" }}>
            <CardContent sx={{ bgcolor: "#ffffff", borderRadius: 5 }}>
              <Typography gutterBottom variant="h3">
                Edit Product
              </Typography>
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="Name"
                type="text"
                label="Name"
                focused
              />
              <br />
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="Price"
                type="number"
                label="Price"
                focused
              />
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                focused
                component={TextField}
                multiline
                maxRows={4}
                name="Desciption"
                type="text"
                label="Desciption"
              />
              <Field name="Image">
                {() => (
                  <div style={{ marginTop: 16 }}>
                    <Upload maxCount={1} multiple={false} listType="picture-card" onChange={normImage}>
                      <div>
                        <AddIcon />
                        <div style={{ marginTop: 8 }}>อัพโหลดรูปภาพ</div>
                      </div>
                    </Upload>
                  </div>
                )}
              </Field>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: 1, marginBottom: 2, padding: 1.5 }}
              >
                Edit
              </Button>
              <Button component={Link} to="/stock" variant="outlined" fullWidth sx={{ padding: 1.5, marginBottom: 2 }}>
                Cancle
              </Button>
            </CardActions>
          </Card>
        </Form>
      </Formik>
    </>
  );
}
