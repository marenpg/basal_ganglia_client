import gql from "graphql-tag";

export const GET_BRAIN_REGIONS = gql`
  {
    BrainRegion {
      id
      name
      partOf {
        id
      }
      cellsObserved {
        id
      }
      subRegions {
        id
      }
      specie {
        id
        name
      }
      experiments {
        id
        name
        analyses {
          dataType
        }
      }
    }
    Specie {
      id
      name
    }
    CellClass {
      id
      name
      ontology
      groupMembership {
        id
      }
    }
    CellGroup {
      id
      name
      ontology
    }
    CellType {
      id
      name
      ontology
      classMembership {
        id
      }
    }
  }
`;

export const GET_BRAIN_REGION_IDS = gql`
  query brainRegionsAndSpecieQuery {
    BrainRegion {
      id
      subRegions {
        id
      }
    }
    Specie {
      id
      name
    }
  }
`;

export const GET_BRAIN_REGIONS_BY_IDS = gql`
  query brainRegionsByIdsQuery($filter: _BrainRegionFilter) {
    BrainRegion(filter: $filter) {
      id
      name
      abbreviation
      cellsObserved {
        id
        name
        ontology
      }
      specie {
        id
        name
      }
      experiments {
        id
        name
        analyses {
          dataType
        }
      }
    }
  }
`;
