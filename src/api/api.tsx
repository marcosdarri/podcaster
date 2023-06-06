import {
  groupArray,
  getExistingData,
  getExistingPodcastInfoDetail,
} from "../utils/helpers";
import { PodcastGeneralInfo, Podcast, Episode } from "../Interfaces/Interfaces";

const createAndDeleteArray = ({
  fetchDataParams,
  existingDataParams,
  timeInMiliSeconds,
}): void => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { setLoading } = fetchDataParams;
  const { setPodcastGeneralInfo, setRows, setTotal } = existingDataParams;

  //If the data doesn't exist we fetch it
  if (!storedData) {
    setTimeout(() => {
      fetchData(fetchDataParams);
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    //If the data exists but it's been more than 24 we delete it and fetch again
    if (elapsedTime > timeInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchData(fetchDataParams);
      }, 500);
    } else {
      //If the data exists but less than 24hs have passed then we use it.
      setTimeout(() => {
        const existingPodcasts: PodcastGeneralInfo[] =
          getExistingData(localStorageKey);

        setPodcastGeneralInfo(existingPodcasts);
        setRows(groupArray(existingPodcasts, 4));
        setTotal(existingPodcasts.length);

        console.log("Fetching localStorage data successful.");
        setLoading(false);
      }, 500);
    }
  }
};

const createAndDeletePodcastData = (params): void => {
  const localStorageKey = "myPodcastInfoDetail";
  const storedData = localStorage.getItem(localStorageKey);
  const { setPodcastInfo, setEpisodes, timeInMiliSeconds, setLoading } = params;

  //If the data doesn't exist we fetch it
  if (!storedData) {
    setTimeout(() => {
      fetchDataPodcast(params);
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    //If the data exists but it's been more than 24 we delete it and fetch again
    if (elapsedTime > timeInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchDataPodcast(params);
      }, 500);
    } else {
      setTimeout(() => {
        //If the data exists but less than 24hs have passed then we use it.
        getExistingPodcastInfoDetail(setPodcastInfo, setEpisodes);
        console.log("Fetching localStorage data successful.");
        setLoading(false);
      }, 500);
    }
  }
};

//This is the function that we use to fetch the data and store it in localStore.
const fetchData = ({
  setTotal,
  setPodcastGeneralInfo,
  setRows,
  setLoading,
}) => {
  const localStorageKey = "myArrayData";
  fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)
    .then((response) => response.json())
    .then((data) => {
      let newPodcastGeneralInfo: PodcastGeneralInfo[] = [];
      data.feed.entry.forEach((dataValue: any) => {
        const podcast: PodcastGeneralInfo = {
          id: dataValue.id.attributes["im:id"],
          img: dataValue["im:image"][2].label,
          name: dataValue.title.label,
          author: dataValue["im:artist"].label,
          title: dataValue.title.label,
          summary: dataValue.summary.label,
        };
        newPodcastGeneralInfo.push(podcast);
      });
      setPodcastGeneralInfo(newPodcastGeneralInfo);
      setTotal(newPodcastGeneralInfo.length);
      setRows(groupArray(newPodcastGeneralInfo, 4));

      const localStoragePodcasts = {
        podcasts: newPodcastGeneralInfo,
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
const fetchDataPodcast = ({
  id,
  setTotal,
  setPodcastInfoDetail,
  setData,
  setLoading,
}) => {
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

export {
  fetchData,
  fetchDataPodcast,
  createAndDeleteArray,
  createAndDeletePodcastData,
};
