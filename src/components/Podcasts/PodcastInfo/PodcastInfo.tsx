import style from "./PodcastInfo.module.scss";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

const PodcastInfo = ({ info, infoDetail, id, episodeDetail }) => {
  return (
    <Row className={style.row}>
      {episodeDetail ? (
        <Link to={`/podcast/${id}`}>
          <img
            alt="PodcastInfo"
            src={infoDetail.artworkUrl600}
            className={style.img}
          />
        </Link>
      ) : (
        <img
          alt="PodcastInfo"
          src={infoDetail.artworkUrl600}
          className={style.img}
        />
      )}
      <div className={style.title}>
        {episodeDetail ? (
          <Link
            to={`/podcast/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h5>{info.title}</h5>
            <p>by {infoDetail.artistName}</p>
          </Link>
        ) : (
          <>
           <h5>{info.title}</h5>
          <p>by {infoDetail.artistName}</p>
          </>
         
        )}
      </div>
      <div className={style.description}>
        <h5>
          <b>Description:</b>
        </h5>
        <p>{info.description}</p>
      </div>
    </Row>
  );
};

export default PodcastInfo;
