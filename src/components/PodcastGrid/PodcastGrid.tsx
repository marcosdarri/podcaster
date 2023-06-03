import React from "react";
import { Row, Col, CardGroup } from "reactstrap";
import PodcastCard from "../PodcastCard/PodcastCard";
import Loader from "../Loader/Loader";

import style from "./PodcastGrid.module.scss";

const PodcastGrid = ({ loading, rows, total }) => {
  return (
    <Row className={style.grid}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <CardGroup>
          {rows && total > 0 ? (
            rows.map((row, index) => {
              return (
                <Row className={style.gridRow} key={index}>
                  {row.map((rowItem: any, index: number) => {
                    return (
                      <Col
                        sm={12 / row.length}
                        className={style.col}
                        key={index}
                      >
                        <PodcastCard
                          title={rowItem.title}
                          author={rowItem.author}
                          img={rowItem.img}
                        />
                      </Col>
                    );
                  })}
                </Row>
              );
            })
          ) : (
            <Row className={style.gridRow}>
              <Col sm="3" className={style.emptyCol}>
                <h2>No podcasts available.</h2>
              </Col>
            </Row>
          )}
        </CardGroup>
      )}
    </Row>
  );
};

export default PodcastGrid;
