import React from "react";
import { Col } from "reactstrap";

import style from "./PlayableEpisode.module.scss";

const PlayableEpisode = ({ episode }) => {

  return (
    <Col className={style.col}>
      <h2>{episode.trackName}</h2>

      <div className={style.description}
        dangerouslySetInnerHTML={{
          __html: episode.description,
        }}
      />
      <audio controls className={style.audio}>
        <source src={episode.episodeUrl} type="audio/ogg" />
        <source src={episode.episodeUrl} type="audio/mpeg" />
        <source src={episode.episodeUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </Col>
  );
};

export default PlayableEpisode;
