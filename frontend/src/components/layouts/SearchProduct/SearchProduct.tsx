import * as React from "react";
import { Autocomplete, InputAdornment, InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ProductInterface } from "../../../interfaces/IProduct";

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
