import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import Podcasts from "./pages/Podcasts.tsx";
import EpisodeDetailPage from "./pages/Episode.tsx";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/podcast/:id/episode/:episodeid">
            <EpisodeDetailPage />
          </Route>
          <Route path="/podcast/:id">
            <Podcasts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
