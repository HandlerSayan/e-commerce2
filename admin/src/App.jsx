import React from 'react'
import NavigationBar from './AppComponents/NavigationBar/NavigationBar'
import Admin from './AppPopups/AdminPanel/Admin'

const App = () => {
  return (
    <div>
      <NavigationBar/>
      <Admin/>
    </div>
  )
}

export default App