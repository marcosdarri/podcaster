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
  getExistingPodcastInfo,
  getExistingPodcastInfoDetail,
  groupArray,
  filterPodcast,
  getExistingData
};
