import axios from "axios";

const getAllReaders = "http://mp3quran.net/api/_english.php";

const fetchApi = async () => {
  const response = await axios.get(getAllReaders);
  const result = await response.data.reciters;
  return result;
};

fetchApi();

export default fetchApi;
