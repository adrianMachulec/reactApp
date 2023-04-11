import Hotel from "./Hotel/Hotel";
import styles from "./Hotels.module.css";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

const slowFunction = (count) => {
    for(let i=0; i<1200000000; i++){}
    return count
}

function Hotels(props) {

  const count = useMemo(() => {return slowFunction(props.hotels.length)}, [props.hotels.length])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Oferty({count}):</h2>
      {props.hotels.map((hotel) => (
        <Hotel key={hotel.id} {...hotel} theme={props.theme} />
      ))}
    </div>
  );
}

Hotels.propTypes = {
  hotels: PropTypes.array.isRequired,
};

export default Hotels;
