import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Player } from "./routes";
import MainProvider from "./Providers/MainProvider";

function App() {
  return (
    <Router>
      <div className="App">
        <MainProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/player">
              <Player />
            </Route>
          </Switch>
        </MainProvider>
      </div>
    </Router>
  );
}

export default App;
