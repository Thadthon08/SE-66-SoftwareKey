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
import { Link, useNavigate, useParams } from "react-router-dom";
import { KeysoftwareInterface } from "../../../interfaces/IKeysoftware";
import { CreateKeysoftware, GetKeysoftwareById, GetProduct, UpdateKeysoftware } from "../../../sevices/http/index";
import Swal from "sweetalert2";
import { CategoryInterface } from "../../../interfaces/ICategory";
import Select from "@mui/material/Select";
import { ProductInterface } from "../../../interfaces/IProduct";

export default function SoftwareKeyEit() {
  const [product, setProduct] = React.useState<ProductInterface[]>([]);
  const [key, setKey] = React.useState<KeysoftwareInterface>();
  const Navigate = useNavigate();

  let { id } = useParams();

  const getKeysoftwareById = async () => {
    let res = await GetKeysoftwareById(Number(id));
    if (res) {
      setKey(res);
    }
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
    getKeysoftwareById();
  }, []);

  const handleSubmit = async (values: KeysoftwareInterface) => {
    values.ID = Number(id);
    let res = await UpdateKeysoftware(values);
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
  const initialValues: KeysoftwareInterface = {
    ID: key?.ID,
    Key: key?.Key,
    Status_Key: key?.Status_Key,
    ProductID: key?.ProductID,
  };

  return (
    <>
      <Formik
        validate={(values) => {
          let err: any = {};
          if (!values.Key) err.Key = "กรุณากรอกคีย์ !";
          if (!values.ProductID) err.ProductID = "กรุณาเลือกสินค้า !";
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
                Edit Keysoftware
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
                      value={field.value || ""}
                      onChange={(e: React.ChangeEvent<{ value: any }>) =>
                        form.setFieldValue("ProductID", e.target.value)
                      }
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
                focused
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
                Edit
              </Button>
              <Button component={Link} to="/key" variant="outlined" fullWidth sx={{ padding: 1.5, marginBottom: 1 }}>
                Cancle
              </Button>
            </CardActions>
          </Card>
        </Form>
      </Formik>
    </>
  );
}
