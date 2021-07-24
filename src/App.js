import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Todo from './page/todo'

function App() {
  return (
    <main>
      <Switch>
        <Route path="/todo" component={Todo} />
      </Switch>
    </main>
  );
}

export default App;
