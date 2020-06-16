import React, { useState } from "react";
import { FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText } from "@material-ui/core";

interface MultiselectProps {
  elements: string[];
  selected: string[];
  label: string;
  updateSelectedValues: (values: string[]) => void;
}

export const Multiselect: React.FC<MultiselectProps> = ({ elements, selected, label, updateSelectedValues }) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const updatedValues = event.target.value as string[];
    updateSelectedValues(updatedValues);
  };

  if (!elements) return <></>;

  return (
    <FormControl style={{ maxWidth: "300px", width: "100%" }}>
      <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {elements.map((element) => (
          <MenuItem key={element} value={element}>
            <Checkbox checked={selected.indexOf(element) > -1} />
            <ListItemText primary={element} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

