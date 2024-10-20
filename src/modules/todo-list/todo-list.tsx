import { useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useState } from "react"









export function TodoList() {


    const [page, setPage] = useState(1);

    const { data: todoItems, error, isPending } = useQuery({
        queryKey: ['tasks', "list", {page}],
        queryFn: (meta) => todoListApi.getTodoList({ page }, meta)
    })

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }


    return (
        <div
            className="p-5 mx-auto max-w-[1200px] grid gap-5"
        >
            <h1
                className="text-3xl font-bold underline text-center"
            >
                Todo List
            </h1>

            <div
                className="grid gap-2"
            >
                {todoItems?.data.map((todo) => <div
                    key={todo.id}
                    className="border p-2 hover:bg-gray-200 rounded-xl cursor-pointer transition duration-300 ease-in-out"
                >
                    {todo.text}
                </div>)}
            </div>

            <div
                className="grid grid-cols-2 gap-2"
            >

                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    className="border p-2 hover:bg-blue-200 rounded-xl cursor-pointer transition duration-300 ease-in-out"
                >
                    Previous
                </button>

                <button
                    onClick={() => setPage(p => Math.min(p + 1, todoItems?.pages))}
                    className="border p-2 hover:bg-green-200 rounded-xl cursor-pointer transition duration-300 ease-in-out"
                >
                    Next
                </button>

            </div>


        </div>
    )
}