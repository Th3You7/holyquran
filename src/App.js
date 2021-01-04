import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Player } from "./routes";
import MainProvider from "./Providers/MainProvider";
import ControlProvider from "./Providers/ControlProvider";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./Providers/ThemeProvider";

function App() {
  return (
    <Router>
      <div className="App">
        <MainProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
          </ThemeProvider>
        </MainProvider>
      </div>
    </Router>
  );
}

export default App;
