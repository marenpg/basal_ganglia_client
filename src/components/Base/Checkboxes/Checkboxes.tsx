import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { CheckBoxElement } from "../../../utils/types";

interface CheckboxesProps {
  legend: string;
  elements: CheckBoxElement[];
  handleChange: (id: any) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkboxes: React.FC<CheckboxesProps> = ({ legend, elements, handleChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{legend}</FormLabel>
    <FormGroup row>
      {elements ? elements.map(element => (
        <FormControlLabel
          key={element.id}
          control={
            <Checkbox
              checked={element.selected}
              onChange={handleChange(element.id)}
              name={element.name}
            />
          }
          label={element.name}
        />
      )) : null}
    </FormGroup>
  </FormControl>
);
