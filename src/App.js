import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Repositories from './components/Repositories'
import Analysis from './components/Analysis'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/repositories" component={Repositories} />
      <Route exact path="/analysis" component={Analysis} />
    </Switch>
  </BrowserRouter>
)

export default App
