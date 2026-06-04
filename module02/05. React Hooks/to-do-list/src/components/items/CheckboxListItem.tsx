import type IToDoItem from "@/models/to-do-item.model"
import GradientCheckbox from "../inputs/GradientCheckbox"
import { Item, ItemActions, ItemTitle } from "../ui/item"

type Props = {
  item: IToDoItem
}
const CheckboxListItem = ({ item }: Props) => {
  return (
    <Item className="border-b-gray-200 py-5 last:border-0">
      <ItemActions>
        <GradientCheckbox checked={item.isDone} />
      </ItemActions>
      <ItemTitle className="pt-1 text-lg font-normal">{item.title}</ItemTitle>
    </Item>
  )
}
export default CheckboxListItem
