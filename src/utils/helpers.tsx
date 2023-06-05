const createAndDeleteArray = ({
  getExistingData,
  fetchData,
  setLoading,
  existingDataParams,
  timeInMiliSeconds
}): void => {
  //Four scenarios:
  //If the data doesn't exist we fetch it
  //If the data exists but it's been more than 24 we delete it and fetch again
  //If the data exists but less than 24hs have passed then we use it.

  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);

  if (!storedData) {
    setTimeout(() => {
      fetchData();
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    if (elapsedTime > timeInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchData();
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

const createAndDeletePodcastData = ({
  fetchDataPodcast,
  setLoading,
  setPodcastInfoDetail,
  timeInMiliSeconds,
  setData
}): void => {
  //Four scenarios:
  //If the data doesn't exist we fetch it
  //If the data exists but it's been more than 24 we delete it and fetch again
  //If the data exists but less than 24hs have passed then we use it.

  const localStorageKey = "myPodcastInfoDetail";
  const storedData = localStorage.getItem(localStorageKey);

  if (!storedData) {
    setTimeout(() => {
      fetchDataPodcast();
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    if (elapsedTime > timeInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchDataPodcast();
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

const getExistingData = ({ setData, setRows, setFilterText, setTotal }) => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcasts } = JSON.parse(storedData);
  setData(podcasts);
  setRows(groupArray(podcasts, 4));
  setFilterText("");
  setTotal(podcasts.length);
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
