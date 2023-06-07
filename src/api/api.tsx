import { getExistingData } from "../utils/helpers";
import { Podcast } from "../Interfaces/Interfaces";

//Si no esta guardada hacemos fetch o si esta pero el id no es el mismo fetch de nuevo
//Si esta pero pasaron 24hs fetch de nuevo
//Si esta y es ese id se devuelve

const getStoragedPodcastInfoAndEpisodesOrFetchThem = (
  id,
  setPodcastInfo,
  setEpisodes,
  setLoading,
  oneDayInMiliSeconds
): any => {
  const localStorageKey = "myPodcastInfoAndEpisodes";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcastInfoAndEpisodes } = JSON.parse(storedData);

  //If the storage podcast data doesn't exist or belongs to a different podcast then we fetch
  if (!storedData || podcastInfoAndEpisodes[0].trackId !== parseInt(id)) {
    setTimeout(() => {
      return fetchDataPodcast(id, setPodcastInfo, setLoading, setEpisodes);
    }, 500);
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    //If the data exists but it's been more than 24 we delete it and fetch again
    if (elapsedTime > oneDayInMiliSeconds) {
      console.log("LocalStorage data deleted.");
      localStorage.removeItem(localStorageKey);
      setTimeout(() => {
        fetchDataPodcast(id, setPodcastInfo, setLoading, setEpisodes);
      }, 500);
    } else {
      //If the data exists but less than 24hs have passed then we use it.
      console.log("Fetching localStorage data successful.");
      setPodcastInfo(podcastInfoAndEpisodes[0]);
      setEpisodes(
        podcastInfoAndEpisodes.slice(1, podcastInfoAndEpisodes.length)
      );
      setLoading(false);
      return podcastInfoAndEpisodes;
    }
  }
};

//This is the function that we use to fetch the data and store it locally.
const fetchDataPodcast = (id, setPodcastInfo, setLoading, setEpisodes): any => {
  const localStorageKey = "myPodcastInfoAndEpisodes";
  const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`; // API's URL

  fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "https://localhost:3000",
    },
  })
    .then((response) => response.json())
    .then((fetchData) => {
      const podcastInfoAndEpisodes = fetchData.results;
      //The first object of this array is the podcast Information, the rest of the objects are the podcast's episodes.
      const localStoragePodcasts = {
        podcastInfoAndEpisodes: podcastInfoAndEpisodes,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(localStoragePodcasts)
      );
      setPodcastInfo(podcastInfoAndEpisodes[0]);
      setEpisodes(
        podcastInfoAndEpisodes.slice(1, podcastInfoAndEpisodes.length)
      );
      console.log("Fetching Podcast data successful.", podcastInfoAndEpisodes);
      setLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching podcast data: ", error);
    });
};

const getStoragedPodcastOrFetchThem = (oneDayInMiliSeconds): any => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);

  //If the data doesn't exist we fetch it
  if (!storedData) {
    return fetchData();
  } else {
    const { timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timestamp;

    //If the data exists but it's been more than 24 we delete it and fetch again
    if (elapsedTime > oneDayInMiliSeconds) {
      localStorage.removeItem(localStorageKey);
      console.log("LocalStorage data deleted.");
      setTimeout(() => {
        return fetchData();
      }, 500);
    } else {
      //If the data exists but less than 24hs have passed then we use it.
      setTimeout(() => {
        const existingPodcasts: Podcast[] = getExistingData(localStorageKey);
        console.log("Fetching localStorage data successful.");
        return existingPodcasts;
      }, 500);
    }
  }
};

//This is the function that we use to fetch the data and store it in localStore.
const fetchData = (): any => {
  const localStorageKey = "myArrayData";
  const url = `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`; // API's URL

  fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "https://localhost:3000",
    },
  })
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
      const localStoragePodcasts = {
        podcasts: newPodcast,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(localStoragePodcasts)
      );
      return newPodcast;
    })
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
};

export {
  fetchData,
  fetchDataPodcast,
  getStoragedPodcastOrFetchThem,
  getStoragedPodcastInfoAndEpisodesOrFetchThem,
};
