import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"

type Props = {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const GradientCheckbox = ({ checked, onCheckedChange }: Props) => {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "size-7 rounded-full",
        "data-[state=checked]:border-0 data-[state=checked]:bg-linear-to-br data-[state=checked]:from-[#5596FF] data-[state=checked]:to-[#C058F3]",
        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-[4.5px]"
      )}
    />
  )
}

export default GradientCheckbox
