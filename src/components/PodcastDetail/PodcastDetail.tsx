import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Title from "../Title/Title";

import style from "./PodcastDetail.module.scss";
import EpisodeCounter from "../EpisodeCounter/EpisodeCounter";
import Loader from "../Loader/Loader";
import PodcastInfo from "../PodcastInfo/PodcastInfo";
import EpisodeTable from "../EpisodeTable/EpisodeTable";
import {
  createAndDeletePodcastData,
  getExistingPodcastInfo
} from "../../utils/helpers";

const PodcastDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [podcastInfo, setPodcastInfo] = useState();
  const [podcastInfoDetail, setPodcastInfoDetail] = useState();
  const [total, setTotal] = useState(0);

  //This is the function that we use to fetch the data and store it in localStore.
  const fetchDataPodcast = () => {
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

  //When we start this component we activate the countdown to delete the data enver 24hs
  useEffect(() => {
    const oneDayInMiliSeconds: number = 2000;
    const params = {
      fetchDataPodcast:fetchDataPodcast,
      setLoading,
      setPodcastInfoDetail,
      timeInMiliSeconds: oneDayInMiliSeconds,
      setData
    };
    getExistingPodcastInfo({setPodcastInfo, id})
    createAndDeletePodcastData(params);

    //We call this function so that it executes every 24hs
    setTimeout(() => {
      createAndDeletePodcastData(params);
    }, oneDayInMiliSeconds);
  }, []);

  return (
    <>
      <div className={style.titleContainer}>
        <Title loading={loading} />
      </div>
      <Row className={style.row}>
        {loading ? (
          <Row className={style.loadingRow}>
            <Loader loading={loading} text />
          </Row>
        ) : (
          <Container className={style.container} fluid>
            <Row>
              <Col xs="4">
                {podcastInfo && podcastInfoDetail ? (
                  <PodcastInfo
                    info={podcastInfo}
                    infoDetail={podcastInfoDetail}
                    id={id}
                    episodeDetail={false}
                  />
                ) : (
                  <h5>We're sorry. There's no data for this podcast.</h5>
                )}
              </Col>
              <Col xs="8">
                {total ? <EpisodeCounter total={total} /> : null}
                {data ? <EpisodeTable data={data} id={id} /> : <h5>We're sorry. There's no data for this podcast.</h5>}
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </>
  );
};

export default PodcastDetail;
