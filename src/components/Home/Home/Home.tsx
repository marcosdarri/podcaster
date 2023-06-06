import { useEffect, useState } from "react";
import Title from "../../Title/Title";
import Filter from "../Filter/Filter";
import PodcastGrid from "../PodcastGrid/PodcastGrid";
import {
  groupArray,
  filterPodcast,
  getExistingData,
} from "../../../utils/helpers";
import { createAndDeleteArray } from "../../../api/api";
import { PodcastGeneralInfo, Podcast } from "../../../Interfaces/Interfaces";

import style from "./Home.module.scss";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [podcastGeneralInfo, setPodcastGeneralInfo] = useState<
    PodcastGeneralInfo[]
  >([]);
  const [rows, setRows] = useState<PodcastGeneralInfo[][]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const key:string = "myArrayData";

  //When we start this component we activate the countdown to delete the data enver 24hs
  useEffect(() => {
    const oneDayInMiliSeconds: number = 86400000;
    const params = {
      fetchDataParams: { setTotal, setPodcastGeneralInfo, setRows, setLoading },
      existingDataParams: {key, setPodcastGeneralInfo, setRows, setTotal },
      timeInMiliSeconds: oneDayInMiliSeconds,
    };
    createAndDeleteArray(params);
    //We call this function so that it executes every 24hs
    setInterval(() => {
      createAndDeleteArray(params);
    }, oneDayInMiliSeconds);
  }, []);

  //Every time we write something in the filter we activate this changes.
  useEffect(() => {
    if (filterText !== "") {
      let newPodcastsRows: PodcastGeneralInfo[] = filterPodcast(
        podcastGeneralInfo,
        filterText
      );
      setTotal(newPodcastsRows.length);
      setRows(groupArray(newPodcastsRows, 4));
    } else {
      
      const existingPodcasts: PodcastGeneralInfo[] = getExistingData( key);
      setPodcastGeneralInfo(existingPodcasts);
      setRows(groupArray(existingPodcasts, 4));
      setTotal(existingPodcasts.length);
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
