import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Podcasts from "./pages/Podcasts.tsx";
import EpisodeDetailPage from "./pages/EpisodeDetailPage.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/podcast/:id">
            <Podcasts />
          </Route>
          <Route path="/:episodeid">
            <EpisodeDetailPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
