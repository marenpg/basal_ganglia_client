import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const analysisQuery = gql`
  query getAnalyses($filter: _AnalysisFilter) {
    Analysis(filter: $filter) {
      id
      dataType
      name
      numberOfAnimals
      experiment {
        id
        name
        animalStatus
        source {
          id
          title
          publicationYear
          collectedFrom {
            name
            identifier
          }
        }
        anaesthetic {
          id
        }
        perfusionFixMedium {
          id
        }
      } # Experierment end
      specimen {
        sex {
          name
        }
        specie {
          id
        }
        strain {
          name
        }
        substrain {
          name
        }
        ageCategory {
          description
        }
      }
      reporterIncubations {
        reporter {
          rrid
        }
      }
      visualizationMethod {
        name
      }
      dataTypes {
        id
        name
      }
      quantitations {
        finalEstimateBasis
      }
    } # Analysis end
    Specie {
      id
      name
    }
    Strain {
      name
      comesFrom {
        id
      }
      substrains {
        name
      }
    }

    Solution {
      id
      name
    }
    Sex {
      id
      name
    }
    VisualizationProtocol {
      name
    }
    Reporter {
      rrid
    }
    AgeCategory {
      id
      name
      description
      specie {
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
  const variables = ids && ids.length ? { filter: { OR: ids } } : {};
  return useQuery(analysisQuery, {
    fetchPolicy: "network-only",
    variables: variables,
  });
};
