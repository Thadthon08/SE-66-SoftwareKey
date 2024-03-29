import React, { useState } from "react";
import { Form, Field, Formik, FormikProps } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { TextField } from "formik-material-ui";
import { Link, useNavigate } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { CreateProduct, GetCategory, GetManufacturer } from "../../../sevices/http/index";
import Swal from "sweetalert2";
import { CategoryInterface } from "../../../interfaces/ICategory";
import Select from "@mui/material/Select";
import { ManufacturerInterface } from "../../../interfaces/IManufacturer";
import { Content } from "antd/es/layout/layout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

export default function StockCreatePage() {
  const [category, setCategory] = React.useState<CategoryInterface[]>([]);
  const [manufacturer, setManufacturer] = React.useState<ManufacturerInterface[]>([]);
  const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null);
  const Navigate = useNavigate();

  const ProductInterface: any = {
    Name: "",
    Price: "",
    Desciption: "",
    CategoryID: "",
    ManufacturerID: "",
    Image: imageString,
  };

  const getCategory = async () => {
    let res = await GetCategory();
    console.log(res);
    if (res) {
      setCategory(res);
    }
  };
  const getManufacturer = async () => {
    let res = await GetManufacturer();
    console.log(res);
    if (res) {
      setManufacturer(res);
    }
  };

  React.useEffect(() => {
    getCategory();
    getManufacturer();
  }, []);

  const handleImageChange = (event: any) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Data = reader.result;
      setImageString(base64Data);
    };
    console.log(imageString);
  };

  const handleSubmit = async (values: ProductInterface) => {
    values.Image = imageString?.toString();
    values.AdminID = Number(localStorage.getItem("aid"));
    console.log(values.AdminID);
    let res = await CreateProduct(values);
    console.log(values);
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
        text: res.message,
        icon: "error",
        timer: 4000,
      });
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Content>
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <img src={process.env.PUBLIC_URL + "/images/dev5.png"} width="100%" />
          </Grid>
          <Grid item xs={6}>
            <Formik
              validate={(values) => {
                let err: any = {};
                if (!values.Name) err.Name = "กรุณากรอกชื่อ !";
                if (!values.Price) err.Price = "กรุณากรอกราคา !";
                if (!values.CategoryID) err.CategoryID = "กรุณาเลือกประเภท !";
                if (!values.ManufacturerID) err.ManufacturerID = "กรุณาบริษัทผู้ผลิต !";
                if (!imageString) err.imageString = "กรุณาอัปโหลดรูปภาพ !";
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
                      style={{ marginTop: 2 }}
                      fullWidth
                      component={TextField}
                      name="Name"
                      type="text"
                      label="Name"
                    />
                    <Field name="CategoryID">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          sx={{ width: 250, marginTop: 1.5 }}
                          error={form.touched.CategoryID && form.errors.CategoryID}
                        >
                          <InputLabel id="demo-simple-select-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category"
                            {...field}
                            onChange={(e: React.ChangeEvent<{ value: ProductInterface }>) =>
                              form.setFieldValue("CategoryID", e.target.value)
                            }
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 150,
                                },
                              },
                            }}
                          >
                            {category.map((item) => (
                              <MenuItem key={item?.ID} value={item?.ID}>
                                {item?.Name}
                              </MenuItem>
                            ))}
                          </Select>
                          {form.touched.CategoryID && form.errors.CategoryID ? (
                            <FormHelperText sx={{ fontSize: 12, padding: 0.2, color: "red" }}>
                              {form.errors.CategoryID}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>
                    <Field name="ManufacturerID">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          sx={{ width: 250, marginTop: 1.5, marginLeft: 2.2 }}
                          error={form.touched.ManufacturerID && form.errors.ManufacturerID}
                        >
                          <InputLabel id="demo-simple-select-label">Company</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="ManufacturerID"
                            label="Company"
                            {...field}
                            onChange={(e: React.ChangeEvent<{ value: ProductInterface }>) =>
                              form.setFieldValue("ManufacturerID", e.target.value)
                            }
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 150,
                                },
                              },
                            }}
                          >
                            {manufacturer.map((item) => (
                              <MenuItem key={item?.ID} value={item?.ID}>
                                {item?.Name}
                              </MenuItem>
                            ))}
                          </Select>
                          {form.touched.ManufacturerID && form.errors.ManufacturerID ? (
                            <FormHelperText sx={{ fontSize: 12, padding: 0.2, color: "red" }}>
                              {form.errors.ManufacturerID}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>
                    <Field
                      style={{ marginTop: 11 }}
                      fullWidth
                      component={TextField}
                      name="Price"
                      type="number"
                      label="Price"
                    />
                    <Field
                      style={{ marginTop: 11, color: "#000" }}
                      fullWidth
                      component={TextField}
                      multiline
                      maxRows={4}
                      name="Desciption"
                      type="text"
                      label="Desciption"
                    />
                    {imageString && (
                      <Grid item xs={1}>
                        <img src={`${imageString}`} height="120px" style={{ marginTop: 11 }} />
                      </Grid>
                    )}
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onChange={handleImageChange}
                      sx={{ marginTop: 1.5 }}
                    >
                      Upload Image
                      <VisuallyHiddenInput type="file" name="Image" />
                    </Button>
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
                    <Button
                      component={Link}
                      to="/stock"
                      variant="outlined"
                      fullWidth
                      sx={{ padding: 1.5, marginBottom: 2 }}
                    >
                      Cancle
                    </Button>
                  </CardActions>
                </Card>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Content>
  );
}
