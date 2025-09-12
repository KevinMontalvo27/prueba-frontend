import { Link } from "react-router-dom";
import { 
  PersonStanding, 
  Film, 
  Globe, 
  Dna, 
  Rocket, 
  Car,
} from "lucide-react";

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
          <Link to="/peliculas">
            <Film size={20} />
            <span>Películas</span>
          </Link>
        </li>
        <li>
          <Link to="/planetas">
            <Globe size={20} />
            <span>Planetas</span>
          </Link>
        </li>
        <li>
          <Link to="/especies">
            <Dna size={20} />
            <span>Especies</span>
          </Link>
        </li>
        <li>
          <Link to="/naves">
            <Rocket size={20} />
            <span>Naves Espaciales</span>
          </Link>
        </li>
        <li>
          <Link to="/vehiculos">
            <Car size={20} />
            <span>Vehículos</span>
          </Link>
        </li>
        <li>
          <Link to="/personajes">
            <PersonStanding size={20} />
            <span>Personajes</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;