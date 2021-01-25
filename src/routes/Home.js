import React, { useState } from "react";
import { Header, Cards, TemporaryDrawer } from "../components";

const Home = () => {
  const [state, setState] = useState(false);
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
    <>
      <TemporaryDrawer state={state} toggleDrawer={toggleDrawer} />
      <Header toggleDrawer={toggleDrawer} />
      <Cards />
    </>
  );
};

export default Home;
