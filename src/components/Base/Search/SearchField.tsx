import React from "react";

import { TextField } from "@material-ui/core";
import { SearchFieldProps } from "./types";

export const SearchField: React.FC<SearchFieldProps> = ({ classes, searchValue, handleSearch, id, label }) => (
  <TextField
    id={id}
    label={label}
    fullWidth
    value={searchValue}
    onChange={handleSearch}
    margin="normal"
    variant="outlined"
    type="text"
    size="small"
    // InputLabelProps={{ shrink: true, className: classes.inputLabel }}
    InputLabelProps={{ shrink: true }}
    InputProps={{
      classes: {
        // root: classes.input,
        notchedOutline: classes.notchedOutline
      }
    }}
  />
);
