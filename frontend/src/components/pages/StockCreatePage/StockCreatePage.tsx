import React, { useState } from "react";
import { Form, Field, Formik, FormikProps } from "formik";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { Upload } from "antd";
import { ImageUpload } from "../../../interfaces/IUpload";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "formik-material-ui";
import { Link, useNavigate } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import { CreateProduct, GetCategory } from "../../../sevices/http/index";
import Swal from "sweetalert2";
import { CategoryInterface } from "../../../interfaces/ICategory";
import Select from "@mui/material/Select";

export default function StockCreatePage() {
  const [picture, setPicture] = useState<ImageUpload>();
  const [category, setCategory] = React.useState<CategoryInterface[]>([]);
  const Navigate = useNavigate();

  const ProductInterface: any = {
    Name: "",
    Price: "",
    Desciption: "",
    CategoryID: "",
  };

  const getCategory = async () => {
    let res = await GetCategory();
    console.log(res);
    if (res) {
      setCategory(res);
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (values: ProductInterface) => {
    values.Image = picture?.thumbUrl;
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
          if (!values.CategoryID) err.CategoryID = "กรุณาเลือกประเภท !";
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
              <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="Name" type="text" label="Name" />
              <Field name="CategoryID">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    sx={{ width: 250, marginTop: 2 }}
                    error={form.touched.CategoryID && form.errors.CategoryID}
                  >
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      {...field}
                      onChange={(e: React.ChangeEvent<{ value: any }>) =>
                        form.setFieldValue("CategoryID", e.target.value)
                      }
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
              <Field
                style={{ marginTop: 16, marginLeft: 16, width: 250 }}
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
