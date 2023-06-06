import { PodcastGeneralInfo, Podcast, Episode } from "../Interfaces/Interfaces";

//These three functions return information that was already stored in the localStore

const getExistingPodcastInfo = ({ setPodcastInfo, id }) => {
  const localStorageKey = "myArrayData";
  const storedData = localStorage.getItem(localStorageKey);
  const { podcasts } = JSON.parse(storedData);
  const podcast = podcasts.filter((pod: any) => pod.id === id)[0];
  setPodcastInfo(podcast);
};

const getExistingPodcastInfoDetail = (setPodcastInfoDetail, setEpisodes) => {
  const localStorageKey = "myPodcastInfoDetail";
  const storedData = localStorage.getItem(localStorageKey);
  const { info, infoData } = JSON.parse(storedData);
  setEpisodes(infoData);
  setPodcastInfoDetail(info);
};

const getExistingData = ( key:string) => {
  const localStorageKey = key;
  const storedData = localStorage.getItem(localStorageKey);
  const podcasts = JSON.parse(storedData).podcasts;
  return podcasts;
};

//Groups the array in 4 elements for the Grid in Home component.
const groupArray = (
  array: PodcastGeneralInfo[] | Podcast[],
  groupSize: number
) => {
  const groupedArray: any = [];
  for (let i = 0; i < array.length; i += groupSize) {
    const group: PodcastGeneralInfo[] | Podcast[] = array.slice(
      i,
      i + groupSize
    );
    groupedArray.push(group);
  }
  return groupedArray;
};

const filterPodcast = (podcasts: PodcastGeneralInfo[], filterText: string) => {
  if (podcasts != null) {
    return podcasts.filter(
      (podcast: PodcastGeneralInfo) =>
        podcast.title.toLowerCase().includes(filterText.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterText.toLowerCase())
    );
  } else {
    return podcasts;
  }
};

export {
  getExistingPodcastInfo,
  getExistingPodcastInfoDetail,
  groupArray,
  filterPodcast,
  getExistingData,
};
