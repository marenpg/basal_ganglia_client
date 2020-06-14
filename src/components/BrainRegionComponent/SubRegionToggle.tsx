import React from "react";
import { FormControl, FormGroup, Switch, FormControlLabel } from "@material-ui/core";

interface SubRegionToggleProps {
    subRegionsSelected: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SubRegionToggle: React.FC<SubRegionToggleProps> = ({ subRegionsSelected, handleChange }
) => (
        <FormControl component="fieldset">
            <FormGroup aria-label="Show information about sub regions" row>
                <FormControlLabel
                    value="true"
                    control={
                        <Switch
                            color="primary"
                            checked={subRegionsSelected}
                            onChange={handleChange}
                            name="subRegions"
                        />
                    }
                    label="Show information about sub regions"
                    labelPlacement="start"
                />
            </FormGroup>
        </FormControl>
    );