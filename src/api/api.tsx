import {
  groupArray,
  getExistingData,
  getExistingEpisodes,
} from "../utils/helpers";
import { Podcast } from "../Interfaces/Interfaces";

const createAndDeleteArray = ({
  fetchDataParams,
  existingDataParams,
  timeInMiliSeconds,
}): void => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { setLoading } = fetchDataParams;
  const { setPodcast, setRows, setTotal } = existingDataParams;

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
        const existingPodcasts: Podcast[] = getExistingData(localStorageKey);

        setPodcast(existingPodcasts);
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
  const { setEpisodes, timeInMiliSeconds, setLoading } = params;

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
        getExistingEpisodes(setEpisodes);
        console.log("Fetching localStorage data successful.");
        setLoading(false);
      }, 500);
    }
  }
};

//This is the function that we use to fetch the data and store it in localStore.
const fetchData = ({ setTotal, setPodcast, setRows, setLoading }) => {
  const localStorageKey = "myArrayData";
  fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)
    .then((response) => response.json())
    .then((data) => {
      let newPodcast: Podcast[] = [];
      data.feed.entry.forEach((dataValue: any) => {
        const podcast: Podcast = {
          id: dataValue.id.attributes["im:id"],
          img: dataValue["im:image"][2].label,
          name: dataValue.title.label,
          author: dataValue["im:artist"].label,
          title: dataValue.title.label,
          summary: dataValue.summary.label,
        };
        newPodcast.push(podcast);
      });
      setPodcast(newPodcast);
      setTotal(newPodcast.length);
      setRows(groupArray(newPodcast, 4));

      const localStoragePodcasts = {
        podcasts: newPodcast,
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
const fetchDataPodcast = ({ id, setEpisodes, setLoading }) => {
  const localStorageKey = "myPodcastInfoDetail";

  fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  )
    .then((response) => response.json())
    .then((fetchData) => {
      let podcastInfoAndEpisodes = fetchData.results;
      //The first object of this array is the podcast Information, the rest of the objects are the podcast's episodes.
      let podcastInfo = podcastInfoAndEpisodes.shift();
      setEpisodes(podcastInfoAndEpisodes);

      const localStoragePodcasts = {
        podcastInfo: podcastInfo,
        podcastInfoAndEpisodes: podcastInfoAndEpisodes,
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
