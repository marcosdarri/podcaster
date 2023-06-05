import { useState, useEffect } from "react";
import { Col, Row, Container, Spinner } from "reactstrap";
import PodcastInfo from "../PodcastInfo/PodcastInfo";
import {
  getExistingPodcastInfoDetail,
  getExistingPodcastInfo,
} from "../../utils/helpers";
import { useParams } from "react-router-dom";
import Title from "../Title/Title";

import style from "./EpisodeDetail.module.scss";
import PlayableEpisode from "../PlayableEpisode/PlayableEpisode";
import Loader from "../Loader/Loader";

const EpisodeDetail = () => {
  const { id, episodeid } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [podcastInfo, setPodcastInfo] = useState({});
  const [podcastInfoDetail, setPodcastInfoDetail] = useState({});
  const [playableInfo, setPlayableInfo] = useState({});

  //Here we get the info we need for the PodcastInfo component.
  useEffect(() => {
    setTimeout(() => {
      getExistingPodcastInfo({ setPodcastInfo, id });
      getExistingPodcastInfoDetail(setPodcastInfoDetail, setData);
      setLoading(false)
    }, 500);
  }, []);

  //Here we get the infor we need for the PlayableEpisode
  useEffect(() => {
    const info = data.find(
      (dataItem) => dataItem.trackId === parseInt(episodeid)
    );
    setPlayableInfo(info);
  }, [data]);

  return (
    <>
      <div className={style.titleContainer}>
        <Title loading={loading} />
      </div>
      <Row className={style.row}>
       {playableInfo ? <Container className={style.container} fluid>
          <Row>
            <Col xs="4">
              {podcastInfo && podcastInfoDetail ? (
                <PodcastInfo
                  info={podcastInfo}
                  infoDetail={podcastInfoDetail}
                  id={id}
                  episodeDetail={true}
                />
              ) : (
                <h5>We're sorry. There's no data for this podcast.</h5>
              )}
            </Col>
            {playableInfo ? (
              <Col xs="8">
                <PlayableEpisode playableInfo={playableInfo} />
              </Col>
            ) : null}
          </Row>
        </Container>:  <Row className={style.loadingRow}>
            <Loader loading={loading} text />
          </Row>}
      </Row>
    </>
  );
};

export default EpisodeDetail;
