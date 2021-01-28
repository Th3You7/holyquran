import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { Header, Cards, TemporaryDrawer } from "../components";

const Home = () => {
  const [state, setState] = useState(false);
  const [input, setInput] = useState("");

  document.body.style.overflowY = "auto";
  document.body.style.overflowX = "hidden";

  //*handling change to filter reciters
  const handleChange = (e) => {
    setInput(e.target.value);
  };

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
      <Header
        toggleDrawer={toggleDrawer}
        handleChange={handleChange}
        input={input}
      />
      <Cards input={input} />
    </Box>
  );
};

export default Home;
