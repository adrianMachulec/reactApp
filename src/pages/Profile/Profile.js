import { NavLink, Outlet } from "react-router-dom";

export default function Profile(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Mój profil</h2>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to="/profil" end>
              Profil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profil/hotele" end>
              Hotele
            </NavLink>
          </li>
        </ul>

        <div className="pt-4">
          <Outlet />
        </div>

        <p>...</p>
      </div>
    </div>
  );
}
