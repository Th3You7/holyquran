import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Player } from "./routes";
import MainProvider from "./Providers/MainProvider";
import ControlProvider from "./Providers/ControlProvider";

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
              <ControlProvider>
                <Player />
              </ControlProvider>
            </Route>
          </Switch>
        </MainProvider>
      </div>
    </Router>
  );
}

export default App;
