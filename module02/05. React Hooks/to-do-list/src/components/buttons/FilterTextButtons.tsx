import type { TToDoFilter } from "@/models/to-do-item.model"
import { Button } from "../ui/button"

type Props = {
  showOnMobile?: boolean
  onFilterChange?: (filter: TToDoFilter) => void
}
const FilterTextButtons = ({ showOnMobile, onFilterChange }: Props) => {
  return (
    <div
      className={`items-center justify-between ${showOnMobile ? "flex md:hidden" : "hidden md:flex"}`}
    >
      {["All", "Active", "Completed"].map((label: string, i) => (
        <Button
          key={i}
          variant="link"
          className="text-sm font-bold text-[#9495A5]"
          onClick={() => {
            // "as" digunakan untuk memberitahu TypeScript bahwa kita yakin bahwa nilai label
            // adalah salah satu dari tipe TToDoFilter, meskipun secara default label bertipe string.
            onFilterChange?.(label as TToDoFilter)
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default FilterTextButtons
