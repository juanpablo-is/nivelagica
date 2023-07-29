import { Route } from 'wouter'

import Home from './pages/Home'
import OAuth from './pages/OAuth'

function App () {
  return (
    <>
      <Route path='/' component={Home} />
      <Route path='/oauth' component={OAuth} />
    </>
  )
}

export default App
