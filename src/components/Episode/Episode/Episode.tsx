import { useState, useEffect } from "react";
import { Col, Row, Container, Spinner } from "reactstrap";
import PodcastInfo from "../../Podcasts/PodcastInfo/PodcastInfo";
import { useParams } from "react-router-dom";
import Title from "../../Title/Title";
import PlayableEpisode from "../PlayableEpisode/PlayableEpisode";
import Loader from "../../Loader/Loader";
import {
  getExistingData,
  getExistingEpisodes
} from "../../../utils/helpers";
import { Episode, Podcast } from "../../../Interfaces/Interfaces";

import style from "./Episode.module.scss";

const EpisodeComponent = () => {
  const { id, episodeid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episode, setEpisode]= useState<Episode>();
  const [podcast, setPodcast]= useState<Podcast>();
  const key = "myArrayData";

  //Here we get the info we need for the PodcastInfo component.
  useEffect(() => {
    setTimeout(() => {
      let podcasts = getExistingData(key);
      setPodcast(podcasts.filter((pod: Podcast) => pod.id === id)[0]);

      getExistingEpisodes(setEpisodes);
      setLoading(false);
    }, 500);
  }, []);

  //Here we get the infor we need for the PlayableEpisode
  useEffect(() => {
    const info = episodes.find(
      (dataItem) => parseInt(dataItem.trackId) === parseInt(episodeid)
    );
    setEpisode(info);
  }, [episodes]);

  return (
    <>
      <div className={style.titleContainer}>
        <Title loading={loading} />
      </div>
      <Row className={style.row}>
        {podcast ? (
          <Container className={style.container} fluid>
            <Row>
              <Col xs="3">
                {podcast ? (
                  <PodcastInfo id={id} podcast={podcast}  episodeDetail={true} />
                ) : (
                  <h5>We're sorry. There's no data for this podcast.</h5>
                )}
              </Col>
              {episode ? (
                <Col xs="8">
                  <PlayableEpisode episode={episode} />
                </Col>
              ) : null}
            </Row>
          </Container>
        ) : (
          <Row className={style.loadingRow}>
            <Loader loading={loading} text />
          </Row>
        )}
      </Row>
    </>
  );
};

export default EpisodeComponent;
