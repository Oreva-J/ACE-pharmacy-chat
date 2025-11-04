import Ai_ChatBot from "./components/chat/Ai_ChatBot"
import { Button } from "./components/ui/button"


const App = () => {
  return (
    <div>
      <p className='text-3xl bg-red-500'>Hello world!!! Welcome to ACE chat</p>
      <Button>Click me</Button>
      <Ai_ChatBot />
    </div>
  )
}

export default App
