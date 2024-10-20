const BASE_URL = 'http://localhost:3001'



export type PaginatedResult<T> = {
    data: T[],
    first: number,
    items: number,
    last: number,
    next: number | null,
    pages: number,
    prev: number | null
}


export type TodoDto = {
    id: string,
    text: string,
    isDone: boolean
}

export const todoListApi = {

    getTodoList: async (
        { page }: { page: number },
        { signal }: { signal: AbortSignal }) => {

        const res = await fetch(
            `${BASE_URL}/tasks?_page=${page}&_per_page=10`,
            { signal }
        )
        return await res.json() as PaginatedResult<TodoDto>
    }
}

