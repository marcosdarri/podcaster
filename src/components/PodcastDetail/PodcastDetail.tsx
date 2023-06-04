import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Title from "../Title/Title";

import style from "./PodcastDetail.module.scss";
import EpisodeCounter from "../EpisodeCounter/EpisodeCounter";
import Loader from "../Loader/Loader";
import PodcastInfo from "../PodcastInfo/PodcastInfo";
import EpisodeTable from "../EpisodeTable/EpisodeTable";

const PodcastDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [podcastInfo, setPodcastInfo] = useState();
  const [podcastInfoDetail, setPodcastInfoDetail] = useState();
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    const localStorageKey = "myPodcastInfoDetail";
    fetch(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    )
      .then((response) => response.json())
      .then((fetchData) => {
        setTotal(fetchData.resultCount -1);
        let newData = fetchData.results;
        let firstObject = newData.shift();
        setPodcastInfoDetail(firstObject);
        setData(newData);

        const localStoragePodcasts = {
          info : firstObject,
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

  useEffect(() => {
    getExistingPodcastInfo();
    //getExistingPodcastInfoDetail();
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const getExistingPodcastInfo = () => {
    const localStorageKey = "myArrayData";
    const storedData = localStorage.getItem(localStorageKey);
    const { podcasts } = JSON.parse(storedData);
    const podcast = podcasts.filter((pod: any) => pod.id === id)[0];
    setPodcastInfo(podcast);
  };

  const getExistingPodcastInfoDetail = () => {
    const localStorageKey = "myPodcastInfoDetail";
    const storedData = localStorage.getItem(localStorageKey);
    const { podcasts } = JSON.parse(storedData);
    const podcast = podcasts.filter((pod: any) => pod.id === id)[0];
    setPodcastInfoDetail(podcast);
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
            <Row>
              <Col xs="4">
                <PodcastInfo
                  info={podcastInfo}
                  infoDetail={podcastInfoDetail}
                />
              </Col>
              <Col xs="8">
                <EpisodeCounter total={total} />
                <EpisodeTable data={data} />
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </>
  );
};

export default PodcastDetail;
