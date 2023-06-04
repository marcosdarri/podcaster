import React from "react";
import { Col, Row } from "reactstrap";

import style from "./Title.module.scss";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const Title = ({ loading }) => {
  return (
    <Link to="/" className={style.link}>
      <Row className={style.row}>
        <Col>
          <h1 className={style.title}>Podcaster</h1>
        </Col>
        {loading ? (
          <Col xs="1">
            <Loader loading={loading} text={false} />
          </Col>
        ) : null}
      </Row>
    </Link>
  );
};

export default Title;
