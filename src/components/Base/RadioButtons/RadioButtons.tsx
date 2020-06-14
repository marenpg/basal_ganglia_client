import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";
import { CheckBoxElement } from "../../../utils/types";

interface RadioButtonsProps {
  legend: string;
  value: string;
  elements: CheckBoxElement[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtons: React.FC<RadioButtonsProps> = ({ legend, value, elements, handleChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{legend}</FormLabel>
    <RadioGroup aria-label="species" value={value} onChange={handleChange} row>
      {elements && elements.map(element => (
        <FormControlLabel
          key={element.id}
          value={element.id}
          control={
            <Radio />
          }
          label={element.name}
        />
      ))}
    </RadioGroup>
  </FormControl>
);
