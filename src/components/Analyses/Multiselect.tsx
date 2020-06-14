import React, { useState } from "react";
import { FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText } from "@material-ui/core";

interface MultiselectProps {
  elements: string[];
  label: string;
  updateSelectedValues: (values: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const Multiselect: React.FC<MultiselectProps> = ({ elements, label, updateSelectedValues }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const updatedValues = event.target.value as string[];
    setSelected(updatedValues);
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
        MenuProps={MenuProps}
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

