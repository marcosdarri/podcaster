import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Title from "../../Title/Title";
import Counter from "../Counter/Counter";
import Loader from "../../Loader/Loader";
import PodcastInfo from "../PodcastInfo/PodcastInfo";
import PodcastTable from "../PodcastTable/PodcastTable";
import { createAndDeletePodcastData } from "../../../api/api";
import { Podcast, Episode } from "../../../Interfaces/Interfaces";
import { getExistingData } from "../../../utils/helpers";

import style from "./Podcast.module.scss";

const PodcastComponent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [podcast, setPodcast] = useState<Podcast>();
  const key: string = "myArrayData";

  //When we start this component we activate the countdown to delete the data enver 24hs
  useEffect(() => {
    const oneDayInMiliSeconds: number = 86400000;
    const params = {
      setLoading,
      setEpisodes,
      timeInMiliSeconds: oneDayInMiliSeconds,
      id,
    };

    let podcasts: Podcast[] = getExistingData(key);
    setPodcast(podcasts.filter((pod: Podcast) => pod.id === id)[0]);

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
              <Col xs="3">
                {podcast ? (
                  <PodcastInfo
                    id={id}
                    podcast={podcast}
                    episodeDetail={false}
                  />
                ) : (
                  <h5>We're sorry. There's no data for this podcast.</h5>
                )}
              </Col>
              <Col xs="8">
                {episodes ? <Counter total={episodes.length} /> : null}
                {episodes ? (
                  <PodcastTable episodes={episodes} id={id} />
                ) : (
                  <h5>We're sorry. There's no data for this podcast.</h5>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </>
  );
};

export default PodcastComponent;
