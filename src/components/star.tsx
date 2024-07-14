import { useMutation } from '@apollo/client';
import {
  AddStarMutation,
  RemoveStarMutation,
} from '../apollo/graphql/mutations';

interface IconProps {
  viewerHasStarred: boolean;
}

function Icon({ viewerHasStarred }: IconProps) {
  const fill = viewerHasStarred ? 'text-yellow-400' : 'text-gray-400';

  return (
    <svg
      aria-hidden='true'
      className={`w-5 h-5 ${fill}`}
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'>
      <title>Rating star</title>
      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
    </svg>
  );
}

interface Props {
  repositoryId: string;
  viewerHasStarred: boolean;
  totalCount: number;
}

export function Star({ repositoryId, viewerHasStarred, totalCount }: Props) {
  const [addStar, { loading: starIsPending }] = useMutation(AddStarMutation);
  const [removeStar, { loading: unstarIsPending }] =
    useMutation(RemoveStarMutation);

  const isLoading = starIsPending || unstarIsPending;

  const onClick = () => {
    if (viewerHasStarred) {
      removeStar({
        variables: { input: { starrableId: repositoryId } },
      });
    } else {
      addStar({
        variables: { input: { starrableId: repositoryId } },
      });
    }
  };

  return (
    <button
      type='button'
      className='h-fit flex justify-center items-center mt-4'
      disabled={isLoading}
      onClick={onClick}>
      <Icon viewerHasStarred={viewerHasStarred} />
      <p className='ml-2 text-sm font-bold text-gray-900 '>{totalCount}</p>
    </button>
  );
}
