import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const analysisQuery = gql`
  query getAnalyses($filter: _AnalysisFilter) {
    Analysis(filter: $filter) {
      id
      dataType
      name
      numberOfAnimals
      cellMorphologies {
        id
        name
        regionRecord {
          primaryRegion {
            name
          }
        }
      }
      distributions {
        id
        name
        regionRecord {
          primaryRegion {
            name
          }
        }
      }
      dataTypes {
        id
      }
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
      cellTypePutative {
        name
      }
      objectOfInterest {
        NeuralStructure {
          name
        }
      }
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
          name
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

      quantitations {
        id
        name
        finalEstimateBasis
        regionRecord {
          primaryRegion {
            name
          }
        }
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
  const filter = ids && ids.length ? { OR: ids } : {};
  return useQuery(analysisQuery, {
    fetchPolicy: "network-only",
    variables: { filter },
  });
};
