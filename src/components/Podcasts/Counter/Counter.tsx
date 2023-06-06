import style from "./Counter.module.scss";

const Counter = ({ total }) => {
  return (
    <div className={style.container}>
      <h4>Episodes: {total}</h4>
    </div>
  );
};

export default Counter;
