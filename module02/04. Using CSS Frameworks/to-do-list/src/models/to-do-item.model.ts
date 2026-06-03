export default interface IToDoItem {
  id: number
  title: string
  isDone: boolean
}

export type TTodoList = IToDoItem[]
