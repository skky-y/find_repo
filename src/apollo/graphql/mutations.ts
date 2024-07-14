import { gql } from '../__generated__';

export const AddStarMutation = gql(`
  mutation StarAddMutation($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`);

export const RemoveStarMutation = gql(`
  mutation StarRemoveMutation($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`);
