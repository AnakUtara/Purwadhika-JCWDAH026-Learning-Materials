import { Card, CardContent, CardFooter } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import CheckboxListItem from "../items/CheckboxListItem"
import { Button } from "../ui/button"
import type { TTodoList } from "@/models/to-do-item.model"

type Props = {
  data: TTodoList
}

const ListCard = ({ data }: Props) => {
  return (
    <Card className="gap-0 p-0">
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          {data.map((item) => (
            <CheckboxListItem key={item.id} item={item} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-between border border-t-gray-200 py-2">
        <p className="text-[#9495A5]">{data.length} items left</p>
        <div className="flex items-center justify-between">
          {["All", "Active", "Completed"].map((label, i) => (
            <Button
              key={i}
              variant="link"
              className="text-sm font-bold text-[#9495A5]"
            >
              {label}
            </Button>
          ))}
        </div>
        <Button variant="link" className="text-sm font-normal text-[#9495A5]">
          Clear Completed
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ListCard
