import React from "react";
import { Col } from "reactstrap";

import style from "./PlayableEpisode.module.scss";

const PlayableEpisode = ({ playableInfo }) => {
  return (
    <Col className={style.col}>
      <h2>{playableInfo.trackName}</h2>

      <div className={style.description}
        dangerouslySetInnerHTML={{
          __html: playableInfo.description,
        }}
      />
      <audio controls className={style.audio}>
        <source src={playableInfo.episodeUrl} type="audio/ogg" />
        <source src={playableInfo.episodeUrl} type="audio/mpeg" />
        <source src={playableInfo.episodeUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </Col>
  );
};

export default PlayableEpisode;
