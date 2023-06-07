import { useEffect, useState } from "react";
import Title from "../../Title/Title";
import Filter from "../Filter/Filter";
import PodcastGrid from "../PodcastGrid/PodcastGrid";
import {
  groupArray,
  filterPodcast,
  getExistingData,
} from "../../../utils/helpers";
import { getStoragedPodcastOrFetchThem } from "../../../api/api";
import { Podcast } from "../../../Interfaces/Interfaces";

import style from "./Home.module.scss";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [podcast, setPodcast] = useState<Podcast[]>([]);
  const [rows, setRows] = useState<Podcast[][]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const oneDayInMiliSeconds: number = 86400000;
  const key: string = "myArrayData";

  //This useEffect will activate the getNewPodcastsEveryDay once when the component renders and then every 24hs.
  useEffect(() => {
    getNewPodcastsEveryDay();

    //We call this function so that it executes every 24hs
    setInterval(() => {
      getNewPodcastsEveryDay();
    }, oneDayInMiliSeconds);

    setLoading(false);
  }, []);

  //Every time we write something in the filter we activate this changes.
  useEffect(() => {
    if (filterText !== "") {
      let newPodcastsRows: Podcast[] = filterPodcast(podcast, filterText);
      setTotal(newPodcastsRows.length);
      setRows(groupArray(newPodcastsRows, 4));
    } else {
      const existingPodcasts: Podcast[] = getExistingData(key);
      setPodcast(existingPodcasts);
      setRows(groupArray(existingPodcasts, 4));
      setTotal(existingPodcasts.length);
    }
  }, [filterText]);


  const getNewPodcastsEveryDay = () => {
    const podcasts: Podcast[] = getStoragedPodcastOrFetchThem(oneDayInMiliSeconds);
    if(podcasts){
      setPodcast(podcasts);
      setRows(groupArray(podcasts, 4));
      setTotal(podcasts.length);
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <Title loading={loading} />
      <Filter setFilterText={setFilterText} total={total} />
      <PodcastGrid loading={loading} total={total} rows={rows} />
    </div>
  );
};

export default Home;
