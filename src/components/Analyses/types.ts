import { Experiment } from "../../utils/api/types";

export interface ExperimentInformationProps {
  experiments: Experiment[];
}

export type TableSort = "name" | "dataType" | "strain" | "substrain" | "sex";
