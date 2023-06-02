import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Podcasts from "./pages/Podcasts.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/podcast">
            <Podcasts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
