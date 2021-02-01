import axios from "axios";

const getAllReaders = "https://mp3quran.net/api/_english.php";
const getAllSuras = "https://unpkg.com/quran-json@1.0.1/json/surahs.json";

const fetchAllReaders = async () => {
  try {
    const response = await axios.get(getAllReaders);
    const result = await response.data.reciters;
    return result;
  } catch (e) {
    const message = e.response ? e.response.status : null || e.message;
    return message;
  }

  // axios
  //   .get(getAllReaders)
  //   .then((response) => {
  //     const result = response.data.reciters;
  //     return result;
  //   })
  //   .catch((error) => {
  //     throw new Error();
  //   });
};

const fetchAllSuras = async () => {
  try {
    const response = await axios.get(getAllSuras);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log(e.message);
  }
};

//fetchAllSuras();

export { fetchAllReaders, fetchAllSuras };
