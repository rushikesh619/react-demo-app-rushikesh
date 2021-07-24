import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Todo from './page/todo';
import ApiCall from './page/apiCall';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/todo" component={Todo} />
        <Route path="/apiCall" component={ApiCall} />
        <Route path="/" component={Todo} />
      </Switch>
    </main>
  );
}

export default App;
