import React, { useState, useContext } from "react";
import { Box } from "@material-ui/core";

import Error from "../errors/Error";
import { Header, Cards, TemporaryDrawer } from "../components";
import { mainContext } from "../Providers/MainProvider";

const Home = () => {
  const { data } = useContext(mainContext);
  const [state, setState] = useState(false);
  const [input, setInput] = useState("");

  document.body.style.overflowY = "auto";
  document.body.style.overflowX = "hidden";

  //*handling changes to filter reciters
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
      {data === "Network Error" || typeof data === "number" ? (
        <Error data={data} />
      ) : (
        <Cards input={input} />
      )}
    </Box>
  );
};

export default Home;
