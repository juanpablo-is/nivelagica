import { Switch, Route } from 'wouter'

import Home from './pages/Home'
import OAuth from './pages/OAuth'
import Games from './pages/Games'

function App () {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/oauth' component={OAuth} />
      <Route path='/games' component={Games} />

      <Route>404</Route>
    </Switch>
  )
}

export default App
