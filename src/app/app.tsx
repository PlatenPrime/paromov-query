import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { queryClient } from '../shared/api/query-client'
import { TodoList } from '../modules/todo-list/todo-list'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



export function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen={false} />
      <TodoList />

    </QueryClientProvider>
  )
}
