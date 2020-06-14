import gql from "graphql-tag";

export const GET_CELL_TYPES = gql`
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
