import { useEffect, useState } from "react"
import ListCard from "./components/cards/ListCard"
import Header from "./components/header/Header"
import ToDoListData from "./data/to-do-list.data"
import type { TToDoFilter, TTodoList } from "./models/to-do-item.model"
import type IToDoItem from "./models/to-do-item.model"
import HCenteredContainer from "./components/container/HCenteredContainer"
import FilterTextButtons from "./components/buttons/FilterTextButtons"
import { Card } from "./components/ui/card"

export function App() {
  // useState adalah sebuah hook yang digunakan untuk menyimpan
  // state di dalam functional component
  // State adalah sebuah data yang dapat berubah-ubah seiring dengan waktu
  // useState akan mengembalikan sebuah array yang berisi dua elemen
  // Elemen pertama adalah nilai dari state, dan elemen kedua adalah fungsi untuk mengubah nilai state
  const [todoList, setTodoList] = useState<TTodoList>(ToDoListData)
  const [currentFilter, setCurrentFilter] = useState<TToDoFilter>("All")

  // Fungsi ini memfilter todoList state tanpa mengubah data state aslinya
  // memampukan kita untuk menggunakan return value dari filter
  // untuk menampilkan daftar tugas yang sesuai dengan filter yang dipilih oleh pengguna
  // Jika langsung melakukan filter dalam setTodoList,
  // maka data state asli akan berubah dan diganti dengan list yang sudah terfilter,
  // sehingga kita tidak bisa lagi mengakses data state asli untuk melakukan filter ulang
  // atau operasi lainnya
  // Ini sebutannya derived state, yaitu state yang nilainya diturunkan dari state lain (todoList)
  const filteredTodoList = todoList.filter((item) => {
    if (currentFilter === "Active") {
      return !item.isDone
    } else if (currentFilter === "Completed") {
      return item.isDone
    }
    return true
  })

  const incompleteTasksCount = todoList.filter((item) => !item.isDone).length

  // Pola konvensi penamaan fungsi untuk handle event adalah dengan menggunakan prefix "handle"
  // diikuti dengan nama event yang ingin ditangani, seperti handleAddItem, handleDeleteItem, dll
  const handleAddItem = (title: string, done: boolean) => {
    const lastItemIndex = todoList.length - 1
    const newItem: IToDoItem = {
      id: todoList.length > 0 ? todoList[lastItemIndex].id + 1 : 1,
      title,
      isDone: done,
    }
    setTodoList((prevList) => [...prevList, newItem])
  }

  const handleClearCompleted = () => {
    setTodoList((prevList) => prevList.filter((item) => !item.isDone))
  }

  const handleFilterChange = (filter: TToDoFilter) => {
    setCurrentFilter(filter)
  }

  const handleUpdateItem = (updatedItem: IToDoItem) => {
    setTodoList((prevList) =>
      prevList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
  }

  const handleDeleteItem = (id: number) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id))
  }

  // useEffect adalah sebuah hook yang digunakan untuk melakukan side effect di dalam functional component
  // Side effect adalah sebuah efek samping yang terjadi di luar fungsi render, seperti melakukan fetch data, mengubah title, dll
  // useEffect akan dipanggil setiap kali komponen dirender, dan dapat dikontrol dengan memberikan array dependency sebagai argumen kedua
  useEffect(() => {
    console.log("useEffect is called")
    document.title = `T O D O L I S T | ${incompleteTasksCount} items left to be done.`
    // Fungsi yang dikembalikan oleh useEffect akan dipanggil
    // sebelum useEffect dipanggil kembali (jika dependency berubah)
    return () => {
      console.log("useEffect cleanup is called")
    }
  }, [incompleteTasksCount])

  // Perhatikan pemakaian tailwind class "md:" di beberapa komponen dalam aplikasi ini
  // Tailwind class dengan prefix "md:" berarti bahwa style tersebut hanya akan diterapkan pada layar dengan ukuran medium ke atas (min-width: 768px)
  // Dengan menggunakan prefix "md:", kita dapat membuat desain yang responsif, di mana tampilan aplikasi akan menyesuaikan dengan ukuran layar pengguna
  // Pada dasarnya style yang kita tulis tanpa prefix "md:" akan diterapkan pada ukuran layar terkecil (mobile-first),
  // tetapi jika kita ingin mengubah style tersebut untuk layar yang lebih besar, kita bisa menggunakan
  // prefix "md:" untuk menimpa style yang sudah ada pada ukuran layar yang lebih besar
  // Selain "md:", Tailwind juga menyediakan prefix lain seperti "sm:", "lg:", "xl:", dan "2xl:" untuk mengatur style pada berbagai ukuran layar yang berbeda

  return (
    <main>
      <Header onCreate={handleAddItem} />
      <HCenteredContainer className="-top-8 md:-top-12">
        <ListCard
          data={filteredTodoList}
          taskCount={incompleteTasksCount}
          onFilterChange={handleFilterChange}
          onClearCompleted={handleClearCompleted}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
        <Card className="mt-4 flex items-center justify-center py-1 md:hidden">
          <FilterTextButtons showOnMobile onFilterChange={handleFilterChange} />
        </Card>
      </HCenteredContainer>
    </main>
  )
}

export default App
