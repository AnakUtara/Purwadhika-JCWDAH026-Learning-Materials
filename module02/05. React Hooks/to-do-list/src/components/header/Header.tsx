import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import GradientCheckbox from "../inputs/GradientCheckbox"
import { useEffect, useRef, useState } from "react"

type Props = {
  onCreate: (title: string, done: boolean) => void
}

const Header = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("")
  const [done, setDone] = useState(false)

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
    <div className="relative h-75 bg-[url('/src/assets/header-background.png')] bg-cover bg-center">
      <div className="absolute z-10 size-full bg-linear-to-bl from-[#5596FF]/80 to-[#AC2DEB]/80">
        <div className="z-20 container mx-auto h-full max-w-135.25">
          <div className="flex size-full flex-col justify-center gap-8">
            <h1 className="text-[40px] font-bold tracking-[15px] text-white">
              TODO
            </h1>
            <InputGroup className="h-16 items-center rounded-lg bg-white">
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
                className="p-0 pt-1 placeholder:text-lg placeholder:text-[#9495A5]"
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
        </div>
      </div>
    </div>
  )
}

export default Header
