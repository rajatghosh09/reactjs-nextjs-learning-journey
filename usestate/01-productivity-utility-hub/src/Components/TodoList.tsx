// Todo List - Features: Add, remove, mark as completed.     - Scope: Array state management using useState.

import { CircleCheckBig, Trash } from 'lucide-react'

import { useState, type ChangeEvent, type FormEvent } from 'react'

interface todo {
    id: number,
    title: string,
    discription: string,
    status: boolean
}


const TodoList = () => {

    const [InputTodo, setInputTodo] = useState<todo>({
        id: 0, // 1 count=1 count=+1
        title: "",
        discription: "",
        status: false
    })

    const [TodoList, setTodoList] = useState<todo[]>([])
    // const [incriseId, setIncriseId] = useState(0)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // console.log("input data", name, value);
        setInputTodo((prev) => ({
            ...prev,
            [name]: value
        }))

        // setIncriseId(id+1)
    }

    // const handleNumber = (id:number) => {
    //     setIncriseId(id+1)
    // }

    // const handleSubmit = (e: FormEvent) => {
    //     // const trimmedTask = InputTodo.trim();

    //     e.preventDefault();

    //     // if (InputTodo.trim() === "") {
    //     //     alert("Please enter a task!");
    //     //     return;
    //     // }
    //     // console.log("inputtodos", InputTodo);

    //     //count for id 
    //     const newTodo = {
    //         ...InputTodo,
    //         id: incriseId + 1,
    //     };

    //     //reset field
    //     setInputTodo({
    //         id: 0,
    //         title: "",
    //         discription: "",
    //         status: false
    //     })

    //     setIncriseId((prev) =>  prev + 1);

    //     // Add todo to TodoList
    //     setTodoList((prevList) => [...prevList, newTodo])

    // }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!InputTodo.title.trim()) return;

        const newTodo = {
            ...InputTodo,
            id: TodoList.length + 1,
        };

        setTodoList((prev) => [...prev, newTodo]);

        setInputTodo({
            id: 0,
            title: "",
            discription: "",
            status: false
        });
    };

    console.log("todolist", TodoList);

    // using this function for completed
    const handleToggleStatus = (id: number) => {
        // console.log("id", id);
        const staturChange = TodoList.map((item) => item.id === id ? { ...item, status: true } : item)
        // console.log("status change", staturChange);
        setTodoList(staturChange)

        // setTodoList((prev) => (prev.map((t) => t.id === id ? {...t, status: true} : t)))
    };

    // using this function for delete button
    // const handleDelete = (id: number) => {
    //     const taskDelete = TodoList.filter((item) => item.id !== id)
    //      const newTodo = {
    //         ...InputTodo,
    //         id: incriseId - 1,
    //     };
    //     setTodoList((prevList) => [...prevList, newTodo])

    //     setTodoList(taskDelete)
    // }

    const handleDelete = (id: number) => {
        setTodoList((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <>
            <div className='min-h-screen flex justify-center items-center  bg-zinc-300'>
                <div className='bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-8 text-white rounded-lg'>
                    <h1 className='flex justify-center items-center mb-10 gap-1 text-2xl'>My To-DO List <CircleCheckBig color="#26de63" /></h1>

                    <form onSubmit={handleSubmit} className='text-black '>
                        <input type="text" name="title" value={InputTodo.title} placeholder='Enter Title Here' className='placeholder-black rounded-sm m-5 px-3 py-2'
                            onChange={handleChange} />

                        <input type="text" name="discription" value={InputTodo.discription} placeholder='Enter Description Here' className='placeholder-black rounded-sm m-5 px-3 py-2'
                            onChange={handleChange} />

                        <button className='bg-black text-white py-2.5 px-4 rounded-lg'>ADD</button>
                    </form>

                    <div className='bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl shadow-lg'>

                        {/* using for when no todos found */}
                        {TodoList?.length === 0 ? <p className='text-center text-lg border-b border-white/30 pb-2 mb-2'>No todos yet</p> :
                            (
                                <ul className=''>

                                    <div className='flex justify-between px-4 font-semibold text-xl border-b border-white/30 pb-2 mb-2'>
                                        <h4>Id</h4>
                                        <h4>Title</h4>
                                        <h4>Description</h4>
                                        <h4>Status</h4>
                                    </div>

                                    {TodoList?.map((t) => (
                                        <li key={t.id} className='flex justify-between px-3  py-2 border-b border-white/10'>
                                            <p className='w-1/3 '>{t.id}</p>
                                            <p className='w-1/3 '>{t.title}</p>
                                            <p className='w-1/3 '>{t.discription}</p>
                                            <button
                                                onClick={() => handleToggleStatus(t.id)}
                                                className={`px-3 py-1 text-sm rounded ${t.status
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                                                    }`
                                                }
                                            >
                                                {!t.status ? "complete" : "completed"}
                                            </button>

                                            <button className='ml-2 hover:text-red-600' onClick={() => handleDelete(t.id)}><Trash /></button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        {/* <div className='flex justify-evenly font-semibold text-lg border-b border-white/30 pb-2 mb-2'>
                            <h4>Title</h4>
                            <p>Description</p>
                        </div>

                        <ul className=''>
                            {TodoList?.map((t) => (
                                <li key={t.id} className='flex justify-evenly py-2 border-b border-white/10'>
                                    <h4 className='w-1/3 text-center'>{t.title}</h4>
                                    <p className='w-1/3 text-center'>{t.discription}</p>
                                </li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList