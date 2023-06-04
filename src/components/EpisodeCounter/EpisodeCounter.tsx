import style from "./EpisodeCounter.module.scss";

const EpisodeCounter = ({ total }) => {
  return (
    <div className={style.container}>
      <h4>Episodes: {total}</h4>
    </div>
  );
};

export default EpisodeCounter;
