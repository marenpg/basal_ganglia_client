import { Experiment } from "../../utils/api/types";

export interface ExperimentInformationProps {
  experiments: Experiment[];
}

export type ExperimentWithDataTypes = Experiment & {
  dataTypes: string[];
  dataTypesFormatted: string;
};

export type TableSort = "name" | "dataType" | "strain" | "substrain" | "sex";
