import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import GradientCheckbox from "../inputs/GradientCheckbox"
import { useEffect, useRef, useState } from "react"
import HCenteredContainer from "../container/HCenteredContainer"

type Props = {
  onCreate: (title: string, done: boolean) => void
}

const Header = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("")
  const [done, setDone] = useState(false)

  // useRef adalah sebuah hook yang digunakan untuk menyimpan nilai yang tidak menyebabkan re-render saat berubah
  // useRef akan mengembalikan sebuah objek yang memiliki properti current, yang dapat digunakan untuk menyimpan nilai tersebut
  const inputRef = useRef<HTMLInputElement>(null)

  const handleReset = () => {
    setTitle("")
    setDone(false)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="relative h-50 bg-[url('/src/assets/header-background.png')] bg-cover bg-center md:h-75">
      <div className="absolute z-10 size-full bg-linear-to-bl from-[#5596FF]/80 to-[#AC2DEB]/80">
        <HCenteredContainer zIndex={20} className="h-full">
          <div className="flex size-full flex-col justify-center gap-6 md:gap-8">
            <h1 className="text-2xl font-bold tracking-[15px] text-white md:text-[40px]">
              TODO
            </h1>
            <InputGroup className="h-12 items-center rounded-lg bg-white md:h-16 dark:bg-neutral-900">
              <InputGroupAddon className="px-4">
                <GradientCheckbox
                  checked={done}
                  onCheckedChange={(c) => {
                    setDone(c)
                  }}
                />
              </InputGroupAddon>
              <InputGroupInput
                ref={inputRef}
                className="p-0 pt-1 text-xs placeholder:text-xs placeholder:text-[#9495A5] md:text-lg md:placeholder:text-lg"
                placeholder="Create a new todo..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && title !== "") {
                    onCreate(title, done)
                    handleReset()
                  }
                }}
              />
            </InputGroup>
          </div>
        </HCenteredContainer>
      </div>
    </div>
  )
}

export default Header
