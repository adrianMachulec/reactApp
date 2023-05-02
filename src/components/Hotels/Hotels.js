import Hotel from "./Hotel/Hotel";
import styles from "./Hotels.module.css";
import PropTypes from "prop-types";

function Hotels(props) {

  const count = props.hotels.length

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Oferty({count}):</h2>
      {props.hotels.map((hotel) => (
        <Hotel key={hotel.id} {...hotel} theme={props.theme} onOpen={props.onOpen} />
      ))}
    </div>
  );
}

Hotels.propTypes = {
  hotels: PropTypes.array.isRequired,
};

export default Hotels;
