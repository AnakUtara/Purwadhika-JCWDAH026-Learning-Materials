import { useEffect, useState } from "react"
import ListCard from "./components/cards/ListCard"
import Header from "./components/header/Header"
import ToDoListData from "./data/to-do-list.data"
import type { TTodoList } from "./models/to-do-item.model"
import type IToDoItem from "./models/to-do-item.model"

export function App() {
  // useState adalah sebuah hook yang digunakan untuk menyimpan
  // state di dalam functional component
  // State adalah sebuah data yang dapat berubah-ubah seiring dengan waktu
  // useState akan mengembalikan sebuah array yang berisi dua elemen
  // Elemen pertama adalah nilai dari state, dan elemen kedua adalah fungsi untuk mengubah nilai state
  const [todoList, setTodoList] = useState<TTodoList>(ToDoListData)

  const handleAddItem = (title: string, done: boolean) => {
    const lastItemIndex = todoList.length - 1
    const newItem: IToDoItem = {
      id: todoList.length > 0 ? todoList[lastItemIndex].id + 1 : 1,
      title,
      isDone: done,
    }
    setTodoList((prevList) => [...prevList, newItem])
  }

  useEffect(() => {
    console.log("useEffect is called")
    document.title = `TO DO List | ${todoList.length} items`
    return () => {
      console.log("useEffect cleanup is called")
    }
  }, [todoList])

  return (
    <main>
      <Header onCreate={handleAddItem} />
      <div className="relative -top-12 z-30 container mx-auto max-w-135.25">
        <ListCard data={todoList} />
      </div>
    </main>
  )
}

export default App
