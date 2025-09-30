import { Routes, Route, Navigate } from "react-router-dom";

import Peliculas from "../pages/peliculas/Peliculas";
import Planetas from "../pages/planetas/Planetas";
import Especies from "../pages/especies/Especies";
import Naves from "../pages/naves/Naves";
import Vehiculos from "../pages/vehiculos/Vehiculos";
import Personajes from "../pages/personajes/Personajes";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/personajes" replace />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/planetas" element={<Planetas />} />
            <Route path="/especies" element={<Especies />} />
            <Route path="/naves" element={<Naves />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/personajes" element={<Personajes />} />
        </Routes>
    );
}

export default AppRoutes;