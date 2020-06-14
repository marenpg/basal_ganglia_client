import { BrainRegion } from "../../../utils/api/types";

export interface CustomTreeViewProps {
    nodes: BrainRegion[]; 
    expandedIds: string[]; 
    handleTreeClick: any;
}

export interface TreeNodesProps {
    label: string;
    subRegions: BrainRegion[];
    nodeId: string;
    handleTreeClick: any;
}

export interface StyledTreeItemProps {
    label: string;
    nodeId: string;
}

export interface TransitionComponentProps {
    in: boolean;
}