import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Title from "../../Title/Title";
import Counter from "../Counter/Counter";
import Loader from "../../Loader/Loader";
import PodcastInfo from "../PodcastInfo/PodcastInfo";
import PodcastTable from "../PodcastTable/PodcastTable";
import { getStoragedPodcastInfoAndEpisodesOrFetchThem } from "../../../api/api";
import { Podcast, Episode } from "../../../Interfaces/Interfaces";
import { getExistingPodcast } from "../../../utils/helpers";

import style from "./Podcast.module.scss";

const PodcastComponent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [podcastInfo, setPodcastInfo] = useState<any>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [podcast, setPodcast] = useState<Podcast>();
  const oneDayInMiliSeconds: number = 86400000;

  //When we start this component we activate the countdown to delete the data enver 24hs
  useEffect(() => {
    getNewPodcastInfoAndEpisodesEveryDay();

    //We call this function so that it executes every 24hs
    setInterval(() => {
      getNewPodcastInfoAndEpisodesEveryDay();
    }, oneDayInMiliSeconds);
  }, []);

  const getNewPodcastInfoAndEpisodesEveryDay = () => {
    setPodcast(getExistingPodcast(id));
    //We fetch the Podcast and Episodes
    getStoragedPodcastInfoAndEpisodesOrFetchThem(
      id,
      setPodcastInfo,
      setEpisodes,
      setLoading,
      oneDayInMiliSeconds
    );
  };

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
            {podcast && podcastInfo && episodes ? (
              <Row>
                <Col xs="4">
                  {/* We need to use information from both services to display this component, because the pictures from
                  the podcast services are too small and their quality isn't good enough.*/}
                  <PodcastInfo
                    id={id}
                    podcast={podcast}
                    podcastInfo={podcastInfo}
                    episodeDetail={false}
                  />
                </Col>
                <Col xs="8">
                  <Counter total={episodes.length} />
                  <PodcastTable episodes={episodes} id={id} />
                </Col>
              </Row>
            ) : (
              <Row className={style.noData}>
                <h5>We're sorry. There's no enough data for this podcast.</h5>
              </Row>
            )}
          </Container>
        )}
      </Row>
    </>
  );
};

export default PodcastComponent;
