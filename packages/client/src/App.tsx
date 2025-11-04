import Chatbot from "./components/chat/Chatbot"
import { Button } from "./components/ui/button"


const App = () => {
  return (
    <div>
      <p className='text-3xl bg-red-500'>Hello world!!! Welcome to ACE chat</p>
      <Button>Click me</Button>
      <Chatbot />
    </div>
  )
}

export default App
