import { BamsRegion, BrainRegion } from "../../../utils/api/types";
import { CheckBoxElement } from "../../../utils/types";

export const connectivityCheckboxes: CheckBoxElement[] = [
  {
    id: 0,
    selected: true,
    name: "Efferent",
  },
  {
    id: 1,
    selected: true,
    name: "Afferent",
  },
];

export const relationTypeCheckboxes: CheckBoxElement[] = [
  {
    id: 0,
    selected: true,
    name: "Does not exist",
  },
  {
    id: 1,
    selected: true,
    name: "Very weak",
  },
  {
    id: 2,
    selected: true,
    name: "Weak",
  },
  {
    id: 3,
    selected: true,
    name: "Moderate",
  },
  {
    id: 4,
    selected: true,
    name: "Moderate/strong",
  },
  {
    id: 5,
    selected: true,
    name: "Strong",
  },
  {
    id: 6,
    selected: true,
    name: "Very strong",
  },
];

export const connectivityTableHeaders = [
  { text: "Direction", val: "direction" },
  { text: "Brain region", val: "region" },
  { text: "Strength", val: "strength" },
  { text: "Technique", val: "technique" },
];

export interface BrainRegionConnectionsProps {
  connectivity: RegionConnectivity[];
}

export type TableOrders = "direction" | "region" | "strength" | "technique";

export interface RegionConnectivity {
  id: string;
  name: string;
  mappingStrengthFrom: string;
  mappingStrengthTo: string;
  bamsRegionFrom: BamsRegion;
  bamsRegionTo: BamsRegion;
  connectedRegion: BrainRegion;
  direction: "efferent" | "afferent";
  strength: string;
  technique: string;
  description: string;
  reference: string;
}
