import { StyleProps } from "./BrainRegionRoute.jss";
import {
  BrainRegion,
  Specie,
  CellClass,
  CellType,
  CellGroup,
} from "../../utils/api/types";

interface MatchParams {
  params: { id: string };
}
// Might not work: https://stackoverflow.com/questions/48138111/what-typescript-type-should-i-use-to-reference-the-match-object-in-my-props
export interface BrainRegionRouteProps extends StyleProps {
  match: MatchParams;
}

export interface BrainRegionRouteInnerProps extends StyleProps {
  allRegionIds: BrainRegion[];
  id: string;
}

export interface BrainRegionData {
  BrainRegion: BrainRegion[];
  CellType: CellType[];
  CellClass: CellClass[];
  CellGroup: CellGroup[];
}

export interface BrainRegionIdAndSpecieData {
  BrainRegion: BrainRegion[];
  Specie: Specie[];
}

export interface BrainRegionConnectionData {
  BrainRegion: BrainRegion[];
}
