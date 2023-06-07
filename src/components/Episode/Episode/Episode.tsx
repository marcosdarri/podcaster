import { useState, useEffect } from "react";
import { Col, Row, Container, Spinner } from "reactstrap";
import PodcastInfo from "../../Podcasts/PodcastInfo/PodcastInfo";
import { useParams } from "react-router-dom";
import Title from "../../Title/Title";
import PlayableEpisode from "../PlayableEpisode/PlayableEpisode";
import Loader from "../../Loader/Loader";
import {
  getExistingPodcast,
  getExistingEpisodes,
  getExistingEpisode
} from "../../../utils/helpers";
import { Episode, Podcast } from "../../../Interfaces/Interfaces";

import style from "./Episode.module.scss";

const EpisodeComponent = () => {
  const { id, episodeid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [episode, setEpisode]= useState<Episode>();
  const [podcast, setPodcast]= useState<Podcast>();
  const [podcastInfo, setPodcastInfo] = useState<any>();

  //Here we get the info we need for the PodcastInfo component.
  useEffect(() => {
    setTimeout(() => {
      const eps = getExistingEpisodes()
      setPodcast(getExistingPodcast(id))
      setEpisode(getExistingEpisode(eps, episodeid))
      setPodcastInfo(getExistingEpisodes()[0])
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <div className={style.titleContainer}>
        <Title loading={loading} />
      </div>
      <Row className={style.row}>
        {podcast ? (
          <Container className={style.container} fluid>
            <Row>
              <Col xs="4">
                {podcast ? (
                  <PodcastInfo id={id} podcast={podcast} podcastInfo={podcastInfo} episodeDetail={true} />
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
