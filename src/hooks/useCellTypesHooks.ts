import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const cellTypesQuery = gql`
  {
    CellGroup {
      id
      name
      ontology
      description {
        description
        iri
      }
      cellClassesInGroup {
        id
        name
        ontology
        description {
          description
          iri
        }
        cellTypesInClass {
          id
          name
          ontology
          description {
            description
            iri
          }
          observedInRegions {
            id
            name
          }
          observedInSpecies {
            id
          }
        }
      }
    }
    Specie {
      id
      name
    }
    BrainRegion {
      id
      partOf {
        id
      }
      subRegions {
        id
      }
    }
  }
`;

export default <T>(): {
  loading?: any;
  error?: any;
  data?: T;
  refetch?: any;
} => {
  return useQuery(cellTypesQuery, {
    fetchPolicy: "network-only",
    variables: {},
  });
};
