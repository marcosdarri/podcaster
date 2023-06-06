import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Title from "../../Title/Title";
import Counter from "../Counter/Counter";
import Loader from "../../Loader/Loader";
import PodcastInfo from "../PodcastInfo/PodcastInfo";
import PodcastTable from "../PodcastTable/PodcastTable";
import {
  getExistingPodcastInfo
} from "../../../utils/helpers";
import { createAndDeletePodcastData } from "../../../api/api";
import { Podcast, Episode } from "../../../Interfaces/Interfaces";

import style from "./Podcast.module.scss";


const PodcastComponent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [podcastInfo, setPodcastInfo] = useState<Podcast>();
  const [podcast, setPodcast] = useState<Podcast>();
  const [total, setTotal] = useState<number>(0);

  //When we start this component we activate the countdown to delete the data enver 24hs
  useEffect(() => {
    const oneDayInMiliSeconds: number = 86400000;
    const params = {
      setLoading,
      setTotal,
      setPodcast,
      setPodcastInfo,
      timeInMiliSeconds: oneDayInMiliSeconds,
      setEpisodes,
      id
    };
    getExistingPodcastInfo({setPodcastInfo, id})
    createAndDeletePodcastData(params);

    //We call this function so that it executes every 24hs
    setTimeout(() => {
      createAndDeletePodcastData(params);
    }, oneDayInMiliSeconds);
  }, []);

  console.log("podcast: ", podcast)
  console.log("podcastInfo: ", podcastInfo)

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
                {podcastInfo && podcast ? (
                  <PodcastInfo
                    info={podcastInfo}
                    infoDetail={podcast}
                    id={id}
                    episodeDetail={false}
                  />
                ) : (
                  <h5>We're sorry. There's no data for this podcast.</h5>
                )}
              </Col>
              <Col xs="8">
                {total ? <Counter total={total} /> : null}
                {episodes ? <PodcastTable episodes={episodes} id={id} /> : <h5>We're sorry. There's no data for this podcast.</h5>}
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </>
  );
};

export default PodcastComponent;
