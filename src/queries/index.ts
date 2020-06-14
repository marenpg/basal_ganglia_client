import {
  GET_BRAIN_REGIONS as q1,
  GET_BRAIN_REGION_IDS as q2,
  GET_BRAIN_REGIONS_BY_IDS as q3,
} from "./brain-region-queries";

import { GET_CELL_TYPES as cell_query1 } from "./cell-type-queries";

import { GET_EXPERIMENTS as eq1 } from "./experiment-queries";

export const GET_BRAIN_REGIONS = q1;
export const GET_BRAIN_REGION_IDS = q2;
export const GET_BRAIN_REGIONS_BY_IDS = q3;

export const GET_CELL_TYPES = cell_query1;

export const GET_EXPERIMENTS = eq1;
