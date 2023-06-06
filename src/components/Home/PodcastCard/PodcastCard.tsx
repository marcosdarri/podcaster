import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";

import style from "./PodcastCard.module.scss";

const PodcastCard = ({ id, img, title, author }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <Card className={style.card}>
        <img alt="PodcastCard" src={img} className={style.img} />
        <CardBody className={style.body}>
          <UncontrolledTooltip placement="right" target={`tooltip${id}`} style={{textAlign: "left"}}>
            <b>Complete title:</b><br></br>
            {title}
          </UncontrolledTooltip>
          <CardTitle id={`tooltip${id}`} tag="h5">
            {title}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Author: {author}
          </CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PodcastCard;
