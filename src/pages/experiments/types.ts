import {
  Experiment,
  Solution,
  Specie,
  Sex,
  VisualizationProtocol,
  Reporter,
} from "../../utils/api/types";
import { StyleProps } from "./ExperimentsPage.jss";

export interface ExperimentData {
  Experiment: Experiment[];
  Specie: Specie[];
  Solution: Solution[];
  Sex: Sex[];
  VisualizationProtocol: VisualizationProtocol[];
  Reporter: Reporter[];
}

interface MatchParams {
  params: { filters: string };
}

export interface ExperimentRouteProps extends StyleProps {
  match: MatchParams;
}
