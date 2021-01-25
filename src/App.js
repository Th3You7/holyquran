import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Player } from "./routes";
import ControlProvider from "./Providers/ControlProvider";
import MainProvider from "./Providers/MainProvider";
import ThemeProvider from "./Providers/ThemeProvider";

function App() {
  return (
    <Router>
      <MainProvider>
        <ThemeProvider>
          <div className="App">
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
          </div>
        </ThemeProvider>
      </MainProvider>
    </Router>
  );
}

export default App;
