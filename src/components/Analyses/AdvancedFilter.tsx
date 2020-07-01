import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Divider, ExpansionPanelActions, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { AnalysesContext } from "../../providers/contexts";
import { Analysis, Substrain } from "../../utils/api/types";
import { CheckBoxElement } from "../../utils/types";

import Checkboxes from "../Base/Checkboxes";

import { getFilteredAnalyses } from "./utils";
import { Multiselect } from "./Multiselect";
import { getStringRep } from "../Analysis/utils";

interface AdvancedFilterProps {
  analyses: Analysis[];
  selectedSpecieIds: string[];
  handleFilteredAnalysesChange: any;
  handleClearFilter: any;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ analyses, selectedSpecieIds, handleFilteredAnalysesChange, handleClearFilter }) => {
  const [allAnalyses, setAllAnalyses] = useState<Analysis[]>([]);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [dataTypeCheckboxes, setDataTypeCheckboxes] = useState<CheckBoxElement[]>([]);
  const [sexCheckboxes, setSexCheckboxes] = useState<CheckBoxElement[]>([]);

  const [animalStatuses, setAnimalStatuses] = useState<string[]>([]);
  const [selecedAnimalStatuses, setSelectedAnimalStatuses] = useState<string[]>([]);
  const [selectedVisualizationMethods, setSelectedVisualizationMethods] = useState<string[]>([]);
  const [selectedReporters, setSelectedReporters] = useState<string[]>([]);
  const [selectedStrains, setSelectedStrains] = useState<string[]>([]);
  const [substrains, setSubstrains] = useState<Substrain[]>([]);
  const [selectedSubstrains, setSelectedSubstrains] = useState<string[]>([]);
  const [selectedAgeCategories, setSelectedAgeCategories] = useState<string[]>([]);

  const { sex, visualizationMethods, reporters, strains, ageCategories, filters } = useContext(AnalysesContext); // TODO: Use these to make checkbox/filterss

  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!analyses?.length) return;
    clearAllSelected();
    setAllAnalyses(analyses);
    setDataTypeCheckboxes([...new Set(analyses.map(a => a.dataType))].map((d, i) => ({ id: i, name: d, selected: true })));

    const allAnimalStatuses = [...new Set(analyses.map(a => a.experiment?.animalStatus))].filter(a => a != null).sort();
    setAnimalStatuses(allAnimalStatuses);

    if (!mounted.current) {
      if (filters?.rrids) {
        setSelectedReporters(filters.rrids);
        const filteredAnalyses = getFilteredAnalyses(
          analyses, undefined, undefined, [], [], [], filters.rrids);
        handleFilteredAnalysesChange(filteredAnalyses);
        setExpanded(true);
      }
      mounted.current = true;
    }

  }, [analyses, selectedSpecieIds, filters]);

  useEffect(() => {
    sex && setSexCheckboxes(sex.map(s => ({ ...s, selected: true })));
  }, [sex, analyses]);

  useEffect(() => {
    if (!strains || !selectedStrains.length) return;

    const selectedStrainObjects = strains.filter(s => selectedStrains.includes(s.name));
    let updatedSubstrains: Substrain[] = [];
    selectedStrainObjects.map(s => {
      updatedSubstrains = updatedSubstrains.concat(s.substrains);
    })
    setSelectedSubstrains(selectedSubstrains.filter(s => updatedSubstrains.map(u => u.name).includes(s)))
    setSubstrains(updatedSubstrains)
  }, [selectedStrains, strains])

  const handleChange = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const clearAllSelected = () => {
    setDataTypeCheckboxes(dataTypeCheckboxes.map(box => ({ ...box, selected: true })))
    setSexCheckboxes(sexCheckboxes.map(box => ({ ...box, selected: true })))
    setSelectedAnimalStatuses([]);
    setSelectedVisualizationMethods([]);
    setSelectedReporters([]);
    setSelectedStrains([]);
    setSelectedSubstrains([]);
    setSelectedAgeCategories([]);
  }

  const handleFilterAnalyses = () => {
    setExpanded(false);
    const filteredAnalyses = getFilteredAnalyses(
      allAnalyses,
      dataTypeCheckboxes,
      sexCheckboxes,
      selectedAgeCategories,
      selecedAnimalStatuses,
      selectedVisualizationMethods,
      selectedReporters,
      selectedStrains,
      selectedSubstrains
    );
    handleFilteredAnalysesChange(filteredAnalyses);
  }

  const handleClearAllFields = () => {
    clearAllSelected();
    handleClearFilter();
  }

  const updateCheckboxes = (checkBoxId: string | number, checkBoxes: CheckBoxElement[]) => {
    return checkBoxes.map(box => {
      if (box.id === checkBoxId) {
        box.selected = !box.selected;
      }
      return box;
    });
  }

  const handleCheckboxChange = (checkboxes: CheckBoxElement[], setCheckboxes: any) => (checkBoxId: number | string) => () => {
    const updatedCheckboxes = updateCheckboxes(checkBoxId, checkboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const handleMultiselectChange = (setElements: any) => (newValues: string[]) => {
    setElements(newValues);
  }

  return (
    <ExpansionPanel expanded={expanded} onChange={handleChange}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Advanced search</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box display="flex" justifyContent="flex-start" flexDirection="column" width="100%">
          <Checkboxes
            legend="Data types"
            elements={dataTypeCheckboxes}
            handleChange={handleCheckboxChange(dataTypeCheckboxes, setDataTypeCheckboxes)}
          />
          <Checkboxes
            legend="Sex"
            elements={sexCheckboxes}
            handleChange={handleCheckboxChange(sexCheckboxes, setSexCheckboxes)}
          />
          {strains &&
            <Box display="flex" justifyContent="flex-start" flexDirection="row">

              <Box pr={2} width="100%" maxWidth="300px">
                <Multiselect label="Strains" elements={strains.filter(x => selectedSpecieIds.includes(x.comesFrom.id)).map(v => v.name).filter(r => r != null).sort()} selected={selectedStrains} updateSelectedValues={handleMultiselectChange(setSelectedStrains)} />
              </Box>

              {strains.length > 0 && substrains.length > 0 &&
                <Multiselect label="Substrains" elements={substrains.map(v => v.name).sort()} selected={selectedSubstrains} updateSelectedValues={handleMultiselectChange(setSelectedSubstrains)} />
              }
            </Box>
          }
          {animalStatuses &&
            <Multiselect label="Animal status" elements={animalStatuses} selected={selecedAnimalStatuses} updateSelectedValues={handleMultiselectChange(setSelectedAnimalStatuses)} />
          }
          {ageCategories &&
            <Multiselect label="Age categories" selected={selectedAgeCategories} elements={ageCategories.filter(x => selectedSpecieIds.includes(x.specie.id)).map(x => getStringRep(x.name, x.description) ?? "")} updateSelectedValues={handleMultiselectChange(setSelectedAgeCategories)} />
          }
          {visualizationMethods &&
            <Multiselect label="Visualization methods" selected={selectedVisualizationMethods} elements={visualizationMethods.map(v => v.name)} updateSelectedValues={handleMultiselectChange(setSelectedVisualizationMethods)} />
          }

          {reporters &&
            <Multiselect label="Antibodies" selected={selectedReporters} elements={reporters.map(v => v.rrid).filter(r => r != null && r.indexOf("RRID") === 0).sort()} updateSelectedValues={handleMultiselectChange(setSelectedReporters)} />
          }
        </Box>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary" onClick={handleClearAllFields}>
          Clear filter
          </Button>
        <Button size="small" color="primary" onClick={handleFilterAnalyses}>
          Apply filter
          </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};
