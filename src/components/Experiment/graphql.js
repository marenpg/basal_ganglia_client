import gql from "graphql-tag";

export const GET_EXPERIMENT = gql`
  query experimentsQuery($filter: _ExperimentFilter) {
    Experiment(filter: $filter) {
      id
      name
      animalStatus
      ageLowerLimit
      ageUpperLimit
      weightLowerLimit
      weightUpperLimit
      source {
        id
        title
        type
        publicationYear
        sourceName
        collectedFrom {
          name
          identifier
        }
      }
      perfusionFixMedium {
        id
        name
      }
      anaesthetic {
        id
        name
      }
      brainRegions {
        id
        name
        generalName
      }
      analyses {
        id
        name
        numberOfAnimals
        specimen {
          id
          name
        }
        objectOfInterest {
          id
          name
          ontology
        }
      }
    }
  }
`;

// export const GET_EXPERIMENT = gql`
//   query experimentsQuery($id: String) {
//     experimentById(id: $id) {
//       id
//       name
//       animalStatus
//       ageLowerLimit
//       ageUpperLimit
//       weightLowerLimit
//       weightUpperLimit
//       source {
//         id
//         title
//         type
//         publicationYear
//         sourceName
//         collectedFrom {
//           name
//           identifier
//         }
//       }
//       perfusionFixMedium {
//         id
//         name
//       }
//       anaesthetic {
//         id
//         name
//       }
//       brainRegions {
//         id
//         name
//         generalName
//       }
//       analyses {
//         name
//         numberOfAnimals
//         specimen {
//           id
//           name
//         }
//         objectOfInterest {
//           id
//           name
//           ontology
//         }
//       }
//     }
//   }
// `;
