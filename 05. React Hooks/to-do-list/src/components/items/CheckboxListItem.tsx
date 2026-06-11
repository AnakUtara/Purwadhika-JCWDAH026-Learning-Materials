import type IToDoItem from "@/models/to-do-item.model"
import GradientCheckbox from "../inputs/GradientCheckbox"
import { Item, ItemActions, ItemTitle } from "../ui/item"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { Input } from "../ui/input"
import ConfirmationDialog from "../dialogs/ConfirmationDialog"

type Props = {
  item: IToDoItem
  onUpdate?: (updatedItem: IToDoItem) => void
  onDelete?: (id: number) => void
}
const CheckboxListItem = ({ item, onUpdate, onDelete }: Props) => {
  const [existingToDo, setExistingToDo] = useState(item)
  const [isDoubleClicked, setIsDoubleClicked] = useState(false)

  const resetToDo = () => {
    setExistingToDo(item)
  }

  const handleCheckedChange = (checked: boolean) => {
    setExistingToDo((prev) => ({ ...prev, isDone: checked }))
    onUpdate?.({ ...existingToDo, isDone: checked })
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setExistingToDo((prev) => ({ ...prev, title: value }))
  }

  const handleDoubleClick = () => {
    setIsDoubleClicked(true)
  }

  // Blur adalah sebuah event yang terjadi ketika sebuah elemen kehilangan fokus,
  // misalnya ketika pengguna mengklik di luar input setelah selesai mengedit judul tugas.
  // Dalam konteks ini, handleBlur digunakan untuk menyimpan perubahan yang telah dilakukan
  // pada judul tugas dan keluar dari mode edit. Ketika input kehilangan fokus,
  // fungsi handleBlur akan dipanggil, yang kemudian akan memanggil onUpdate dengan item
  // yang telah diperbarui (existingToDo) untuk menyimpan perubahan tersebut.
  const handleBlur = () => {
    setIsDoubleClicked(false)
    resetToDo()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isDoubleClicked) {
      if (e.key === "Escape") {
        setIsDoubleClicked(false)
        resetToDo()
      }

      if (e.key === "Enter") {
        setIsDoubleClicked(false)
        onUpdate?.(existingToDo)
      }
    }
  }

  return (
    <Item className="group rounded-none border-b-gray-200 py-3 last:border-0 md:py-5 dark:border-b-neutral-700">
      <ItemActions>
        <GradientCheckbox
          checked={existingToDo.isDone}
          onCheckedChange={handleCheckedChange}
        />
      </ItemActions>
      {/* 
        Conditional rendering adalah sebuah teknik untuk menampilkan 
        elemen yang berbeda berdasarkan kondisi tertentu 
      */}
      {isDoubleClicked ? (
        <ItemActions className="flex-1 pr-4">
          <Input
            autoFocus
            className="text-xs font-normal md:text-lg"
            value={existingToDo.title}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </ItemActions>
      ) : (
        <ItemTitle
          /* dengan JSX kita bisa membuat kondisi untuk mengubah tampilan elemen berdasarkan state */
          className={`flex-1 pt-1 text-xs font-normal md:text-lg ${existingToDo.isDone ? "text-gray-500 line-through" : ""}`}
          onDoubleClick={handleDoubleClick}
        >
          {existingToDo.title}
        </ItemTitle>
      )}
      <ItemActions className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ConfirmationDialog onConfirm={() => onDelete?.(item.id)} />
      </ItemActions>
    </Item>
  )
}
export default CheckboxListItem
