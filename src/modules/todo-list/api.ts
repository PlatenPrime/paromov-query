import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

const BASE_URL = "http://localhost:3001";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type TodoDto = {
  id: string;
  text: string;
  isDone: boolean;
};

export const todoListApi = {
  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    const res = await fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
      signal
    });
    return (await res.json()) as PaginatedResult<TodoDto>;
  },

  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["tasks", "list", { page }],
      queryFn: meta =>   jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${page}&_per_page=10`, {signal: meta.signal}),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: meta =>   jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {signal: meta.signal}),
      initialPageParam: 1,
      getNextPageParam: result => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  }
};
