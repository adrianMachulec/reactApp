import styles from "./Menu.module.css";
import AuthContext from "../../context/authContext";
import { useContext } from "react";

function Menu() {
  const auth = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    auth.login();
  };

  const logout = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <div className={`${styles.menuContainer} navbar bg-light`}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a href="/">Home</a>
        </li>
        <li className={styles.menuItem}>
          {auth.isAuthenticated ? (
            <a href="/" onClick={logout}>
              Wyloguj
            </a>
          ) : (
            <a href="/" onClick={login}>
              Zaloguj
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Menu;
