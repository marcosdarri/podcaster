import { groupArray, getExistingPodcastInfoDetail } from "../utils/helpers";

//This is the function that we use to fetch the data and store it in localStore.
const fetchData = (setTotal,setData, groupArray, setRows, setLoading) => {
  const localStorageKey = "myArrayData";
  fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
    .then((response) => response.json())
    .then((data) => {
      let newData = [];
      setTotal(data.feed.entry.length);
      data.feed.entry.forEach((dataValue: any, index: number) => {
        let podcast = {
          id: 0,
          img: "",
          title: "",
          author: "",
          description: "",
        };
        podcast.id = dataValue.id.attributes["im:id"];
        podcast.img = dataValue["im:image"][2].label;
        podcast.title = dataValue.title.label;
        podcast.author = dataValue["im:artist"].label;
        podcast.description = dataValue.summary.label;
        newData.push(podcast);
      });
      setData(newData);
      let rows = groupArray(newData, 4);
      setRows(rows);

      const localStoragePodcasts = {
        podcasts: newData,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(localStoragePodcasts)
      );
      setLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
};

//This is the function that we use to fetch the data and store it in localStore.
const fetchDataPodcast = (id, setTotal, setPodcastInfoDetail, setData, setLoading) => {
  const localStorageKey = "myPodcastInfoDetail";
  fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  )
    .then((response) => response.json())
    .then((fetchData) => {
      setTotal(fetchData.resultCount - 1);
      let newData = fetchData.results;
      let firstObject = newData.shift();
      setPodcastInfoDetail(firstObject);
      setData(newData);

      const localStoragePodcasts = {
        info: firstObject,
        infoData: newData,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(localStoragePodcasts)
      );

      setLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching podcast data: ", error);
      setLoading(false);
    });
};

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

export { fetchData, fetchDataPodcast, createAndDeleteArray, createAndDeletePodcastData };
