import { AxiosError } from 'axios';
import { UseMutationOptions, UseQueryOptions } from 'react-query/types/react/types';
import { QueryFunction, MutationFunction } from 'react-query/types/core/types';
import { useMutation as useMutationImpl, useQuery as useQueryImpl, useQueryClient, QueryKey } from 'react-query';

export function useQuery<TData>(key: QueryKey, fn: QueryFunction<TData>, options: UseQueryOptions<any, AxiosError, TData> = {}) {
  return useQueryImpl<TData, AxiosError>(key, fn, options);
}

export function useMutation<TData, TVariables extends any = undefined, TError = AxiosError>(
  fn: MutationFunction<TData, TVariables>,
  invalidates?: QueryKey,
  options: Omit<UseMutationOptions<TData, TError, TVariables>, 'onSettled'> = {}
) {
  const qc = useQueryClient();
  return useMutationImpl(fn, {...options, onSettled: async () => {
      await qc.invalidateQueries(invalidates)
  }});

}
