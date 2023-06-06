import { Col, Row, Input } from "reactstrap";

import style from "./Filter.module.scss"

const Filter = ({setFilterText, total}) => {
  return (
    <Row className={style.filterRow}>
        <Col className={style.col}>
          <div className={style.total}>{total}</div>
          <Input
            className={style.filter}
            onChange={(e) => setFilterText(e.target.value)}
            type="search"
            placeholder="Filter podcasts..."
          />
        </Col>
      </Row>
  )
}

export default Filter