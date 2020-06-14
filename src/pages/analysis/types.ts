import { StyleProps } from "./AnalysisPage.jss";

interface MatchParams {
  params: { id: string; dataId: string };
}
export interface AnalysisRouteProps extends StyleProps {
  match: MatchParams;
}
