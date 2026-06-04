import ListCard from "./components/cards/ListCard"
import Header from "./components/header/Header"

export function App() {
  return (
    <main>
      <Header />
      <div className="relative -top-12 z-30 container mx-auto max-w-135.25">
        <ListCard />
      </div>
    </main>
  )
}

export default App
