import style from "./PodcastInfo.module.scss";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

const PodcastInfo = ({ id, podcast, episodeDetail }) => {
  return (
    <Row className={style.row}>
      {episodeDetail ? (
        <Link to={`/podcast/${id}`} className={style.link}>
          <img alt="PodcastInfo" src={podcast.img} className={style.img} />
        </Link>
      ) : (
        <img alt="PodcastInfo" src={podcast.img} className={style.img} />
      )}
      <div className={style.title}>
        {episodeDetail ? (
          <Link
            to={`/podcast/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h5>{podcast.title}</h5>
            <p>by {podcast.author}</p>
          </Link>
        ) : (
          <>
            <h5>{podcast.title}</h5>
            <p>by {podcast.author}</p>
          </>
        )}
      </div>
      <div className={style.description}>
        <h5>
          <b>Description:</b>
        </h5>
        <p>{podcast.summary}</p>
      </div>
    </Row>
  );
};

export default PodcastInfo;
