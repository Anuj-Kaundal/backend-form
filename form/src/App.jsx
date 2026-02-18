import { useState } from 'react'
import './App.css'
import React from 'react'
import Form from './Component/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form/>
    </>
  )
}

export default App
