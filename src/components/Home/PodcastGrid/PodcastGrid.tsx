import React from "react";
import { Row, Col } from "reactstrap";
import PodcastCard from "../PodcastCard/PodcastCard";
import Loader from "../../Loader/Loader";
import { PodcastGeneralInfo } from "../../../Interfaces/Interfaces";

import style from "./PodcastGrid.module.scss";

const PodcastGrid = ({ loading, rows, total }) => {
  return (
    <Row className={style.grid}>
      {loading ? (
        <Row className={style.loaderRow}>
          <Loader loading={loading} text />
        </Row>
      ) : (
        <>
          {rows && total > 0 ? (
            rows.map((row: PodcastGeneralInfo[], index: number) => {
              return (
                <Row className={style.gridRow} key={index}>
                  {row.map((rowItem: PodcastGeneralInfo, index: number) => {
                    return (
                      <Col
                        sm={12 / row.length}
                        className={style.col}
                        key={index}
                      >
                        <PodcastCard
                          id={rowItem.id}
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
        </>
      )}
    </Row>
  );
};

export default PodcastGrid;
