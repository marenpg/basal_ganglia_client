import { Analysis, DataType } from "../../utils/api/types";
import analysis from "../analysis";

export const getAnalysisOnSpecie = (specieId: string, analysesToFilter?: Analysis[]) => {
  return analysesToFilter ? analysesToFilter.filter(a => a.specimen.specie.id === specieId) : [];
}

export const getAnalysisOnRegions = (regionIds: string[], analysesToFilter?: Analysis[]) => {
  const filteredAnalysis: Analysis[] = [];
  analysesToFilter?.map(a => {
    const dataTypes: DataType[] = []
    a.quantitations.map(q => (dataTypes.push(q)));
    a.cellMorphologies.map(q => (dataTypes.push(q)));
    a.distributions.map(q => (dataTypes.push(q)));

    const filteredDataTypes = dataTypes.filter(d => regionIds.includes(d.regionRecord?.primaryRegion?.id) || regionIds.includes(d.regionRecord?.secondaryRegion?.id));
    if (!filteredDataTypes.length) return;
    
    filteredAnalysis.push({...a, dataTypes: filteredDataTypes});
  })
  return filteredAnalysis;
}

export const getAnalysisOnCellType = (cellTypeId: string, analysesToFilter?: Analysis[]) => {
  return analysesToFilter ? analysesToFilter.filter(a => a.cellTypePutative?.id === cellTypeId) : [];
}
