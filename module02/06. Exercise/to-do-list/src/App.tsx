import { useCallback, useEffect, useMemo, useState } from "react"
import ListCard from "./components/cards/ListCard"
import Header from "./components/header/Header"
import ToDoListData from "./data/to-do-list.data"
import type { TToDoFilter, TTodoList } from "./models/to-do-item.model"
import type IToDoItem from "./models/to-do-item.model"
import HCenteredContainer from "./components/container/HCenteredContainer"
import FilterTextButtons from "./components/buttons/FilterTextButtons"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"

export function App() {
  // Sebuah component akan re-render setiap kali state atau props-nya berubah.
  // Namun, terkadang kita memiliki operasi berat seperti filtering atau perhitungan
  // yang tidak ingin kita jalankan setiap kali component re-render,
  // terutama jika operasi tersebut tidak terkait dengan perubahan state atau props yang memicu re-render.
  // useMemo dan useCallback adalah hook yang membantu kita mengoptimalkan performa
  // dengan menyimpan hasil dari operasi berat atau function,
  // dan hanya menghitung ulang atau membuat function baru jika dependency-nya berubah.
  console.log("App component re-rendered...")
  // counter untuk paksa component re-render saat button count di klik
  // memperjelas perbedaan antara state yang memicu re-render dan yang tidak
  const [counter, setCounter] = useState(0)
  const [todoList, setTodoList] = useState<TTodoList>(ToDoListData)
  const [currentFilter, setCurrentFilter] = useState<TToDoFilter>("All")

  // useMemo akan menyimpan hasil return dari functionnya, dan hanya akan menghitung ulang jika dependency nya berubah
  // ini akan menghindari proses filtering yang berat setiap kali component re-render, karena hanya akan menghitung ulang jika todoList atau currentFilter berubah
  // dibanding dengan langsung memanggil filter setiap kali re-render
  // yang sama saja dengan menghitung jumlah yang sama setiap kali re-render
  // hanya memakan memory untuk proses yang sama
  // jika list data-nya besar, otomatis loop filtering akan menjadi berat atau setara O(n)
  // dengan useMemo, proses perhitungan ulang hanya terjadi saat isi dependency array berubah
  // sehingga jika counter berubah, proses filtering tidak akan dipanggil ulang selama re-render

  // bisa di-test dengan melihat console.log yang sudah disiapkan di dalam function useMemo dan function filter-nya
  // di console browser dengan klik kanan inspect -> console
  // perhatikan log "App component re-rendered..." yang muncul setiap kali state berubah,
  // dan bandingkan dengan log "Memo Filtering todoList..." dan "Filtering todoList..." yang hanya muncul saat dependency berubah
  const filteredTodoList = useMemo(() => {
    console.log("Memo Filtering todoList...")
    return todoList.filter((item) => {
      console.log("Filtering todoList...")
      if (currentFilter === "Active") {
        return !item.isDone
      } else if (currentFilter === "Completed") {
        return item.isDone
      }
      return true
    })
  }, [todoList, currentFilter])

  // useMemo umumnya dipakai saat derived state butuh melakukan proses perhitungan berat seperti map, filter, reduce, sort
  // atau operasi lain yang kompleks yang hasilnya ingin disimpan dan tidak ingin dihitung ulang setiap kali re-render
  const incompleteTasksCount = useMemo(() => {
    console.log("Calculating incomplete tasks...")
    return todoList.filter((item) => !item.isDone).length
  }, [todoList])

  // handleIncrement tidak perlu useCallback karena tidak dipassing ke child component menggunakan props
  const handleIncrement = () => {
    setCounter((prev) => prev + 1)
  }

  // useCallback akan menyimpan functionnya, dan hanya akan membuat function baru jika dependency nya berubah
  // ini akan menghindari pembuatan function baru setiap kali component re-render, karena hanya akan membuat function baru jika todoList berubah
  // dibanding dengan langsung mendefinisikan function di dalam component yang akan membuat function baru setiap kali re-render
  // yang sama saja dengan membuat function yang sama setiap kali re-render
  // hanya memakan memory untuk proses yang sama
  // jika list data-nya besar, otomatis proses update state yang berat setiap kali re-render, karena membuat function baru setiap kali re-render
  // dengan useCallback, proses pembuatan function baru hanya terjadi saat isi dependency array berubah
  // sehingga jika counter berubah, proses pembuatan function handleAddItem tidak akan terjadi ulang selama re-render

  // bisa di-test dengan melihat console.log yang sudah disiapkan di dalam function useCallback dan function handleAddItem-nya
  // di console browser dengan klik kanan inspect -> console
  // perhatikan log "App component re-rendered..." yang muncul setiap kali state berubah,
  // dan bandingkan dengan log "Creating handleAddItem function..." yang hanya muncul saat dependency berubah
  // utamanya juga membantu membuat child component yang menerima function sebagai props tidak melakukan re-render
  // walaupun parent component-nya re-render, karena function yang dipassing sebagai props tidak berubah
  const handleAddItem = useCallback(
    (title: string, done: boolean) => {
      const lastItemIndex = todoList.length - 1
      const newItem: IToDoItem = {
        id: todoList.length > 0 ? todoList[lastItemIndex].id + 1 : 1,
        title,
        isDone: done,
      }
      setTodoList((prevList) => [...prevList, newItem])
    },
    [todoList]
  )

  const handleClearCompleted = useCallback(() => {
    setTodoList((prevList) => prevList.filter((item) => !item.isDone))
  }, [])

  const handleFilterChange = useCallback((filter: TToDoFilter) => {
    setCurrentFilter(filter)
  }, [])

  const handleUpdateItem = useCallback((updatedItem: IToDoItem) => {
    setTodoList((prevList) =>
      prevList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
  }, [])

  const handleDeleteItem = useCallback((id: number) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id))
  }, [])

  useEffect(() => {
    document.title = `T O D O L I S T | ${incompleteTasksCount} items left to be done.`
  }, [incompleteTasksCount])

  return (
    <main>
      <Button className="w-full" onClick={handleIncrement}>
        Count is {counter}
      </Button>
      <Header onCreate={handleAddItem} />
      <HCenteredContainer zIndex={50} className="-top-8 md:-top-12">
        {/* 
            Pastikan ListCard juga di-memo supaya useCallback bisa bekerja dengan semestinya,
            karena jika ListCard tidak di-memo, setiap kali App re-render, ListCard juga akan re-render,
            sehingga function yang dipassing sebagai props ke ListCard akan dianggap berubah walaupun sebenarnya tidak,
            karena setiap kali App re-render, function handleAddItem, handleClearCompleted, handleFilterChange, handleUpdateItem, 
            dan handleDeleteItem akan dibuat ulang, sehingga ListCard juga akan re-render setiap kali App re-render, 
            yang menyebabkan performa aplikasi menurun terutama jika ListCard memiliki banyak item atau operasi berat lainnya.
          */}
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
