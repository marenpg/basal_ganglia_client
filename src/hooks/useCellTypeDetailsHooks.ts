import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const cellTypeDetailedQuery = gql`
  query cellTypeDetailedQuery($filter: _CellTypeFilter) {
    CellType(filter: $filter) {
      id
      name
      ontology
      description {
        description
        iri
      }
      observedInSpecies {
        id
        name
      }
      observedInRegions {
        id
        name
        specie {
          id
        }
      }
      analyses {
        id
      }
      classMembership {
        id
        name
        ontology
        description {
          description
          iri
        }
        groupMembership {
          id
          name
          ontology
          description {
            description
            iri
          }
        }
      }
    }
  }
`;

export default <T>(
  cellTypeId: string
): {
  loading?: any;
  error?: any;
  data?: T;
  refetch?: any;
} => {
  return useQuery(cellTypeDetailedQuery, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        id: cellTypeId,
      },
    },
  });
};
