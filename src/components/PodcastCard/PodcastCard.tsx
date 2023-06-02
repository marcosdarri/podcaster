import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

import style from "./PodcastCard.module.scss";

const PodcastCard = ({ img, title, author }) => {
  return (
    <Link to={"/podcast"}>
      <Card className={style.card}>
        <img alt="Sample" src={img} className={style.img} />
        <CardBody className={style.body}>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Author: {author}
          </CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PodcastCard;
