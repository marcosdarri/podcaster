import style from "./PodcastInfo.module.scss";
import { Row } from "reactstrap";

const PodcastInfo = ({ info, infoDetail }) => {
  return (
    <Row className={style.row}>
      <img alt="PodcastInfo" src={infoDetail.artworkUrl600} className={style.img} />
      <div className={style.title}>
        <h5>{info.title}</h5>
        <p>by {infoDetail.artistName}</p>
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
