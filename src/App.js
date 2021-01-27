import { Route, Switch, useLocation } from "react-router-dom";
import { Home, Player } from "./routes";
import ControlProvider from "./Providers/ControlProvider";
import MainProvider from "./Providers/MainProvider";
import ThemeProvider from "./Providers/ThemeProvider";

function App() {
  const location = useLocation();
  const background = location.state && location.state.to;

  return (
    <>
      <MainProvider>
        <ThemeProvider>
          <div className="App">
            <Switch location={background || location}>
              <ControlProvider>
                <Route exact path="/">
                  <Home bg={background} />
                </Route>
                <Route path="/player">
                  <Player />
                </Route>
              </ControlProvider>
            </Switch>
          </div>
        </ThemeProvider>
      </MainProvider>
    </>
  );
}

export default App;
