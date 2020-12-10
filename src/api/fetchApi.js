import axios from "axios";

const getAllReaders = "http://mp3quran.net/api/_english.php";
const getAllSuras = "https://unpkg.com/quran-json@1.0.1/json/surahs.json";

const fetchAllReaders = async () => {
  const response = await axios.get(getAllReaders);
  const result = await response.data.reciters;
  return result;
};

const fetchAllSuras = async () => {
  const response = await axios.get(getAllSuras);
  const result = await response.data;
  return result;
};

fetchAllSuras();

export { fetchAllReaders, fetchAllSuras };
