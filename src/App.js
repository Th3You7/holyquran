import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Home } from "./routes";
import ControlProvider from "./Providers/ControlProvider";
import ThemeProvider from "./Providers/ThemeProvider";
import { MediaPlayer } from "./components";

function App() {
  const location = useLocation();
  const background = location.state && location.state.to;

  return (
    <>
      <ThemeProvider>
        <div className="App">
          <Switch location={background || location}>
            <ControlProvider>
              <Route path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </ControlProvider>
          </Switch>
          <Route
            path="/"
            render={() => (
              <ControlProvider>
                <MediaPlayer />
              </ControlProvider>
            )}
          />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
