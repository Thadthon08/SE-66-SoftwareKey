import React, { useState } from "react";
import { FormikProps, Form, Field, Formik } from "formik";
import {
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { GetCategory, GetManufacturer, GetProductById, UpdateProduct } from "../../../sevices/http/index";
import { CategoryInterface } from "../../../interfaces/ICategory";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import { ManufacturerInterface } from "../../../interfaces/IManufacturer";
import { Content } from "antd/es/layout/layout";
import { styled } from "@mui/material/styles";

export default function StockEditPage() {
  const [product, setProduct] = useState<ProductInterface>();
  const [category, setCategory] = React.useState<CategoryInterface[]>([]);
  const [manufacturer, setManufacturer] = React.useState<ManufacturerInterface[]>([]);
  const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null);
  const Navigate = useNavigate();

  let { id } = useParams();

  const getProductById = async () => {
    let res = await GetProductById(Number(id));
    console.log(res);
    if (res) {
      setProduct(res);
      setImageString(res.Image);
    }
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
    getProductById();
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

  const initialValues: ProductInterface = {
    ID: product?.ID,
    Name: product?.Name,
    Price: product?.Price,
    Desciption: product?.Desciption,
    CategoryID: product?.CategoryID,
    ManufacturerID: product?.ManufacturerID,
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
            <img src={process.env.PUBLIC_URL + "/images/seckey.png"} width="100%" />
          </Grid>
          <Grid item xs={6}>
            <Formik
              validate={(values) => {
                let err: any = {};
                if (!values.Name) err.Name = "กรุณากรอกชื่อ !";
                if (!values.Price) err.Price = "กรุณากรอกราคา !";
                if (!imageString) err.imageString = "กรุณาอัปโหลดรูปภาw !";
                if (!values.CategoryID) err.CategoryID = "กรุณาเลือกประเภท !";
                if (!values.ManufacturerID) err.ManufacturerID = "กรุณาบริษัทผู้ผลิต !";
                {
                  console.log(values.CategoryID);
                }
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
                      style={{ marginTop: 11 }}
                      fullWidth
                      component={TextField}
                      name="Name"
                      type="text"
                      label="Name"
                      focused
                    />
                    <Field name="CategoryID">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          focused
                          sx={{ width: 250, marginTop: 2 }}
                          error={form.touched.CategoryID && form.errors.CategoryID}
                        >
                          <InputLabel id="demo-simple-select-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category"
                            {...field}
                            sx={{
                              "& .MuiSelect-root": {
                                borderColor: "black",
                              },
                            }}
                            value={field.value || ""}
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
                          focused
                          sx={{ width: 250, marginTop: 2, marginLeft: 2.2 }}
                          error={form.touched.ManufacturerID && form.errors.ManufacturerID}
                        >
                          <InputLabel id="demo-simple-select-label">Company</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Company"
                            {...field}
                            sx={{
                              "& .MuiSelect-root": {
                                borderColor: "black",
                              },
                            }}
                            value={field.value || ""}
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
                      <VisuallyHiddenInput type="file" />
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
                      Edit
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
