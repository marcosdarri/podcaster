import { Table } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";

import style from "./EpisodeTable.module.scss";

const EpisodeTable = ({ data, id }) => {
  const secondsToString = (seconds: number) => {
    var minute: string = Math.floor((seconds / 60) % 60).toString();
    minute = parseInt(minute) < 10 ? "0" + minute : minute;
    var second: string = (seconds % 60).toString();
    second = parseInt(second) < 10 ? "0" + second : second;
    return minute + ":" + second;
  };

  return (
    <Table className={style.table}>
      <thead>
        <tr className={style.headerRow}>
          <th>Title</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>

      <tbody>
        {data.map((tableItem: any, index: number) => {
          const episodeid = tableItem.trackId
          return (
            <tr key={index}>
              <td>
                <Link
                  to={`/podcast/${id}/episode/${episodeid}`}
                  className={style.link}
                >
                  {tableItem.trackName}
                </Link>
              </td>
              <td>
                {moment(tableItem.releaseDate).utc().format("DD/MM/YYYY")}
              </td>
              <td>{secondsToString(tableItem.trackTimeMillis / 1000)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default EpisodeTable;
