import React, { useEffect, useState } from "react";
import { fetchAllReaders, fetchAllSuras } from "../api/fetchApi";

export const mainContext = React.createContext();

const MainProvider = ({ children }) => {
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
  };

  const [data, setData] = useState([]);
  const [currReciter, setCurrReciter] = useState(initCurrReciter);
  const [currSura, setCurrSura] = useState(initCurrSura);

  useEffect(() => {
    const fetching = async () => setData(await fetchAllReaders());
    fetching();
  }, []);

  return (
    <mainContext.Provider
      value={{
        data,
        currReciter,
        currSura,
        setCurrReciter,
        setCurrSura,
        fetchAllSuras,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export default MainProvider;
