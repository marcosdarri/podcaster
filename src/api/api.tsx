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

export { fetchData, fetchDataPodcast };
