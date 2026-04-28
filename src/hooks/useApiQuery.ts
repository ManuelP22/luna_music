import { useEffect, useState } from 'react';

type UseApiQueryOptions = {
  enabled?: boolean;
};

export const useApiQuery = <T>(
  fetcher: () => Promise<T>,
  dependencies: readonly unknown[],
  options?: UseApiQueryOptions,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options?.enabled ?? true));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options?.enabled === false) {
      setIsLoading(false);
      return undefined;
    }

    let isCancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetcher();

        if (!isCancelled) {
          setData(result);
        }
      } catch (requestError) {
        if (!isCancelled) {
          setError(requestError instanceof Error ? requestError : new Error('Unexpected request error'));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, dependencies);

  return { data, isLoading, error };
};
