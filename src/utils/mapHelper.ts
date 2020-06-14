import { Specie } from "./api/types";
import { SpeciesMap } from "./types";

export const generateSpeciesMap = (species: Specie[]): SpeciesMap => {
  const map: SpeciesMap = {};
  species.map((specie) => {
    map[specie.id] = { ...specie, selected: true };
  });
  return map;
};
