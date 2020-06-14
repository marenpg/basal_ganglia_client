import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const brainRegionQuery = gql`
  query brainRegionSimpleQuery {
    BrainRegion {
      id
      name

      partOf {
        id
      }
      specie {
        id
      }
    }
    Specie {
      id
      name
    }
    # CellClass {
    #   id
    #   name
    #   ontology
    #   groupMembership {
    #     id
    #   }
    # }
    # CellGroup {
    #   id
    #   name
    #   ontology
    # }
    # CellType {
    #   id
    #   name
    #   ontology
    #   classMembership {
    #     id
    #   }
    # }
  }
`;

export default <T>(): {
  loading?: any;
  error?: any;
  data?: T;
  refetch?: any;
} => {
  return useQuery(brainRegionQuery, {
    fetchPolicy: "network-only",
    variables: {},
  });
};
