import { Suspense, useCallback } from 'react';
import { LIST_QUERY } from '../apollo/graphql/queries';
import { useSuspenseQuery } from '@apollo/client';
import { Star } from './star';

interface CardProps {
  id: string;
  name: string;
  description?: string | null;
  viewerHasStarred: boolean;
  stargazers: {
    totalCount: number;
  };
}

function Card({
  id,
  name,
  description,
  viewerHasStarred,
  stargazers,
}: CardProps) {
  return (
    <div className='block mb-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 '>
      <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-700'>
        {name}
      </h3>
      <p className='font-normal text-gray-700 dark:text-gray-400'>
        {description ?? 'No description'}
      </p>
      <Star
        repositoryId={id}
        viewerHasStarred={viewerHasStarred}
        totalCount={stargazers.totalCount}
      />
    </div>
  );
}

function Button({
  disabled,
  hasNext,
  onClick,
}: {
  disabled: boolean;
  hasNext: boolean;
  onClick: () => void;
}) {
  if (!hasNext) return null;

  return (
    <button
      disabled={disabled}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}>
      더보기
    </button>
  );
}

interface ContainerProps {
  keyword: string;
}

function Container({ keyword }: ContainerProps) {
  const {
    data: { search },
    fetchMore,
    networkStatus,
  } = useSuspenseQuery(LIST_QUERY, {
    variables: {
      query: keyword,
    },
  });

  const isLoading = networkStatus === 1;

  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = search;

  const edges_ =
    edges?.filter(item => {
      return item?.node !== null;
    }) ?? [];

  const onClick = useCallback(() => {
    fetchMore({
      variables: {
        first: 5,
        after: endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult,
          search: {
            ...prevResult.search,
            edges: [
              ...(prevResult.search.edges ?? []),
              ...(fetchMoreResult.search.edges ?? []),
            ],
            pageInfo: fetchMoreResult.search.pageInfo,
          },
        };
      },
    });
  }, [endCursor, fetchMore]);

  return (
    <>
      <ul className='w-96 mt-5'>
        {edges_.map(node => {
          switch (node?.node?.__typename) {
            case 'Repository':
              return (
                <Card
                  key={node.node.id}
                  id={node.node.id}
                  name={node.node.name}
                  description={node.node.description}
                  viewerHasStarred={node.node.viewerHasStarred}
                  stargazers={node.node.stargazers}
                />
              );
            default:
              return null;
          }
        })}
      </ul>
      <Button disabled={isLoading} hasNext={hasNextPage} onClick={onClick} />
    </>
  );
}

interface Props {
  keyword: string;
}

export default function List({ keyword }: Props) {
  return (
    <Suspense fallback={<div />}>
      <Container keyword={keyword} />
    </Suspense>
  );
}
