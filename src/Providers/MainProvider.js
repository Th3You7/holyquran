import React, { useEffect, useState } from "react";
import fetchApi from "../api/fetchApi";

export const mainContext = React.createContext();

const MainProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetching = async () => setData(await fetchApi());
    fetching();
  }, []);

  return (
    <mainContext.Provider value={{ data }}>{children}</mainContext.Provider>
  );
};

export default MainProvider;
