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
import { fetchData } from "../../api/api";

import style from "./Home.module.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [total, setTotal] = useState(0);

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
