import React from 'react'
import Ai_BotInput from './Ai_BotInput'


const Chatbot = () => {

  const onSubmit = ()=>{
    console.log('worked')
  }
  return (
    <div>
      ChatBot
      <Ai_BotInput onSubmit={onSubmit} />
    </div>
  )
}

export default Chatbot
