import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const brainRegionIdsQuery = gql`
  {
    BrainRegion {
      id
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
  return useQuery(brainRegionIdsQuery, {
    fetchPolicy: "network-only",
    variables: {},
  });
};
