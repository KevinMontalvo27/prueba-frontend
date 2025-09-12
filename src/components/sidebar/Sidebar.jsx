import { PersonStanding } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="images/logo.png" alt="logo" />
        <h2>StarWars DB</h2>
      </div>

      <ul className="sidebar-links">
        <h4>
          <span>Menú</span>
          <div className="menu-separator"></div>
        </h4>

        <li>
          <a href="#">
            <PersonStanding size={20} />
            <span>Películas</span>
          </a>
        </li>
        <li>
          <a href="#">
            <PersonStanding size={20} />
            <span>Planetas</span>
          </a>
        </li>
        <li>
          <a href="#">
            <PersonStanding size={20} />
            <span>Especies</span>
          </a>
        </li>
        <li>
          <a href="#">
            <PersonStanding size={20} />
            <span>Naves Espaciales</span>
          </a>
        </li>
        <li>
          <a href="#">
            <PersonStanding size={20} />
            <span>Vehículos</span>
          </a>
        </li>
        <li>
          <a href="#">
            <PersonStanding size={20} />
            <span>Personajes</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
