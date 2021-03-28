import React from "react";
import axios from "axios";

import { TextField } from "@material-ui/core";

import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const filter = createFilterOptions();

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
];

const Search = () => {
  const [value, setValue] = React.useState(null);
  const [names, setNames] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (value && value.title && value.title !== "") {
      axios
        .get("http://localhost:5000/search/" + value.title)
        .then((response) => {
          setNames(response.data.names);
          setOptions(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [value]);

  // const fetchOptions = (keyword) => {
  //   axios.get('http://localhost:5000/search/' + keyword)
  //   .then(response => {
  //     setNames(response.data.names)
  //     setOptions(response.data.data)
  //     return response.data.data
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   })
  // }

  // return (
  //   <TextField onChange={handleSearchChange} value={search} />
  // )

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          // filtered.push({
          //   inputValue: params.inputValue,
          //   title: `Add "${params.inputValue}"`,
          // });

          filtered.push({
            inputValue: params.inputValue,
            title: `No results found`,
          });
        }
        console.log("filter", options, params);
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search..." variant="filled" />
      )}
    />
  );
};
export default Search;
