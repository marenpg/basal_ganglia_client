import {
  VisualizationProtocol,
  Analysis,
  Specie,
  Solution,
  Sex,
  Reporter,
  Strain,
  Substrain,
  CellType,
  AgeCategory,
} from "../utils/api/types";

export interface AnalysesData {
  Analysis: Analysis[];
  Specie: Specie[];
  Solution: Solution[];
  Sex: Sex[];
  VisualizationProtocol: VisualizationProtocol[];
  Reporter: Reporter[];
  Strain: Strain[];
  AgeCategory: AgeCategory[];
}

export interface AnalysisData {
  Analysis: Analysis[];
}

export interface CellTypeData {
  CellType: CellType[];
}
