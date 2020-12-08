import React, { useState } from "react";
import { Cards, Header, TemporaryDrawer } from "../components";

const Home = () => {
  let [state, setState] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  return (
    <>
      <Header openDrawer={(e) => toggleDrawer(e)} />
      <TemporaryDrawer toggleDrawer={toggleDrawer} state={state} />
      <Cards />
    </>
  );
};

export default Home;
