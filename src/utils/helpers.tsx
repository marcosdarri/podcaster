import { Podcast } from "../Interfaces/Interfaces";

//These four functions return information that was already stored in the localStore
const getExistingPodcast = (id) => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const { podcasts } = JSON.parse(storedData);
    return podcasts.filter((pod: Podcast) => pod.id === id)[0];
  }
};

const getExistingEpisodes = () => {
  const localStorageKey = "myPodcastInfoAndEpisodes";
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const { podcastInfoAndEpisodes } = JSON.parse(storedData);
    return podcastInfoAndEpisodes;
  }
};
const getExistingData = (key: string) => {
  const localStorageKey = key;
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const podcasts: Podcast[] = JSON.parse(storedData).podcasts;
    return podcasts;
  }
};

const getExistingEpisode = (episodes, id) => {
  return episodes.find((dataItem) => parseInt(dataItem.trackId) === parseInt(id));
};

/*-------------------------------------------------------*/

//Groups the array in 4 elements for the Grid in Home component.
const groupArray = (array, groupSize: number) => {
  if (array) {
    const groupedArray: any = [];
    for (let i = 0; i < array.length; i += groupSize) {
      const group: Podcast[] = array.slice(i, i + groupSize);
      groupedArray.push(group);
    }
    return groupedArray;
  }
};

const filterPodcast = (podcasts: Podcast[], filterText: string) => {
  if (podcasts != null) {
    return podcasts.filter(
      (podcast: Podcast) =>
        podcast.title.toLowerCase().includes(filterText.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterText.toLowerCase())
    );
  } else {
    return podcasts;
  }
};

export {
  getExistingPodcast,
  getExistingEpisodes,
  groupArray,
  filterPodcast,
  getExistingData,
  getExistingEpisode,
};
