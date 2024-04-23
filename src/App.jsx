import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/Homepage'
import FoodSearch from './components/FoodSearch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Homepage />
      
    </div>
  )
}

export default App
