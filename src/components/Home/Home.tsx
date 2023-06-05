import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import Title from "../Title/Title";
import Filter from "../Filter/Filter";
import PodcastGrid from "../PodcastGrid/PodcastGrid";
import {
  createAndDeleteArray,
  groupArray,
  filterPodcast,
  getExistingData,
} from "../../utils/helpers";

import style from "./Home.module.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [total, setTotal] = useState(0);

  //This is the function that we use to fetch the data and store it in localStore.
  const fetchData = () => {
    const localStorageKey = "myArrayData";
    fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )
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
        console.log("Error fetching podcast data: ", error);
      });
  };

  //When we start this component we activate the countdown to delete the data enver 24hs
  useEffect(() => {
    const oneDayInMiliSeconds:number = 86400000;
    const params = {
      getExistingData: getExistingData,
      fetchData: fetchData,
      setLoading: setLoading,
      existingDataParams: { setData, setRows, setFilterText, setTotal },
      timeInMiliSeconds: oneDayInMiliSeconds
    }
    createAndDeleteArray(params);
    //We call this function so that it executes every 24hs
    setInterval(() => {createAndDeleteArray(params)},  oneDayInMiliSeconds);
  }, []);

  //Every time we write something in the filter we activate this changes.
  useEffect(() => {
    if (filterText !== "") {
      let newPodcastsRows = filterPodcast(data, filterText);
      setTotal(newPodcastsRows.length);
      newPodcastsRows = groupArray(newPodcastsRows, 4);
      setRows(newPodcastsRows);
    } else {
      getExistingData({ setData, setRows, setFilterText, setTotal });
    }
  }, [filterText]);

  return (
    <div className={style.container}>
      <Title loading={loading} />
      <Filter setFilterText={setFilterText} total={total} />
      <PodcastGrid loading={loading} total={total} rows={rows} />
    </div>
  );
};

export default Home;
