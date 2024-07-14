import { gql } from '../__generated__';

export const LIST_QUERY = gql(/* GraphQL */ `
  query List_Query($query: String!, $first: Int = 5, $after: String) {
    search(query: $query, first: $first, after: $after, type: REPOSITORY) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            viewerHasStarred
            stargazers {
              totalCount
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
