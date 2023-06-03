import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import Title from "../Title/Title";
import Filter from "../Filter/Filter";
import PodcastGrid from "../PodcastGrid/PodcastGrid";

import style from "./Home.module.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    const localStorageKey = "myArrayData";
    fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )
      .then((response) => response.json())
      .then((data) => {
        let newData = [];
        setTotal(data.feed.entry.length);
        data.feed.entry.forEach((dataValue: any) => {
          let podcast = { img: "", title: "", author: "" };
          podcast.img = dataValue["im:image"][2].label;
          podcast.title = dataValue.title.label;
          podcast.author = dataValue["im:artist"].label;
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

  const createAndDeleteArray = (): void => {
    //Four scenarios:
    //If the data doesn't exist we fetch it
    //If the data exists but it's been more than 24 we delete it and fetch again
    //If the data exists but less than 24hs have passed then we use it.

    const localStorageKey = "myArrayData";
    const storedData = localStorage.getItem(localStorageKey);

    if (!storedData) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    } else {
      const { timestamp } = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - timestamp;

      if (elapsedTime > 24 * 60 * 60 * 1000) {
        console.log("LocalStorage data deleted.");
        localStorage.removeItem(localStorageKey);
        setTimeout(() => {
          fetchData();
        }, 1000);
      } else {
        setTimeout(() => {
          getExistingData();
          console.log("Fetching localStorage data successful.");
          setLoading(false);
        }, 1000);
      }
    }
  };

  const getExistingData = () => {
    const localStorageKey = "myArrayData";
    const storedData = localStorage.getItem(localStorageKey);
    const { podcasts } = JSON.parse(storedData);
    setData(podcasts);
    setRows(groupArray(podcasts, 4));
    setFilterText("");
    setTotal(podcasts.length);
  };

  useEffect(() => {
    createAndDeleteArray();
    //We call this function so that it executes every 24hs
    setInterval(createAndDeleteArray, 24 * 60 * 60 * 1000);
  }, []);

  useEffect(() => {
    if (filterText !== "") {
      let newPodcastsRows = filterPodcast(data, filterText);
      setTotal(newPodcastsRows.length);
      newPodcastsRows = groupArray(newPodcastsRows, 4);
      setRows(newPodcastsRows);
    } else {
      getExistingData();
      // setTotal(data.length);
      // let newPodcastsRows = groupArray(data, 4);
      // setRows(newPodcastsRows);
    }
  }, [filterText]);

  const filterPodcast = (podcasts: any, filterText: string) => {
    return podcasts.filter(
      (podcast: any) =>
        podcast.title.toLowerCase().includes(filterText.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  function groupArray(array: any, groupSize: number) {
    const groupedArray = [];

    for (let i = 0; i < array.length; i += groupSize) {
      const group = array.slice(i, i + groupSize);
      groupedArray.push(group);
    }

    return groupedArray;
  }

  return (
    <Row className={style.container}>
      <Title />
      <Filter setFilterText={setFilterText} total={total} />
      <PodcastGrid loading={loading} total={total} rows={rows} />
    </Row>
  );
};

export default Home;
