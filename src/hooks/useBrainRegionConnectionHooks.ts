import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const brainRegionConnectionQuery = gql`
  query brainRegionsConnectivityQuery($filter: _BrainRegionFilter) {
    BrainRegion(filter: $filter) {
      regionConnection {
        from {
          BrainRegion {
            id
            name
          }
          technique
          strength
          description
          reference
        }
        to {
          BrainRegion {
            id
            name
          }
          technique
          strength
          description
          reference
        }
      }
    }
  }
`;

export default (regionId: string) => {
  return useQuery(brainRegionConnectionQuery, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        id: regionId,
      },
    },
  });
};
