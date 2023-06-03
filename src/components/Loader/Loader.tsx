import React, { Fragment, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import "./Loader.module.scss"

const Loader = ({ loading }) => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#0066b2",
  };
  return (
    <div style={{textAlign: "center"}}>
      <ClipLoader
        color={"#0066b2"}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>Loading...</p>{" "}
    </div>
  );
};

export default Loader;
