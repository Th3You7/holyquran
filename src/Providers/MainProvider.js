import React, { useEffect, useState } from "react";
import { fetchAllReaders, fetchAllSuras } from "../api/fetchApi";

export const mainContext = React.createContext();

const MainProvider = ({ children }) => {
  // true === darktheme, false === lighttheme
  const [theme, setTheme] = useState(false);

  //handling theme
  const handleTheme = () => setTheme(!theme);
  //
  const initCurrReciter = {
    id: null,
    name: "",
    suras: [],
    server: null,
    rewaya: "",
    count: "",
  };

  const initCurrSura = {
    number: null,
    name: "",
    translate: "",
    index: null,
  };

  //* fetch all needed data
  const [data, setData] = useState([]);
  const [surasNames, setSurasNames] = useState([]);

  //
  const [currReciter, setCurrReciter] = useState(initCurrReciter);
  const [currSura, setCurrSura] = useState(initCurrSura);

  useEffect(() => {
    const fetching = async () => setData(await fetchAllReaders());
    fetching();
  }, []);

  useEffect(() => {
    const fetching = async () => setSurasNames(await fetchAllSuras());
    fetching();
  }, []);

  console.log(currReciter.suras);

  return (
    <mainContext.Provider
      value={{
        data,
        currReciter,
        currSura,
        surasNames,
        theme,
        handleTheme,
        setCurrReciter,
        setCurrSura,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export default MainProvider;
