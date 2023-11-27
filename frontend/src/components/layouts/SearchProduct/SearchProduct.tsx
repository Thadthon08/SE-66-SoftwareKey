import * as React from "react";
import { Autocomplete, InputAdornment, InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ProductInterface } from "../../../interfaces/IProduct";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function Searchs() {
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ProductInterface[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`http://localhost:8080/search?query=${query}`);
        console.log(response);
        let res = await response.json();
        console.log(res);
        setSearchResults(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (query !== "") {
      fetchData();
    }
  }, [query]);
  return (
    <>
      <Autocomplete
        size="small"
        sx={{ marginLeft: 3 }}
        options={searchResults.map((searchResults) => searchResults.Name)}
        renderInput={(params) => (
          <div>
            <TextField
              {...params}
              placeholder="Search..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "white", marginLeft: "0.5em" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                background: "rgba(64,64,64,0.64)",
                border: "0px solid black",
                borderRadius: 1,
                width: 400,
                boxSizing: "content-box",
                "&:hover": { background: "rgba(64, 64, 64)" },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />
          </div>
        )}
      />
    </>
  );
}
