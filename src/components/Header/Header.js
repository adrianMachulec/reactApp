import styles from "./Header.module.css";
import withMouthePosition from "../../hoc/withMouthePosition";

function Header(props) {

  const paralaxStyles = {
    transform: `translate(
      ${props.mouseX/-100}px,
      ${props.mouseY/200}px
    )`
  }

  return (
    <header 
      className={`${styles.header}`}>
        <div className={styles.headerImage} style={paralaxStyles}></div>
      {props.children}
    </header>
  );
}

export default withMouthePosition(Header);
