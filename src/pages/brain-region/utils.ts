import { BrainRegion } from "../../utils/api/types";

type BrainRegionMap = { [key: string]: BrainRegion };

const getSubRegionIdsRecursive = (id: string, regionsMap: BrainRegionMap) => {
  let ids = [{ id: id }];
  const node = regionsMap[id];

  if (node.subRegions.length) {
    node.subRegions.map((subRegion) => {
      ids = ids.concat(getSubRegionIdsRecursive(subRegion.id, regionsMap));
    });
  }
  return ids;
};

export const getSubRegionIds = (id: string, allRegions: BrainRegion[]) => {
  const mappedRegions: BrainRegionMap = {};

  allRegions.map((elem) => {
    mappedRegions[elem.id] = elem;
  });

  return getSubRegionIdsRecursive(id, mappedRegions);
};

const getSubregionsHelper = (
  region: BrainRegion,
  subRegions: BrainRegion[],
  map: { [key: string]: BrainRegion }
) => {
  region.subRegions.map((r) => {
    const child = map[r.id];
    if (child.subRegions) {
      getSubregionsHelper(child, subRegions, map);
    }
    subRegions.push(child);
  });
  return subRegions;
};

export const getAllSubRegions = (
  region: BrainRegion,
  allRegions: BrainRegion[]
): BrainRegion[] => {
  const subRegions: BrainRegion[] = [];
  const map: { [key: string]: BrainRegion } = {};
  allRegions.map((region) => {
    map[region.id] = region;
  });
  return getSubregionsHelper(region, subRegions, map);
};
