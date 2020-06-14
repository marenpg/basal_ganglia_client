import React from "react";
import { AnalysesContextValue, AnalysisContextValue, CellTypesAndSpecieData, BrainRegionSpecieCellData, BrainRegionContextValue, ExperimentsContextValue, ExperimentContextValue, CellTypeContextValue } from "./types";

export const BrainRegionsDataContext = React.createContext<Partial<BrainRegionSpecieCellData>>({});
export const BrainRegionDataContext = React.createContext<Partial<BrainRegionContextValue>>({});
export const CellTypesDataContext = React.createContext<Partial<CellTypesAndSpecieData>>({});
export const ExperimentsContext = React.createContext<Partial<ExperimentsContextValue>>({});
export const ExperimentContext = React.createContext<Partial<ExperimentContextValue>>({});

export const AnalysesContext = React.createContext<Partial<AnalysesContextValue>>({});
export const AnalysisContext = React.createContext<Partial<AnalysisContextValue>>({});

export const CellTypeContext = React.createContext<Partial<CellTypeContextValue>>({});