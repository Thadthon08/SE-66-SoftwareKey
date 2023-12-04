import React, { useEffect } from "react";
import { DataGrid, GridToolbarQuickFilter, GridValueGetterParams } from "@mui/x-data-grid";
import { Typography, Box, Button, Toolbar, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { ProductInterface } from "../../../interfaces/IProduct";
import { DeleteProductByID, GetProduct } from "../../../sevices/http/index";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import { NumericFormat } from "react-number-format";
import Moment from "react-moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function StockPage() {
  const Navigate = useNavigate();
  const [product, setProduct] = React.useState<ProductInterface[]>([]);

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 2,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  const stockColumns: GridColDef[] = [
    {
      headerName: "ID",
      field: "ID",
      width: 60,
    },
    {
      headerName: "IMAGE",
      field: "Image",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <img src={value} style={{ width: 70, height: 70, borderRadius: "5%" }} />
      ),
    },
    {
      headerName: "NAME",
      field: "Name",
      width: 380,
    },
    {
      headerName: "STOCK",
      width: 150,
      field: "KeyCount",
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
          />
        </Typography>
      ),
    },
    {
      headerName: "PRICE",
      field: "Price",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<Number>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "TIME",
      field: "CreatedAt",
      width: 160,
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              let timerInterval: any;
              Swal.fire({
                title: "Please wait",
                text: "System is going to the edit page !",
                icon: "warning",
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then(() => {
                window.location.href = "/stock/edit/" + row.ID;
              });
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  let res = await DeleteProductByID(row.ID);
                  if (res.status) {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success",
                    });
                  }
                  getProduct();
                }
              });
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const getProduct = async () => {
    let res = await GetProduct();
    if (res) {
      setProduct(res);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "#ffff",
            marginBottom: 2,
            textShadow: "1px 2px 6px #121212, 0 0 1em #FFFF, 0 0 0.5em #404040",
          }}
        >
          Products
        </Typography>
        <Box
          sx={{
            width: "100%",
            background: "#FFFF",
            borderRadius: 3,
            boxShadow: "0 0 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Button variant="contained" onClick={() => Navigate("/stock/create")}>
              <AddIcon />
              <Typography variant="h6" component="div">
                ADDPRODUCT
              </Typography>
            </Button>
            <DataGrid
              sx={{
                // height: "70vh", fdfd
                marginTop: 2,
              }}
              slots={{ toolbar: QuickSearchToolbar }}
              rows={product}
              rowHeight={75}
              autoHeight={true}
              getRowId={(rows) => rows.ID}
              columns={stockColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
