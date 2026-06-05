import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  zIndex?: number
}

// Contoh HOC (Higher-Order Component) yang digunakan untuk membuat sebuah container
// yang mengatur tata letak (layout) dari komponen anaknya
// HOC harus selalu menerima props children, karena HOC bertugas untuk membungkus komponen lain
const HCenteredContainer = ({ children, className, zIndex }: Props) => {
  return (
    <div
      className={`relative z-${zIndex ?? 30} container mx-auto max-w-81.75 md:max-w-135.25 ${className}`}
    >
      {children}
    </div>
  )
}
export default HCenteredContainer
