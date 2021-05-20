import React from "react";
import axios from "axios";

import { TextField } from "@material-ui/core";

import { Link } from "react-router-dom";

import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const filter = createFilterOptions;

const Search = () => {
  const [value, setValue] = React.useState('');
  const [lastSearch, setLastSearch] = React.useState('');
  const [names, setNames] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if ( value.length > 3 && !loading && (lastSearch !== value || lastSearch === "")) {
      console.log('running!')
      setLoading(true)
      axios
        .get("http://localhost:5000/search/" + value)
        .then((response) => {
          setNames(response.data.names);

          const flattenedArr = Array.prototype.concat.apply([], response.data.data)
          let result = []
          response.data.data.map((item, i) => {
            item.map((subItem, j) => {
              console.log('yeehaw', response.data.names[i])
              result.push({type: response.data.names[i], ...subItem})
            })
          })
          console.log('here!', result)
          setLastSearch(value)
          setOptions(result);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)

        });
    }
  }, [value, setLoading, loading]);

  const getLinkURL = (type, id) => {
    switch(type) {
      case 'notes':
        return `/note/${id}`
      case 'symptom':
        return `/Symptom`
      default: 
      return `/view/${id}`
    }
  }

  return (
    <Autocomplete
      value={value}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        console.log('option', option)
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        if(option.title && option.title !== "") return option.title
        // Regular option
        return option.symptom;
      }}
      renderOption={(option) => <Link to={getLinkURL(option.type, option._id)}>{option.title ? option.title : option.symptom}</Link>}
      className="searchWidth"  
      onInputChange={(event, value) => {

        setValue(value)
      }}

      renderInput={(params) => (
        <TextField {...params} label="Search..." variant="filled"  />
      )}
    />
  );
};
export default Search;
