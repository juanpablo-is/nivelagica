import { Switch, Route } from 'wouter'
import { Home, OAuth, Games, Auth } from '@/pages'

function App () {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/oauth' component={OAuth} />
      <Route path='/games'>
        <Auth>
          <Games />
        </Auth>
      </Route>

      <Route>404</Route>
    </Switch>
  )
}

export default App
