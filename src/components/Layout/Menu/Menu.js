import styles from "./Menu.module.css";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";

function Menu() {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  };

  return (
    <div className={`${styles.menuContainer} navbar bg-light`}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.menuItemActive : "inactive"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          {auth ? (
            <>
              <NavLink
                to="/profil"
                className={({ isActive }) =>
                  isActive ? styles.menuItemActive : "inactive"
                }
              >
                Mój profil
              </NavLink>
              <a href="/" onClick={logout}>
                Wyloguj
              </a>
            </>
          ) : (
            <>
              <NavLink
                to="/rejestracja"
                className={({ isActive }) =>
                  isActive ? styles.menuItemActive : "inactive"
                }
                end
              >
                Zarejestruj
              </NavLink>
              <NavLink
                to="/zaloguj"
                className={({ isActive }) =>
                  isActive ? styles.menuItemActive : "inactive"
                }
                end
              >
                Zaloguj
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Menu;
