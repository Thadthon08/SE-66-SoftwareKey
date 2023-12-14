import React, { useState } from "react";
import { Form, Field, Formik, FormikProps } from "formik";
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
import { Upload } from "antd";
import { ImageUpload } from "../../../interfaces/IUpload";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "formik-material-ui";
import { Link, useNavigate } from "react-router-dom";
import { KeysoftwareInterface } from "../../../interfaces/IKeysoftware";
import { CreateKeysoftware, GetProduct } from "../../../sevices/http/index";
import Swal from "sweetalert2";
import { CategoryInterface } from "../../../interfaces/ICategory";
import Select from "@mui/material/Select";
import { ProductInterface } from "../../../interfaces/IProduct";
import { Content } from "antd/es/layout/layout";

export default function SoftwareKeyCreate() {
  const [product, setProduct] = React.useState<ProductInterface[]>([]);
  const Navigate = useNavigate();

  const KeysoftwareInterface: any = {
    Key: "",
    ProductID: "",
  };

  const getProduct = async () => {
    let res = await GetProduct();
    console.log(res);
    if (res) {
      setProduct(res);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  const handleSubmit = async (values: KeysoftwareInterface) => {
    let res = await CreateKeysoftware(values);
    console.log(values);
    if (res.status) {
      Swal.fire({
        title: "Success",
        text: "เพิ่มคีย์สินค้าสำเร็จ !",
        icon: "success",
        timer: 4000,
      }).then((result) => {
        if (result) {
          Navigate("/key");
        }
      });
    } else {
      Swal.fire({
        title: "ไม่สามารถเพิ่มคีย์สินค้าได้",
        text: " กรุณาตรวจสอบความถูกต้อง!",
        icon: "error",
        timer: 4000,
      });
    }
  };

  return (
    <Content>
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <img src={process.env.PUBLIC_URL + "/images/dev1.png"} width="100%" />
          </Grid>
          <Grid item xs={6}>
            <Formik
              validate={(values) => {
                let err: any = {};
                if (!values.Key) err.Key = "กรุณากรอกคีย์ !";
                if (!values.ProductID) err.ProductID = "กรุณาเลือกสินค้า !";
                return err;
              }}
              initialValues={KeysoftwareInterface}
              onSubmit={handleSubmit}
            >
              <Form>
                <Card sx={{ width: 550, margin: "auto", marginTop: "100px" }}>
                  <CardContent sx={{ bgcolor: "#ffffff", borderRadius: 5 }}>
                    <Typography gutterBottom variant="h3">
                      Create Keysoftware
                    </Typography>
                    <Field name="ProductID">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl fullWidth error={form.touched.ProductID && form.errors.ProductID}>
                          <InputLabel id="demo-simple-select-label">Product</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Product"
                            {...field}
                            onChange={(e: React.ChangeEvent<{ value: any }>) =>
                              form.setFieldValue("ProductID", e.target.value)
                            }
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 200,
                                },
                              },
                            }}
                          >
                            {product.map((item) => (
                              <MenuItem key={item?.ID} value={item?.ID}>
                                {item?.Name}
                              </MenuItem>
                            ))}
                          </Select>
                          {form.touched.ProductID && form.errors.ProductID ? (
                            <FormHelperText sx={{ fontSize: 12, padding: 0.2, color: "red" }}>
                              {form.errors.ProductID}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field
                      fullWidth
                      sx={{ marginTop: 2 }}
                      component={TextField}
                      name="Key"
                      type="text"
                      label="Keysoftware"
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ marginRight: 1, marginBottom: 1, padding: 1.5 }}
                    >
                      Create
                    </Button>
                    <Button
                      component={Link}
                      to="/key"
                      variant="outlined"
                      fullWidth
                      sx={{ padding: 1.5, marginBottom: 1 }}
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
