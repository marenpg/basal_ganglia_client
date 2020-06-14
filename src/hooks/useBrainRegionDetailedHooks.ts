import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const brainRegionQuery = gql`
  query brainRegionDetailedQuery($filter: _BrainRegionFilter) {
    BrainRegion(filter: $filter) {
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
      analyses {
        id
      }
      regionMappingsBams {
        relationType
        description
        BamsRegion {
          id
          name
          description
          regionMappings {
            relationType
            BrainRegion {
              id
              name
            }
          }
          regionConnection {
            from {
              strength
              technique
              description
              reference
              BamsRegion {
                id
                name
                description
                regionMappings {
                  relationType
                  BrainRegion {
                    id
                    name
                  }
                }
              }
            }
            to {
              strength
              technique
              description
              reference
              BamsRegion {
                id
                name
                description
                regionMappings {
                  relationType
                  BrainRegion {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
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

export default <T>(
  ids: { id: string }[]
): {
  loading?: any;
  error?: any;
  data?: T;
  refetch?: any;
} => {
  return useQuery(brainRegionQuery, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        OR: ids,
      },
    },
  });
};
