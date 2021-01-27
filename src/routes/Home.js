import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { Route } from "react-router-dom";
import { Header, Cards, TemporaryDrawer, MediaPlayer } from "../components";

const Home = ({ bg }) => {
  const [state, setState] = useState(false);

  document.body.style.overflowY = "auto";
  document.body.style.overflowX = "hidden";

  //
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };
  return (
    <Box display={{ position: "relative" }}>
      <TemporaryDrawer state={state} toggleDrawer={toggleDrawer} />
      <Header toggleDrawer={toggleDrawer} />
      <Cards />
      {bg && <Route path="/" children={<MediaPlayer />} />}
    </Box>
  );
};

export default Home;
