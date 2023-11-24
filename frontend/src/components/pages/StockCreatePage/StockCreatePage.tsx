import React, { useState } from "react";
import { FormikProps, Form, Field, Formik } from "formik";
import { Schema } from "yup";
import { Box, Button, Card, CardActions, CardContent, Container, TextareaAutosize, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Upload, Form as Formant } from "antd";
import { ImageUpload } from "../../../interfaces/IUpload";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "formik-material-ui";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { CreateProduct } from "../../../sevices/http/index";
import Swal from "sweetalert2";

export default function StockCreatePage() {
  const [picture, setPicture] = useState<ImageUpload>();
  const Navigate = useNavigate();

  const ProductInterface: any = {
    Name: "",
    Price: "",
    Desciption: "",
  };

  const handleSubmit = async (values: ProductInterface) => {
    values.Image = picture?.thumbUrl;
    values.AdminID = Number(localStorage.getItem("aid")) || 1;
    console.log(values.AdminID);
    values.CategoryID = 1;
    let res = await CreateProduct(values);
    console.log(res);
    if (res.status) {
      Swal.fire({
        title: "Success",
        text: "เพิ่มสินค้าสำเร็จ !",
        icon: "success",
        timer: 4000,
      }).then((result) => {
        if (result) {
          Navigate("/stock");
        }
      });
    } else {
      Swal.fire({
        title: "ไม่สามารถเพิ่มสินค้าได้",
        text: " กรุณาตรวจสอบความถูกต้อง!",
        icon: "error",
        timer: 4000,
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

  return (
    <>
      <Formik
        validate={(values) => {
          let err: any = {};
          if (!values.Name) err.Name = "กรุณากรอกชื่อ !";
          if (!values.Price) err.Price = "กรุณากรอกราคา !";
          if (!picture) err.picture = "กรุณาอัปโหลดรูปภาw !";
          return err;
        }}
        initialValues={ProductInterface}
        onSubmit={handleSubmit}
      >
        <Form>
          <Card sx={{ width: 550, margin: "auto" }}>
            <CardContent sx={{ bgcolor: "#ffffff", borderRadius: 5 }}>
              <Typography gutterBottom variant="h3">
                Create Product
              </Typography>
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                // focused
                component={TextField}
                name="Name"
                type="text"
                label="Name"
              />
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                // focused
                component={TextField}
                name="Price"
                type="number"
                label="Price"
              />
              <Field
                style={{ marginTop: 16, color: "#000" }}
                fullWidth
                // focused
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
                Create
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
