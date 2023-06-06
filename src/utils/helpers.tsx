import { Podcast } from "../Interfaces/Interfaces";

//These three functions return information that was already stored in the localStore

const getExistingPodcast = ({ setPodcast, id }) => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcasts } = JSON.parse(storedData);
  const podcast = podcasts.filter((pod: any) => pod.id === id)[0];
  setPodcast(podcast);
};

const getExistingEpisodes = ( setEpisodes) => {
  const localStorageKey = "myPodcastInfoDetail";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcastInfoAndEpisodes } = JSON.parse(storedData);
  setEpisodes(podcastInfoAndEpisodes);
}
const getExistingData = ( key:string) => {
  const localStorageKey = key;
  const storedData = localStorage.getItem(localStorageKey);
  const podcasts: Podcast[] = JSON.parse(storedData).podcasts;
  return podcasts;
};

//Groups the array in 4 elements for the Grid in Home component.
const groupArray = (
  array: Podcast[],
  groupSize: number
) => {
  const groupedArray: any = [];
  for (let i = 0; i < array.length; i += groupSize) {
    const group: Podcast[] = array.slice(
      i,
      i + groupSize
    );
    groupedArray.push(group);
  }
  return groupedArray;
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
  getExistingData
}
