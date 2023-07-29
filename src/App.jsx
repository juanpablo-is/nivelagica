import { Switch, Route } from 'wouter'
import { Home, OAuth, Games } from '@/pages'

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
