import { StyleProps } from "./CellTypePage.jss";

interface MatchParams {
  params: { id: string };
}
export interface CellTypeRouteProps extends StyleProps {
  match: MatchParams;
}
