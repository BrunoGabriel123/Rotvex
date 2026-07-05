// Mock hook for TanStack Query
// Replace with actual implementation when integrating TanStack Query

import { useState, useEffect } from "react";

export function useQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    enabled?: boolean;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options?.enabled === false) {
      setIsLoading(false);
      return;
    }

    fetcher()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [key, options?.enabled]);

  return { data, isLoading, error };
}

export function useMutation<T, V>(
  mutationFn: (variables: V) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: V) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mutationFn(variables);
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
}
