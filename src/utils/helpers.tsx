
//Four scenarios for the Home component:
//If the data doesn't exist we fetch it
//If the data exists but it's been more than 24 we delete it and fetch again
//If the data exists but less than 24hs have passed then we use it.
const createAndDeleteArray = ({
  getExistingData,
  fetchData,
  setLoading,
  existingDataParams,
  timeInMiliSeconds
}): void => {

  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { setData, setRows, setTotal } = existingDataParams;

  if (!storedData) {
    setTimeout(() => {
      fetchData(setTotal,setData, groupArray, setRows, setLoading);
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    if (elapsedTime > timeInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchData(setTotal,setData, groupArray, setRows, setLoading);
      }, 500);
    } else {
      setTimeout(() => {
        getExistingData(existingDataParams);
        console.log("Fetching localStorage data successful.");
        setLoading(false);
      }, 500);
    }
  }
};

//Four scenarios for the PodcastDetail component:
//If the data doesn't exist we fetch it
//If the data exists but it's been more than 24 we delete it and fetch again
//If the data exists but less than 24hs have passed then we use it.
const createAndDeletePodcastData = ({
  fetchDataPodcast,
  setLoading,
  setPodcastInfoDetail,
  timeInMiliSeconds,
  setData,
  id,
  setTotal
}): void => {
  //Four scenarios:
  //If the data doesn't exist we fetch it
  //If the data exists but it's been more than 24 we delete it and fetch again
  //If the data exists but less than 24hs have passed then we use it.

  const localStorageKey = "myPodcastInfoDetail";
  const storedData = localStorage.getItem(localStorageKey);

  if (!storedData) {
    setTimeout(() => {
      fetchDataPodcast(id, setTotal, setPodcastInfoDetail, setData, setLoading);
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    if (elapsedTime > timeInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchDataPodcast(id, setTotal, setPodcastInfoDetail, setData, setLoading);
      }, 500);
    } else {
      setTimeout(() => {
        getExistingPodcastInfoDetail(setPodcastInfoDetail, setData);
        console.log("Fetching localStorage data successful.");
        setLoading(false);
      }, 500);
    }
  }
};

//These three functions return information that was already stored in the localStore

const getExistingPodcastInfo = ({ setPodcastInfo, id }) => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcasts } = JSON.parse(storedData);
  const podcast = podcasts.filter((pod: any) => pod.id === id)[0];
  setPodcastInfo(podcast);
};

const getExistingPodcastInfoDetail = ( setPodcastInfoDetail, setData ) => {
  const localStorageKey = "myPodcastInfoDetail";
  const storedData = localStorage.getItem(localStorageKey);
  const { info, infoData } = JSON.parse(storedData);
  setData(infoData)
  setPodcastInfoDetail(info);
};

const getExistingData = ({ setData, setRows, setFilterText, setTotal }) => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcasts } = JSON.parse(storedData);
  setData(podcasts);
  setRows(groupArray(podcasts, 4));
  setFilterText("");
  setTotal(podcasts.length);
};

//Groups the array in 4 elements for the Grid in Home component.
const groupArray = (array: any, groupSize: number) => {
  const groupedArray = [];
  for (let i = 0; i < array.length; i += groupSize) {
    const group = array.slice(i, i + groupSize);
    groupedArray.push(group);
  }
  return groupedArray;
};

const filterPodcast = (podcasts: any, filterText: string) => {
  return podcasts.filter(
    (podcast: any) =>
      podcast.title.toLowerCase().includes(filterText.toLowerCase()) ||
      podcast.author.toLowerCase().includes(filterText.toLowerCase())
  );
};

export {
  createAndDeleteArray,
  getExistingPodcastInfo,
  getExistingPodcastInfoDetail,
  groupArray,
  filterPodcast,
  getExistingData,
  createAndDeletePodcastData
};
