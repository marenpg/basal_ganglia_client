import React, { useState, useEffect } from "react";
import { Box, Typography, Slider, Mark } from "@material-ui/core";

import { getAgeMarks } from "./utils";


interface AgeSliderProps {
    ages: number[];
    updateAgeRange: (ageRange: number[]) => void;
}

export const AgeSlider: React.FC<AgeSliderProps> = ({ ages, updateAgeRange }) => {
    const [ageMarks, setAgeMarks] = useState<Mark[]>([]);
    const [minAge] = useState<number>(Math.min(...ages));
    const [maxAge] = useState<number>(Math.max(...ages));
    const [sliderValue, setSliderValue] = useState<number[]>([])

    useEffect(() => {
        setAgeMarks(getAgeMarks(ages));
        setSliderValue([minAge, maxAge])
    }, [ages, minAge, maxAge]);

    const handleSliderChange = (_: any, newValue: number | number[]) => {
        setSliderValue(newValue as number[]);
        updateAgeRange(newValue as number[]);
    };

    if (!ages) return <></>;

    return (
        <Box>
            <Typography id="age-slider" gutterBottom>
                {"Specimen age"}
            </Typography>
            <Slider
                value={sliderValue}
                aria-labelledby="age-slider"
                step={1}
                marks={ageMarks}
                min={minAge}
                max={maxAge}
                valueLabelDisplay="auto"
                onChange={handleSliderChange}
            />
        </Box>
    );
};
