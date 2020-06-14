import gql from "graphql-tag";

export const GET_EXPERIMENTS = gql`
  {
    Experiment {
      id
      name
      analyses {
        dataType
      }
    }
  }
`;
