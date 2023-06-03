import React from 'react'
import { Col, Row } from "reactstrap";

import style from "./Title.module.scss";

const Title = () => {
  return (
    <Row className={style.titleRow}>
        <Col>
          <h1 className={style.title}>Podcaster</h1>
        </Col> 
      </Row>
  )
}

export default Title